/**
 * Created by Jayendra Matarage on 5/13/2019.
 */
import store from "../storage";
import {taxi_calculations} from "./package_calculations";


export function load_location_inputs(actionName, id, secondStep = "NO", action_ext) {

    const google = window.google;
    let options = {
        componentRestrictions: {country: "lk"}
    };

    let location = new google.maps.places.Autocomplete(document.getElementById(id), options);

    google.maps.event.addListener(location, 'place_changed', () => {
        store.dispatch(
            actionName(location.getPlace().formatted_address)
        );

        if (secondStep !== "NO") {
            const state = store.getState();
            if (state.taxi.fromLocation !== "" && state.taxi.toLocation !== "") {
                setDistanceData(state.taxi.fromLocation, state.taxi.toLocation, action_ext)
            }
        }

    });
}


export function load_location_inputs_business(actionName, id, secondStep = "NO", action_ext) {

    const google = window.google;
    let options = {
        componentRestrictions: {country: "lk"}
    };

    let location = new google.maps.places.Autocomplete(document.getElementById(id), options);

    google.maps.event.addListener(location, 'place_changed', () => {
        store.dispatch(
            actionName(location.getPlace().formatted_address)
        );

        if (secondStep !== "NO") {
            const state = store.getState();
            if (state.business_tour.bus_from !== "" && state.business_tour.bus_to !== "") {
                setDistanceData(state.business_tour.bus_from, state.business_tour.bus_to, action_ext)
            }
        }

    });
}

export function distance_calculation(origin, destination, actionName, trip_type, v_type, needCal = "NO", extendActon = null) {
    const google = window.google;
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        //unitSystem: google.maps.UnitSystem.IMPERIAL,
        unitSystem: google.maps.UnitSystem.metric,
        avoidHighways: false,
        avoidTolls: false
    }, (res, status) => {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log("Distance Matrix Error")
        } else {
            const distance = res.rows[0].elements[0].distance;
            const duration = res.rows[0].elements[0].duration;
            store.dispatch(
                actionName(distance, duration)
            );
            if (needCal !== "NO") {
                setCalCulation(trip_type, v_type, distance.value, extendActon)
            }
        }
    });
}

function setCalCulation(trip_type, v_type, value, actionName) {
    store.dispatch(
        actionName(taxi_calculations(trip_type, v_type, value))
    )
}


export function setDistanceData(origin, destination, actionName) {
    const google = window.google;
    const D_service = new google.maps.DistanceMatrixService();
    D_service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        //unitSystem: google.maps.UnitSystem.IMPERIAL,
        unitSystem: google.maps.UnitSystem.metric,
        avoidHighways: false,
        avoidTolls: false
    }, (res, status) => {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log("Distance Matrix Error")
        } else {
            const distance = res.rows[0].elements[0].distance;
            const duration = res.rows[0].elements[0].duration;
            store.dispatch(
                actionName(distance, duration)
            );
        }
    });
}


/*
export function getApproximateLocation(Latitude, Longitude) {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    const latLog = {lat: Latitude, lng: Longitude};
    geocoder.geocode({'location': latLog}, (results, status) => {
        if (status === 'OK') {
            if (results[0]) {
                console.log(results[0])
            } else {
                window.alert('No results found');
            }
        } else {

        }
    });
}
*/

