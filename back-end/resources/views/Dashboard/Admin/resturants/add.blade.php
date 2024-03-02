<!-- Modal -->
<div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Resturant</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="{{ route('Resturants.store')}}" method="post" autocomplete="off">
                @csrf
                <div class="modal-body">
                        <label for="exampleInputPassword1">name</label>
                        <input type="text" name="resturant_name" class="form-control">
                        <label class="mt-2" for="exampleFormControlTextarea1">description</label>
                        <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                        <label class="mt-2" for="exampleFormControlTextarea1">location</label>
                        <input type="text" name="location" class="form-control">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">close</button>
                    <button type="submit" class="btn btn-primary">submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
