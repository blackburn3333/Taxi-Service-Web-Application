/**
 * User: Jayendra Matarage
 * Date:6/15/2019
 * Github : /blackburn3333
 */
import {
    BUSINESS_REGISTRATION,
    BUSINESS_CONFIRM,
    BUSINESS_TOUR_BOOKING,
    BUSINESS_LOGIN,
    BUSINESS_RESPONSIBLE_CONT_NUM_CHECK,
    BUSINESS_INFO,
    BUSINESS_EMAIL,
    READ_BUSINESS_TOURS
} from  "./apicallurls";
import axios from "axios";
import store from "../storage";
import {setSpinner, setRefId} from "../actions/BusinessActions";


export function business_login(userName, userPassword) {
    const login_data = {
        "user_name": userName,
        "user_password": userPassword

    };
    return axios.post(BUSINESS_LOGIN, JSON.stringify(login_data))
        .then(res => {
            return res
        })
        .catch(error => {
            return error.response
        });
}

export function business_register(values) {
    store.dispatch(
        setSpinner(true)
    );
    const registerData = {
        bus_name: values.businessName,
        bus_branch: values.businessBranchName,
        bus_email: values.businessEmailAddress,
        bus_contact: values.businessContactNumber,
        bus_res_per_name: values.businessResponsiblePerson,
        bus_res_per_contact: values.businessResponsibleNumber,
        bus_password: values.businessPassword
    };
    return axios.post(BUSINESS_REGISTRATION, JSON.stringify(registerData))
        .then(res => {
            store.dispatch(
                setSpinner(false)
            );
            return res
        })
        .catch(error => {
            store.dispatch(
                setSpinner(false)
            );
            return error.response
        });
}

export function check_responsible_person_number(check_number) {
    const check_data = {
        cont_number_resp: check_number,
    };
    return axios.post(BUSINESS_RESPONSIBLE_CONT_NUM_CHECK, JSON.stringify(check_data))
        .then(res => {

            return res
        })
        .catch(error => {
            return error.response
        });
}

export function get_user_data(search_data) {
    const get_data = {
        token: search_data
    };

    return axios.post(BUSINESS_INFO, JSON.stringify(get_data))
        .then(res => {
            return res
        })
        .catch(error => {
            return error.response
        });
}

export function set_confirmation(id) {
    store.dispatch(
        setRefId(id)
    )
}

export function confirm_number(ref_num, conf_key) {
    const set_up_data = {
        ref_number: ref_num,
        conf_number: conf_key
    };
    return axios.post(BUSINESS_CONFIRM, JSON.stringify(set_up_data))
        .then(res => {
            return res
        })
        .catch(error => {
            return error.response
        });

}

export function set_trip(data) {
    return axios.post(BUSINESS_TOUR_BOOKING, JSON.stringify(data))
        .then(res => {
            return res
        })
        .catch(error => {
            return error.response
        });
}

export function send_email(data) {
    const set_up_data = {
        ref_id: data,
    };
    return axios.post(BUSINESS_EMAIL, JSON.stringify(set_up_data))
        .then(res => {
            return res
        })
        .catch(error => {
            return error.response
        });
}

export function get_pending_tours(token) {
    const set_up_data = {
        token: token,
    };
    return axios.post(READ_BUSINESS_TOURS, JSON.stringify(set_up_data))
        .then(res => {
            return res
        })
        .catch(error => {
            return error.response
        });
}