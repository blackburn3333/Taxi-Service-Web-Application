export default  (state = {
    todayDate: "date",
    nowTime: "time",
}, action) => {
    switch (action.type) {
        case "SET_DATE":
            state = {
                ...state,
                todayDate: action.payload,
            };
            break;
        case "SET_TIME":
            state = {
                ...state,
                todayDate: action.payload,
            };
            break;
        default:
            break
    }
    return state;
};