import React, {Component} from "react";
import logo from "../assets/images/logo-two.png";

import {getTimeNow, getDateNow} from "../class/datatime";
import mini_car from "../assets/images/car_icons/mini_ori.png";
import car from "../assets/images/car_icons/car_ori.png";
import mini_van from "../assets/images/car_icons/minivan_ori.png";
import kdh from "../assets/images/car_icons/kdh_ori.png";
import {Helmet} from 'react-helmet';
import {load_location_inputs, distance_calculation} from "../class/distanceMatrix";


class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromLocation: "",
            toLocation: "",
            from_to_input_error: "",
            final_error: "",
            pick_up_date: getDateNow(),
            pick_up_time: getTimeNow(),
            first_form: true,
            next_form: false,
            final_form: false,
            trip_way: props.taxiData.trip_way,
            customerName: "",
            customerContact: "",
            customerEmail: "",
            otpNumber: ""
        };
    }

    componentDidMount() {
        this.set_vehicle_id(1)
    }

    set_vehicle_id(id) {
        if (this.state.next_form) {
            const {taxiData} = this.props;
            this.props.setVehicle(id);
            distance_calculation(taxiData.fromLocation, taxiData.toLocation, this.props.setDistance, taxiData.trip_way, id, "YES", this.props.setPrince);
        } else {
            this.props.setVehicle(id)
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    get_from_data(event) {
        load_location_inputs(this.props.setFromLocation, event.target.id);
    }

    get_to_data(event) {
        load_location_inputs(this.props.setToLocation, event.target.id)
    }

    handleMainSubmit(event) {
        event.preventDefault();
        const {taxiData} = this.props;
        if (taxiData.fromLocation === "" || taxiData.toLocation === "") {
            this.setState({
                from_to_input_error: "Tell Pick up, Drop off locations, date and time before take a seat"
            })
        } else {
            window.location.hash = "/GetYourTaxi/" + taxiData.fromLocation + "/" + taxiData.toLocation + "/" + this.state.pick_up_date + "/" + this.state.pick_up_time + "/" + taxiData.selected_vehicle + "/1";
        }
    }


    render() {
        const {from_to_input_error, pick_up_date, pick_up_time} = this.state;
        const {taxiData} = this.props;
        return (
            <div className="container-fluid welcome-content d-flex align-items-md-center ">
                <Helmet>
                    <title>Your Taxi service</title>
                    <meta name="description"
                          content=""/>
                    <meta name="theme-color" content="#00ACEE"/>
                    <meta name="keywords"
                          content="business,business taxi,taxi business,cabs,tours cabs and tours,sri lanka, kalutara,agalawatta,taxi,local taxi,local taxi service, local taxi cab service,taxi,taxi 12200,wedding, wedding hires,booking cabs taxi, cabs packages, tours, tour packages"/>
                </Helmet>
                <div className="row welcome_div">
                    <div className="col-12 col-md-6 offset-md-1 logo-side text-center  d-flex align-items-md-center">
                        <div className="text-center w-100">
                            <p className="call_us">CALL US NOW</p>
                            <p className="contact-number"><a className="tel-num" href="tel:+000000000">+94 000000000</a></p>
                            <img alt="prime_logo" src={logo} className="img-fluid logo-image"/>
                            <p className="mission_text text-center text-capitalize">
                                exceed customer expectations by Providing Innovative & Value Added
                                Services
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 form-div shadow-sm">
                        <div className="col-12 text-center">
                            <p className="taxi-head">Hay! Taxi</p>
                            <hr/>
                            <form onSubmit={(e) => this.handleMainSubmit(e)}>
                                <div className="row">
                                    <div className="col-12">
                                        <input
                                            autoComplete="form_place"
                                            onKeyUp={(e) => this.get_from_data(e)}
                                            id="form_place"
                                            name="form_place"
                                            className="cus-input"
                                            placeholder="Pickup Location"
                                            defaultValue={taxiData.fromLocation === "" ? null : taxiData.fromLocation}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <input
                                            onKeyUp={(e) => this.get_to_data(e)}
                                            autoComplete="to_place"
                                            id="to_place"
                                            className="cus-input"
                                            placeholder="Destination Location"

                                            defaultValue={taxiData.toLocation === "" ? null : taxiData.toLocation}
                                        />
                                    </div>
                                </div>

                                <div className="row  text-left">
                                    <div className="col-12 ">
                                        <p className="input-label">Pick up date</p>
                                        <input
                                            type="date"
                                            id="current_date"
                                            name="pick_up_date"
                                            className="cus-input"
                                            placeholder="Second name"
                                            onChange={(e) => this.handleChange(e)}
                                            value={pick_up_date === "" ? taxiData.pick_up_date : pick_up_date}
                                        />
                                    </div>
                                </div>

                                <div className="row  text-left">

                                    <div className="col-12">
                                        <p className="input-label">Pick up time</p>
                                        <input
                                            type="time"
                                            id="current_time"
                                            name="pick_up_time"
                                            className="cus-input"
                                            placeholder="Second name"
                                            onChange={(e) => this.handleChange(e)}
                                            value={pick_up_time === "" ? taxiData.pick_up_time : pick_up_time}
                                        />
                                    </div>
                                </div>

                                <div className="row welcome-vehicle-cont">
                                    <div className="col-12">
                                        <img
                                            onClick={(e) => this.set_vehicle_id(1)}
                                            src={mini_car}
                                            alt="mini car thumb"
                                            className={taxiData.selected_vehicle === 1 ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                        />
                                        <img
                                            onClick={(e) => this.set_vehicle_id(2)}
                                            src={ car }
                                            alt="car thumb"
                                            className={taxiData.selected_vehicle === 2 ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                        />
                                        <img
                                            onClick={(e) => this.set_vehicle_id(3)}
                                            src={ mini_van}
                                            alt="mini van thumb"
                                            className={taxiData.selected_vehicle === 3 ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                        />
                                        <img
                                            onClick={(e) => this.set_vehicle_id(4)}
                                            src={ kdh}
                                            alt="kdh thumb"
                                            className={taxiData.selected_vehicle === 4 ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <p className="error_text">
                                            {from_to_input_error === "" ? null : from_to_input_error}
                                        </p>
                                        <button
                                            /*onClick={() => this.check_for_data_set()}*/
                                            type="submit"
                                            className="cus-button"
                                        >
                                            OK, Take a seat
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Welcome;
