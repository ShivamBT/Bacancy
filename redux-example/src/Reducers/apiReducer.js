const intialState = {
    data: [],
    fetch:false
}

export const apiReducer = (state=intialState, action) =>
{
    switch (action.type)
    {
        case "FETCH_SUCCESS":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetch:true
            }
        case "FETCH_ERROR":
            return {
                ...state,
                data: [...state.data, action.payload],
                fetch:false
            }
        
        default:
            return {
                ...state
            }
    }

}