export function getTimeNow() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let setHours = hours < 10 ? "0" + hours : hours;
    return setHours + ":" + minutes;
}

export function getDateNow() {
    let date = new Date();

    let mount = date.getMonth();
    let set_mount = mount < 10 ? "0" + mount : mount;

    let get_date = date.getDate();
    let set_date = get_date < 10 ? "0" + get_date : get_date;
    return date.getUTCFullYear() + "-" + set_mount + "-" + set_date;
}