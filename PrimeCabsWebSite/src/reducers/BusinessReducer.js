/**
 * User: Jayendra Matarage
 * Date:6/15/2019
 * Github : /blackburn3333
 */
export default  (state = {
    regiserSpin: false,
    confirm_sip: false,
    conf_num:false,
    ref_id: ""
}, action) => {
    switch (action.type) {
        case "SET_BUSINESS_REGISTER_SPINNER":
            state = {
                ...state,
                regiserSpin: action.payload,
            };
            break;
        case "SET_BUSINESS_CONFIRM_SPINNER":
            state = {
                ...state,
                confirm_sip: action.payload
            };
            break;
        case "SET_BUSINESS_REF_NUMBER":
            state = {
                ...state,
                ref_id: action.payload
            };
            break;
        case "SET_CONF_ERROR":
            state = {
                ...state,
                conf_num: action.payload
            };
            break;
        default:
            break;
    }
    return state;
}