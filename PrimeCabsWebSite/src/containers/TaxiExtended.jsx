import React, {Component} from "react";
import Navbar from "../components/navbar";
import {connect} from "react-redux";
import primeLogo from "../assets/images/logo-two.png";
import {load_location_inputs, setDistanceData} from "../class/distanceMatrix";
import {getDateNow, getTimeNow} from "../class/datatime";
import {taxi_calculations} from "../class/package_calculations";
import {insert_taxi_data, check_conformation_code} from "../class/Taxi";
import {ViewNotification} from "../class/globalfuntions";
import {SpinnerInsert, SpinnerLoading, SpinnerConfirming} from "../components/spinners";
import {NotificationContainer} from "react-notifications";
import {Helmet} from 'react-helmet';
import $ from "jquery/dist/jquery";
import OTP from "../assets/images/otp.png";

import Footer from "../components/footer";

import {
    setVehicle,
    setFromLocation,
    setToLocation,
    setDistance,
    setPickUpDateTime,
    setTourWay,
    setFinalData,
    setPrice
} from "../actions/TaxiServiceActions";

import mini_car from "../assets/images/car_icons/mini_ori.png";
import car from "../assets/images/car_icons/car_ori.png";
import mini_van from "../assets/images/car_icons/minivan_ori.png";
import kdh from "../assets/images/car_icons/kdh_ori.png";
import { reloadWindow } from '../services/global';


