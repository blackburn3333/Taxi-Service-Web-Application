/**
 * User: Jayendra Matarage
 * Date:7/17/2019
 * Github : /blackburn3333
 */
import {
    PACKAGE_SET_UP
} from  "./apicallurls";
import axios from "axios";

export function set_package(values) {
    const registerData = {
        cus_name: values.customer_f_name + " " + values.customer_s_name,
        cus_contact: values.customer_contact,
        package_name: values.package_name,
        cus_email: values.customer_email,
        cus_selected_vehicle: values.selected_vehicle,
        cus_price: values.pack_price,
        cus_pick_up_date: values.pack_pick_up_date,
        cus_pick_up_time: values.pack_pick_up_time
    };
    return axios.post(PACKAGE_SET_UP, JSON.stringify(registerData))
        .then(res => {

            return res
        })
        .catch(error => {

            return error.response
        });
}