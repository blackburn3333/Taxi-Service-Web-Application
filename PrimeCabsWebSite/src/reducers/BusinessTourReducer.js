/**
 * User: Jayendra Matarage
 * Date:6/24/2019
 * Github : /blackburn3333
 */
export default  (state = {
    bus_from: "",
    bus_to: "",
    bus_distance: {
        text: "",
        value: 0
    },
    bus_durations: {
        text: "",
        value: 0
    },
    selected_vehicle: "1",
    price_vehicle: 0,
    bus_pick_up_date: "",
    bus_pick_up_time: "",
    bus_trip_way: "0"
}, action) => {
    switch (action.type) {
        case "SET_BUSINESS_FROM_LOCATION":
            state = {
                ...state,
                bus_from: action.payload,
            };
            break;
        case "SET_BUSINESS_TO_LOCATION":
            state = {
                ...state,
                bus_to: action.payload,
            };
            break;
        case "SET_BUSINESS_DISTANCE_DURATION":
            state = {
                ...state,
                bus_distance: {
                    text: action.payload.travel_distance.text,
                    value: action.payload.travel_distance.value,
                },
                bus_durations: {
                    text: action.payload.travel_time.text,
                    value: action.payload.travel_time.value,
                }
            };
            break;
        case "SET_BUSINESS_PICK_UP_DROP_TIME":
            state = {
                ...state,
                bus_pick_up_date: action.payload.bus_pick_up_date,
                bus_pick_up_time: action.payload.bus_pick_up_time,
            };
            break;
        case "SET_BUSINESS_TRIP_WAY":
            state = {
                ...state,
                bus_trip_way: action.payload
            };
            break;
        case "SET_BUSINESS_VEHICLE":
            state = {
                ...state,
                selected_vehicle: action.payload
            };
            break;
        default:
            break;
    }
    return state;
}