class TaxiExtended extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pick_up_date: getDateNow(),
            pick_up_time: getTimeNow(),
            price_loader: true,
            fromLocation: "",
            toLocation: "",
            customerNameF: "",
            customerNameS: "",
            customerEmail: "",
            customerContact: "",
            conformation_code: "",
            inserting_data: false,
            mini_car_price: 0,
            car_price: 0,
            mini_van_price: 0,
            van_price: 0,
            ref_id: 0,
            confirm_sip: false,
            additional_Info: true,
            booking_place_error: false
        };

    }

    set_tour_way(event) {
        const {setTourWay, taxi} = this.props;
        setTourWay(event.target.value);
        this.setState({
            price_loader: true,
        });
        setTimeout(() => {
            this.get_calculation(taxi.fromLocation, taxi.toLocation);
        }, 1000)
    }


    get_from_data(event) {
        load_location_inputs(setFromLocation, event.target.id, "Yes", setDistance);
    }

    get_to_data(event) {
        load_location_inputs(setToLocation, event.target.id, "Yes", setDistance);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        this.load_taxi_data();
        this.props.setTourWay("1");
    }

    set_vehicle_id(id) {
        const {setVehicle} = this.props;
        setVehicle(id);
    }

    componentDidUpdate() {
        this.re_fresh_price();
    }

    re_fresh_price() {
        setTimeout(() => {
            this.get_calculation();
        }, 1000)
    }

    /*componentWillMount() {
        this.props.history.push('/getyourtaxi');
    }*/

    load_taxi_data() {
        const {from, to, pickupdate, time, vehicle_type, trip_type} = this.props.match.params;
        if (from === undefined || to === undefined || pickupdate === undefined || time === undefined || vehicle_type === undefined || vehicle_type === undefined || trip_type === undefined) {

            this.setState({
                price_loader: false,
            });

        } else {
            this.setState({
                fromLocation: from,
                toLocation: to,
                pick_up_date: pickupdate,
                pick_up_time: time,
                additional_Info: false

            });
            this.setBasicData(from, to, time, pickupdate, vehicle_type, trip_type);
            setTimeout(() => {
                this.setDistanceDataFirst(from, to);
            }, 1000);
        }
    }


    setBasicData(from, to, time, pickupdate, v_id, trip_type) {
        const {setFromLocation, setToLocation, setPickUpDateTime, setVehicle, setTourWay} = this.props;
        setFromLocation(from);
        setToLocation(to);
        setPickUpDateTime(time, pickupdate);
        setVehicle(v_id);
        setTourWay(trip_type)
    }

    setDistanceDataFirst(from, to) {
        setDistanceData(from, to, setDistance);
        setTimeout(() => {
            this.get_calculation(from, to);
        }, 1000)
    }


    get_calculation() {
        const {taxi} = this.props;
        this.setState({
            mini_car_price: taxi_calculations(taxi.trip_way === "0" ? "1" : taxi.trip_way, 1, taxi.distance.value),
            car_price: taxi_calculations(taxi.trip_way === "0" ? "1" : taxi.trip_way, 2, taxi.distance.value),
            mini_van_price: taxi_calculations(taxi.trip_way === "0" ? "1" : taxi.trip_way, 3, taxi.distance.value),
            van_price: taxi_calculations(taxi.trip_way === "0" ? "1" : taxi.trip_way, 4, taxi.distance.value),
            price_loader: false
        });
    }


    book_taxi(evet) {
        evet.preventDefault();
        const regexEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        const regexContact = /^[0-9]{10,10}$/;
        const {taxi} = this.props;
        const {
            fromLocation, toLocation, customerNameF,
            customerNameS,
            customerContact,
            customerEmail,
        } = this.state;
        let slected_price = 0;
        if (taxi.selected_vehicle === "1") {
            slected_price = this.state.mini_car_price;
        } else if (taxi.selected_vehicle === "2") {
            slected_price = this.state.car_price;
        } else if (taxi.selected_vehicle === "3") {
            slected_price = this.state.mini_van_price;
        } else if (taxi.selected_vehicle === "4") {
            slected_price = this.state.van_price;
        }

        if (fromLocation === "" || toLocation === "" || taxi.fromLocation === "" || taxi.toLocation === "") {
            ViewNotification('error', 'Error', 'Select both pick up and drop off locations', 5000)
        } else if (customerNameF === "" || customerNameS === "" || customerContact === "") {
            ViewNotification('error', 'Error', 'Enter your first name, last name and contact number', 5000)
        } else if (customerEmail !== "" && !regexEmail.test(customerEmail)) {
            ViewNotification('warning', 'Error', 'Invalid Email Address', 5000)
        } else if (customerContact !== "" && !regexContact.test(customerContact)) {
            ViewNotification('warning', 'Error', 'Invalid Contact Number Ex: ', 5000)
        }
        else {
            this.setState({
                inserting_data: true
            });
            const result = insert_taxi_data(
                taxi.fromLocation,
                taxi.toLocation,
                taxi.distance.value,
                taxi.distance.text,
                taxi.durations.value,
                taxi.durations.text,
                taxi.trip_way,
                taxi.selected_vehicle,
                slected_price.toFixed(2),
                this.state.customerNameF,
                this.state.customerNameS,
                this.state.customerEmail,
                this.state.customerContact,
                this.state.pick_up_date,
                this.state.pick_up_time);

            result.then((res) => {
                if (res.status === 200) {
                    this.setState({
                        inserting_data: false,
                        ref_id: res.data.last_id
                    });
                    $('#conf_model').modal('show');
                } else {
                    ViewNotification('info', 'Hay Taxi', " Contact our customer care", 10000)
                }
            })
        }
    }


    setConfirm(event) {
        event.preventDefault();
        const {ref_id, conformation_code} = this.state;
        this.setState({
            confirm_sip: true
        });
        setTimeout(() => {
            const result = check_conformation_code(ref_id, conformation_code);
            result.then((res) => {
                if (res.status === 200) {
                    ViewNotification('success', 'Hay Taxi', res.data.message, 5000);
                    setTimeout(() => {
                        reloadWindow();
                    }, 2000)
                } else {
                    ViewNotification('info', 'Hay Taxi', res.data.message, 10000);
                    this.setState({
                        booking_place_error: true
                    })
                }
            });
            this.setState({
                confirm_sip: false
            });

        }, 1000)
    }

    render() {
        const {taxi} = this.props;
        const {booking_place_error, confirm_sip, ref_id, inserting_data, error_text, additional_Info, price_loader, mini_car_price, car_price, mini_van_price, van_price, pick_up_date, pick_up_time} = this.state;
        return (
            <div className="taxiCont">
                <Helmet>
                    <title>Your Taxi service</title>
                    <meta name="description"
                          content=""/>
                    <meta name="theme-color" content="#00ACEE"/>
                    <meta name="keywords"
                          content=",cabs,tours, cabs and tours,sri lanka, kalutara,agalawatta,taxi,local taxi,local taxi service, local taxi cab service,taxi,taxi 12200,wedding, wedding hires,booking, cabs taxi,  cabs packages, tours, tour packages"/>
                </Helmet>
                <Navbar/>
                <div className="container-fluid package_taxi">
                    <div className="row taxi_ex_head">
                        <div className="col-12 col-lg-4 col-xl-4 offset-lg-4  offset-xl-4 text-center">
                            <p className="call_us">CALL US NOW</p>
                            <p className="contact-number"><a className="tel-num" href="tel:+000000000">+94 000000000</a></p>
                            <img src={primeLogo} className="img-fluid" alt="logo"/>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div className="container taxi-form">
                    <form onSubmit={(e) => this.book_taxi(e)}>
                        <div className="row">
                            <div className="col-12 col-md-4 offset-md-2">
                                <input
                                    autoComplete="form_place"
                                    onKeyUp={(e) => this.get_from_data(e)}
                                    onChange={(e) => this.handleChange(e)}
                                    id="form_place"
                                    name="fromLocation"
                                    className="cus-input cus-input-sups"
                                    placeholder="Pickup Location"
                                    defaultValue={taxi.fromLocation === "" ? this.state.fromLocation : taxi.fromLocation}
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <input
                                    onKeyUp={(e) => this.get_to_data(e)}
                                    onChange={(e) => this.handleChange(e)}
                                    autoComplete="to_place"
                                    id="to_place"
                                    name="toLocation"
                                    className="cus-input cus-input-sups"
                                    placeholder="Destination Location"

                                    defaultValue={taxi.toLocation === "" ? this.state.toLocation : taxi.toLocation}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-4 offset-md-2">
                                <p className="input-label">Pick up date</p>
                                <input
                                    type="date"
                                    id="current_date"
                                    name="pick_up_date"
                                    className="cus-input cus-input-sups"
                                    placeholder="Second name"
                                    onChange={(e) => this.handleChange(e)}
                                    value={pick_up_date === "" ? taxi.pick_up_date : pick_up_date}
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <p className="input-label">Pick up time</p>
                                <input
                                    type="time"
                                    id="current_time"
                                    name="pick_up_time"
                                    className="cus-input cus-input-sups"
                                    placeholder="Second name"
                                    onChange={(e) => this.handleChange(e)}
                                    value={pick_up_time === "" ? taxi.pick_up_time : pick_up_time}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <hr/>
                            </div>
                            <div className="col-6 col-md-4 offset-md-2 text-center">
                                <input className="cus-radio-btns" onChange={(e) => this.set_tour_way(e)}
                                       checked={taxi.trip_way === "1"} value="1" type="radio" name="trip_way"/>
                                <label className="radio-label">One way trip</label>
                            </div>
                            <div className="col-6 col-md-4 text-center">
                                <input className="cus-radio-btns" onChange={(e) => this.set_tour_way(e)}
                                       checked={taxi.trip_way === "2"} value="2" type="radio" name="trip_way"/>
                                <label className="radio-label">Two way trip</label>
                            </div>
                        </div>
                        <div className="row info-row text-center">
                            <div className="col-12 ">
                                <hr/>
                            </div>
                            <div className="col-6 col-md-4 offset-md-2">
                                <p className="value-lables">Distance</p>
                                <p className="time_date_value">{taxi.distance.text}</p>
                            </div>
                            <div className="col-6 col-md-4">
                                <p className="value-lables">Duration</p>
                                <p className="time_date_value">{taxi.durations.text}</p>
                            </div>
                            <div className="col-12 ">
                                <hr/>
                                {additional_Info ?
                                    <p className="badge badge-info">Tell up Pick up, Drop off location and tour
                                        type.</p>
                                    : null}
                            </div>
                        </div>
                        <div className="row images-tax-ex">

                            <div onClick={(e) => this.set_vehicle_id("1")}
                                 className={taxi.selected_vehicle === "1" ? "col-6 col-md-2 offset-md-2 text-center  extend-image-base-selected" : "col-6 offset-md-2  col-md-2 text-center extend-image-base"}>
                                <img

                                    src={mini_car}
                                    alt="mini car thumb"
                                    className={taxi.selected_vehicle === "1" ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                />
                                <p>Mini Car</p>
                                {price_loader ?
                                    <SpinnerLoading/>
                                    : <p className="price-label">LKR {mini_car_price.toFixed(2)}</p>
                                }
                            </div>
                            <div onClick={(e) => this.set_vehicle_id("2")}
                                 className={taxi.selected_vehicle === "2" ? "col-6 col-md-2 text-center  extend-image-base-selected" : "col-6 col-md-2 text-center extend-image-base"}>

                                <img

                                    src={ car }
                                    alt="car thumb"
                                    className={taxi.selected_vehicle === "2" ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                />
                                <p>Car</p>
                                {price_loader ?
                                    <SpinnerLoading/>
                                    :
                                    <p className="price-label">LKR {car_price.toFixed(2)}</p>
                                }
                            </div>
                            <div onClick={(e) => this.set_vehicle_id("3")}
                                 className={taxi.selected_vehicle === "3" ? "col-6 col-md-2 text-center  extend-image-base-selected" : "col-6 col-md-2 text-center extend-image-base"}>
                                <img

                                    src={ mini_van}
                                    alt="mini van thumb"
                                    className={taxi.selected_vehicle === "3" ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                />
                                <p>Mini Van</p>
                                {price_loader ?
                                    <SpinnerLoading/>
                                    :
                                    <p className="price-label">LKR {mini_van_price.toFixed(2)}</p>
                                }
                            </div>
                            <div onClick={(e) => this.set_vehicle_id("4")}
                                 className={taxi.selected_vehicle === "4" ? "col-6 col-md-2 text-center  extend-image-base-selected" : "col-6 col-md-2 text-center extend-image-base"}>
                                <img

                                    src={ kdh}
                                    alt="kdh thumb"
                                    className={taxi.selected_vehicle === "4" ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                />
                                <p>Van</p>
                                {price_loader ?
                                    <SpinnerLoading/>
                                    :
                                    <p className="price-label">LKR {van_price.toFixed(2)}</p>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <hr/>
                            </div>
                            <div className="col-12 col-md-4 offset-md-2">
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    name="customerNameF"
                                    className="cus-input cus-input-sups"
                                    placeholder="Enter First Name"
                                    type="text"
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    name="customerNameS"
                                    className="cus-input cus-input-sups"
                                    placeholder="Enter Second Name"
                                    type="text"
                                />
                            </div>
                            <div className="col-12 col-md-4 offset-md-2">
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    name="customerEmail"
                                    className="cus-input cus-input-sups"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    name="customerContact"
                                    className="cus-input cus-input-sups"
                                    placeholder="Enter Contact Number"
                                    type="numbers"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-center">
                                {inserting_data ?
                                    <SpinnerInsert />
                                    : null}
                                <hr/>
                                <p className="badge badge-danger errorBadge">{error_text}</p>
                                {booking_place_error ?
                                    <p className="badge badge-danger errorBadge">confirmation error contact our customer
                                        care and confirm your booking</p>
                                    : null}
                            </div>
                            <div className="col-12 col-md-4 offset-md-4">
                                <button
                                    className="cus-button"
                                >
                                    OK, Lets ride
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal fade number_conf_model" id="conf_model" tabIndex="-1" role="dialog"
                     aria-labelledby="conf_modelModalCenterTitle" aria-hidden="true"
                     data-toggle="modal" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog  modal-dialog-centered" role="document">
                        <div className="modal-content cus-model-conf">
                            <div className="modal-header">
                                <h5 className="modal-title" id="conf_modelModalCenterTitle">Your reference ID
                                    : {ref_id}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-4 offset-4 col-md-2 offset-md-5 text-center">
                                        <img src={OTP} alt="otp_Image" className="img-fluid img-otp"/>
                                    </div>
                                    <div className="col-12 text-center">
                                        <p className="title">Verification code</p>
                                        <p className="decs-data">Enter verification number that sent to your contact
                                            number</p>
                                        <form onSubmit={(e) => this.setConfirm(e)}>
                                            <input
                                                onChange={(e) => this.handleChange(e)}
                                                id="conformation_code"
                                                name="conformation_code"
                                                className="cus-input cus-input-sups"
                                                placeholder="Verification number"
                                                required
                                            />
                                            {confirm_sip ? <SpinnerConfirming/> : null}
                                            <button type="submit" className="cus-button">
                                                Confirm
                                            </button>
                                        </form>
                                        {booking_place_error ?
                                            <p className="badge badge-danger errorBadge">confirmation error contact our
                                                customer care and confirm your booking</p>
                                            : null}
                                        <p className="decs-data">or<br/>call our customer care and tell reference
                                            number {ref_id} that given to you</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
                <NotificationContainer/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        taxi: state.taxi
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setVehicle: (car_id) => {
            dispatch(setVehicle(car_id));
        },
        setPickUpDateTime: (time, date) => {
            dispatch(setPickUpDateTime(time, date));
        },
        setTourWay: (type) => {
            dispatch(setTourWay(type))
        },
        setFinalData: (name, contact, email, otp) => {
            dispatch(setFinalData(name, contact, email, otp))
        },
        setFromLocation: (location) => {
            dispatch(setFromLocation(location))
        },
        setToLocation: (location) => {
            dispatch(setToLocation(location))
        }, setPrice: (price) => {
            dispatch(setPrice(price))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxiExtended);