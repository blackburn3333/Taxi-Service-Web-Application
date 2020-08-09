/**
 * Created by Jayendra Matarage on 6/9/2019.
 */
import axios from "axios";
import {TAXI_BOOKING, TAXI_CONFIRM} from "../class/apicallurls";
export function insert_taxi_data(fromLocation,
                                 toLocation,
                                 distance_value,
                                 distance_text,
                                 durations_value,
                                 durations_text,
                                 trip_way,
                                 selected_vehicle,
                                 selected_price,
                                 customerNameF,
                                 customerNameS,
                                 customerEmail,
                                 customerContact,
                                 pick_up_date,
                                 pick_up_time) {
    const set_up_data = {
        cus_name: customerNameF + " " + customerNameS,
        cus_contact: customerContact,
        cus_email: customerEmail,
        cus_fromLocation: fromLocation,
        cus_toLocation: toLocation,
        cus_selected_vehicle: selected_vehicle,
        cus_price_vehicle: selected_price,
        cus_pick_up_date: pick_up_date,
        cus_pick_up_time: pick_up_time,
        cus_distance: distance_value,
        cus_distance_value: distance_text,
        cus_durations: durations_value,
        cus_durations_value: durations_text,
        cus_trip_way: trip_way
    };


    return axios.post(TAXI_BOOKING, JSON.stringify(set_up_data))
        .then(res => {
            return res
        })
        .catch(error => {
            return error.response
        });
}

export function check_conformation_code(ref_num, conf_key) {

    const set_up_data = {
        ref_number: ref_num,
        conf_number: conf_key
    };
    return axios.post(TAXI_CONFIRM, JSON.stringify(set_up_data))
        .then(res => {
            return res
        })
        .catch(error => {
            return error.response
        });

}
