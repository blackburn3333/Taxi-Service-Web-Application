export function setFromLocation(location) {
  return {
    type: "SET_FROM_LOCATION",
    payload: location
  };
}

export function setToLocation(location) {
  return {
    type: "SET_TO_LOCATION",
    payload: location
  };
}

export function setVehicle(vehicle) {
  return {
    type: "SET_VEHICLE",
    payload: vehicle
  };
}

export function setDistance(distance, time) {
  return {
    type: "SET_DISTANCE_DURATION",
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
    type: "SET_PICK_UP_DROP_TIME",
    payload: {
      pick_up_date: date,
      pick_up_time: time
    }
  };
}

export function setTourWay(type) {
  return {
    type: "SET_TRIP_WAY",
    payload: type
  };
}

export function setPrice(price) {
  return {
    type: "SET_CALCULATION",
    payload: price
  };
}

export function setFinalData(name, contact, email, otp) {
  return {
    type: "SET_FINAL_DATA",
    payload: {
      customerName: name,
      customerEmail: email,
      customerContact: contact,
      conformation_code: otp
    }
  };
}
