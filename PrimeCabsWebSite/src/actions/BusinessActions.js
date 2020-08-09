/**
 * User: Jayendra Matarage
 * Date:6/19/2019
 * Github : /blackburn3333
 */
export function setSpinner(value) {
    return {
        type: "SET_BUSINESS_REGISTER_SPINNER",
        payload: value
    };
}

export function setRefId(value) {
    return {
        type: "SET_BUSINESS_REF_NUMBER",
        payload: value
    };
}

export function set_conf_error(value) {
    return{
        type: "SET_CONF_ERROR",
        payload: value
    }
}


export function set_from_location_business(value) {
    return{
        type: "SET_BUSINESS_FROM_LOCATION",
        payload: value
    }
}

export function set_to_location_business(value) {
    return{
        type: "SET_BUSINESS_TO_LOCATION",
        payload: value
    }
}

export function setDistance_business(distance, time) {
    return {
        type: "SET_BUSINESS_DISTANCE_DURATION",
        payload: {
            travel_distance: {
                text: distance.text,
                value: distance.value
            },
            travel_time: {
                text: time.text,
                value: time.value
            }
        }
    };
}

export function setPickUpDateTime(time, date) {
    return {
        type: "SET_BUSINESS_PICK_UP_DROP_TIME",
        payload: {
            pick_up_date: date,
            pick_up_time: time
        }
    };
}

export function set_business_way(type) {
    return {
        type: "SET_BUSINESS_TRIP_WAY",
        payload: type
    };
}

export function bus_setVehicle(value) {
    return {
        type: "SET_BUSINESS_VEHICLE",
        payload: value
    };
}