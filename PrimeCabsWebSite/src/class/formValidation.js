/**
 * User: Jayendra Matarage
 * Date:6/15/2019
 * Github : /blackburn3333
 */

export const Required = value => (value || typeof value === 'number' ? undefined : true);

export function textLength(text,length) {
    if(text.length > length){
        return true
    }
}

export function nullChecker(pass_fields) {
    for (let pass_value in pass_fields) {
        if (pass_fields.hasOwnProperty(pass_value)) {
            if (pass_fields[pass_value] === undefined) {
                return true
            }
        }
    }
}

export function passwordValidation(password) {
    const regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    if (password !== "" && !regexPassword.test(password)) {
        return true
    }
}

export function passwordConfirm(password, conf_password) {
    if (password !== conf_password) {
        return true
    }
}

export function emailValidation(email) {
    const regexEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (email !== "" && !regexEmail.test(email)) {
        return true
    }
}

export function contactValidation(contactNumber) {
    const regexContact = /^[0-9]{10,10}$/;
    if (contactNumber !== "" && !regexContact.test(contactNumber)) {
        return true
    }
}
