<!-- Modal -->
<div class="modal fade" id="edit{{ $resturant->id }}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update The resturant</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="{{ route('Resturants.update', 'test') }}" method="post">
                {{ method_field('patch') }}
                {{ csrf_field() }}
                @csrf
                <div class="modal-body">
                    <label for="exampleInputPassword1">name</label>
                    <input type="hidden" name="id" value="{{ $resturant->id }}">
                    <input type="text" name="resturant_name" value="{{$resturant->resturant_name}}" class="form-control">
                    <label class="mt-2" for="exampleFormControlTextarea1">description</label>
                    <textarea class="form-control" id="description" value="{{$resturant->description}}" name="description" rows="3"></textarea>
                    <label class="mt-2" for="exampleFormControlTextarea1">location</label>
                    @foreach ($resturant->locations as $location)
                    <input type="hidden" name="location_id" value="{{ $location->id }}">
                    <input type="text" value="{{ $location->address }}" name="location" class="form-control">
                    @endforeach
                            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">close</button>
                    <button type="submit" class="btn btn-primary">submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
