export default  (state = {
    fromLocation: "",
    toLocation: "",
    selected_vehicle: "1",
    price_vehicle: 0,
    pick_up_date: "",
    pick_up_time: "",
    distance: {
        text: "",
        value: 0
    },
    durations: {
        text: "",
        value: 0
    },
    customerName: "",
    customerEmail: "",
    customerContact: "",
    trip_way: "0",
    conformation_code: ""
}, action) => {
    switch (action.type) {
        case "SET_FROM_LOCATION":
            state = {
                ...state,
                fromLocation: action.payload,
            };
            break;
        case "SET_TO_LOCATION":
            state = {
                ...state,
                toLocation: action.payload,
            };
            break;
        case "SET_VEHICLE":
            state = {
                ...state,
                selected_vehicle: action.payload,
            };
            break;
        case "SET_DISTANCE_DURATION":
            state = {
                ...state,
                distance: {
                    text: action.payload.travel_distance.text,
                    value: action.payload.travel_distance.value,
                },
                durations: {
                    text: action.payload.travel_time.text,
                    value: action.payload.travel_time.value,
                }
            };
            break;
        case "SET_PICK_UP_DROP_TIME":
            state = {
                ...state,
                pick_up_date: action.payload.pick_up_date,
                pick_up_time: action.payload.pick_up_time,
            };
            break;
        case "SET_TRIP_WAY":
            state = {
                ...state,
                trip_way: action.payload,
            };
            break;
        case "SET_CALCULATION":
            state = {
                ...state,
                price_vehicle: action.payload,
            };
            break;
        case "SET_FINAL_DATA":
            state = {
                ...state,
                conformation_code: action.payload.conformation_code,
                customerName: action.payload.customerName,
                customerEmail: action.payload.customerEmail,
                customerContact: action.payload.customerContact
            };
            break;
        default:
            break
    }
    return state;
};