<?php 


namespace App\Repository\resturants;
use App\InterFaces\resturants\ResturantRepositoryInterface;
use App\Models\Resturant;
use App\Models\Location;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResturantRepository implements ResturantRepositoryInterface{

    public function index()
    {
        $resturants = Resturant::all();
        return view('Dashboard.Admin.resturants.index' , compact('resturants'));
    }
    
    public function store($request)
    {
        $data = $request->validate([
            'resturant_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        $resturant = Resturant::create([
            'resturant_name' => $request->resturant_name,
            'description' =>$request->description
        ]);

        $resturant->save();

        $location = Location::create([
            'address' => $request->location,
            'resturant_id' => $resturant->id
        ]);

        $location->save();

        session()->flash('Add', 'The resturant has been added successfully');
        return redirect('/Resturants');
    }

    public function update($request){
        $resturant = Resturant::findOrFail($request->id);
        $location =  Location::findOrFail($request->location_id);


        $data = $request->validate([
            'resturant_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        $resturant->update([
            'resturant_name' => $request->input('resturant_name'),
            'description' => $request->input('description'),
        ]);

        $location->update([
            'address' => $request->location
        ]);
        session()->flash('edit', 'The resturant has been updated successfully');
        return redirect()->route('Resturants.index');
    }

    public function destroy($request)
    {
        Resturant::findOrFail($request->id)->delete();
        Location::findOrFail($request->location_id)->delete();
        
        session()->flash('delete', 'The resturant has been deleted successfully');
        return redirect()->route('Resturants.index');
    }
}