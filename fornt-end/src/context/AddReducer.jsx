export const initialState = {
    user:null,
};


const AddReducer = (state = initialState , action) => {

    switch (action.type) {
        case "SET_USER":
            return{
                ...state,
                user:action.user,
            }
            break;
    
        default:
            break;
    }
}

export default AddReducer;