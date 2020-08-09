/**
 * Created by Jayendra Matarage on 5/29/2019.
 */

/*export function calculate_package(pack_type, category_rate, distance) {
 if (pack_type === "12h") {
 return distance * category_rate
 } else if (pack_type === "2d") {
 if (distance < 400) {
 return distance * category_rate + 1000
 } else {
 return (distance + 100) * category_rate + 1000
 }
 } else if (pack_type === "3d") {
 if (distance < 400) {
 return (distance + 100) * category_rate + 2000
 } else {
 return (distance + 100 + 175) * category_rate + 2000
 }
 }
 }*/

/*export function calculate_package(pack_type, category_rate, distance) {
    if (pack_type === "12h") {
        return distance * category_rate
    } else if (pack_type === "2d") {
        if (distance < 400) {
            return distance * category_rate + 1000
        } else {
            return (distance + 100) * category_rate + 1000
        }
    } else if (pack_type === "3d") {
        return (distance + 125) * category_rate

    }
}*/

export function pack_cal_new(type, base, second_plus, third_plus, cat_base) {

    if (type === "12h") {
        return base * cat_base;
    }
    else if (type === "2d") {
        return (base + second_plus) * cat_base;
    }
    else if (type === "3d") {
        return (base + second_plus + third_plus ) * cat_base;
    }
}

export function taxi_calculations(trip_type, v_type, distance) {
    if (v_type === 1) {
        if (trip_type === "1") {
            return (distance / 1000) * 55;
        } else {
            return ((distance / 1000) * 40) * 2;
        }
    } else if (v_type === 2) {
        if (trip_type === "1") {
            return (distance / 1000) * 60;
        } else {
            return ((distance / 1000) * 45) * 2;
        }
    } else if (v_type === 3) {
        if (trip_type === "1") {
            return (distance / 1000) * 75;
        } else {
            return ((distance / 1000) * 45) * 2;
        }
    } else if (v_type === 4) {
        if (trip_type === "1") {
            return (distance / 1000) * 80;
        } else {
            return ((distance / 1000) * 50) * 2;
        }
    } else if (v_type === 5) {
        return (distance / 1000) * 70;
    }
}