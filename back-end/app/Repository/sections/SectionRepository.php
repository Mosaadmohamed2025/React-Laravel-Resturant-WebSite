<?php

namespace App\Repository\Sections;

use App\Interfaces\Sections\SectionRepositoryInterface;
use App\Models\Section; // Import the Section model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SectionRepository implements SectionRepositoryInterface{

    public function index()
    {
        $sections = Section::all();
        return view('Dashboard.Admin.sections.index', compact('sections'));
    }

    public function store($request)
    {
        $validatedData = $request->validate([
            'section_name' => 'required|unique:sections|max:255',
        ],[
            'section_name.required' =>'Enter the section name',
            'section_name.unique' =>'The section already exists',
        ]);

        Section::create([
            'section_name' => $request->section_name,
            'description' => $request->description,
            'Created_by' => (Auth::user()->name),
        ]);
        session()->flash('Add', 'The section has been added successfully');
        return redirect('/Sections');
    }


    public function update($request)
    {
        $section = Section::findOrFail($request->id);
        
        $validatedData = $request->validate([
            'section_name' => 'required|unique:sections|max:255',
        ],[
            'section_name.required' =>'Enter the section name',
            'section_name.unique' =>'The section already exists',
        ]);
        
        $section->update([
            'section_name' => $request->input('section_name'),
            'description' => $request->input('description'),
        ]);
        session()->flash('edit', 'The section has been updated successfully');
        return redirect()->route('Sections.index');
    }


    public function destroy($request)
    {
        Section::findOrFail($request->id)->delete();
        session()->flash('delete', 'The section has been deleted successfully');
        return redirect()->route('Sections.index');
    }
}