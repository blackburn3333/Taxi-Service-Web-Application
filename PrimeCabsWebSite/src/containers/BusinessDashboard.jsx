import React, {Component} from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import {get_user_data, set_trip, get_pending_tours} from "../class/BusinessFuntions";
import {load_location_inputs_business} from "../class/distanceMatrix";
import {connect} from "react-redux";
import {getDateNow, getTimeNow} from "../class/datatime";
import {taxi_calculations} from "../class/package_calculations";
import {NotificationContainer} from "react-notifications";
import {ViewNotification} from "../class/globalfuntions";
import {contactValidation} from "../class/formValidation";
import {
    set_from_location_business,
    set_to_location_business,
    setDistance_business,
    setPickUpDateTime,
    set_business_way,
    bus_setVehicle

} from "../actions/BusinessActions";
import {SpinnerInsert, SpinnerLoading} from "../components/spinners";
import mini_car from "../assets/images/car_icons/mini_ori.png";
import car from "../assets/images/car_icons/car_ori.png";
import mini_van from "../assets/images/car_icons/minivan_ori.png";
import kdh from "../assets/images/car_icons/kdh_ori.png";
import bus from "../assets/images/car_icons/bus_ori.png";
import {reloadWindow} from "../services/global";

class BusinessDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BusinessName: "",
            BusinessBranch: "",
            BusinessCont: "",
            bus_from: "",
            bus_to: "",
            bus_res_f_name: "",
            bus_res_s_name: "",
            bus_res_cont: "",
            bus_member_count: "",
            bus_special_note: "",
            bus_pick_up_time: getTimeNow(),
            bus_pick_up_date: getDateNow(),
            price_loader: false,
            mini_car_price: 0,
            car_price: 0,
            mini_van_price: 0,
            van_price: 0,
            bus_price: 0,
            additional_Info: true,
            insert_spin: false,
            tour_sets: [],
            tour_complete_set:[]
        }
    }

    componentWillMount(){
        this.props.history.push('/businesshome')
    }

    book_for_tour(event) {
        event.preventDefault();
        const {mini_car_price, car_price, mini_van_price, van_price, bus_price, bus_pick_up_time, bus_pick_up_date, bus_from, bus_to, bus_res_f_name, bus_res_s_name, bus_res_cont, bus_member_count, bus_special_note, BusinessCont} = this.state;
        const {business_tour} = this.props;
        if (bus_from === "" || bus_to === "" || business_tour.bus_from === "" || business_tour.bus_to === "") {
            ViewNotification('error', 'Trip Booking', 'Select both pick up and drop off locations', 5000);
        } else if (bus_res_f_name === "" || bus_res_s_name === "" || bus_res_cont === "" || bus_member_count === "") {
            ViewNotification('error', 'Trip Booking', 'Responsible person name, Contact number and Tour members count required', 5000);
        } else if (contactValidation(bus_res_cont)) {
            ViewNotification('error', 'Trip Booking', "Invalid Responsible Person's Contact Number, Maximum length is 10", 5000);
        } else {
            this.setState({
                insert_spin: true
            });

            const data = {
                from_loc: business_tour.bus_from,
                to_loc: business_tour.bus_to,
                pick_up_date: bus_pick_up_date,
                pick_up_time: bus_pick_up_time,
                distance_value: business_tour.bus_distance.value,
                distance_text: business_tour.bus_distance.text,
                duration_value: business_tour.bus_durations.value,
                duration_text: business_tour.bus_durations.text,
                trip_type: business_tour.bus_trip_way,
                sel_vehi: business_tour.selected_vehicle,
                sel_vehi_price: business_tour.selected_vehicle === "1" ? mini_car_price : business_tour.selected_vehicle === "2" ? car_price : business_tour.selected_vehicle === "3" ? mini_van_price : business_tour.selected_vehicle === "4" ? van_price : bus_price,
                res_full_name: bus_res_f_name + " " + bus_res_s_name,
                res_cont_number: bus_res_cont,
                group_members_count: bus_member_count,
                spe_note: bus_special_note,
                token: sessionStorage.getItem('userTokenData'),
                cont_number: BusinessCont
            };
            const result = set_trip(data);
            result.then((res) => {
                if (res.status === 200) {
                    this.setState({
                        insert_spin: false
                    });

                    ViewNotification('success', 'Tour booking', res.data.message, 5000);
                    setTimeout(() => {
                        reloadWindow();
                    }, 2000)
                } else {
                    this.setState({
                        insert_spin: false
                    });

                    ViewNotification('error', 'Tour booking', res.data.message, 10000);
                }
            })
        }
    }


    componentDidUpdate() {
        this.re_fresh_price();
    }

    re_fresh_price() {
        setTimeout(() => {
            this.get_calculation();
        }, 1000)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        this.props.set_business_way("1");
        if (sessionStorage.getItem('userTokenData') !== undefined || sessionStorage.getItem('userTokenData') !== null || sessionStorage.getItem('userTokenData') !== "") {
            this.set_business_data();
            this.set_pending_tours();
        } else {
            this.logOut();
        }

    }

    set_pending_tours() {
        get_pending_tours(sessionStorage.getItem('userTokenData')).then((res) => {
            if (res.status === 200) {
                console.log(res.data.records);
                const result = res.data.records;
                this.setState({
                    tour_sets: result.filter((result)=>{
                        return result.job_done === "0"
                    }),
                    tour_complete_set:result.filter((result)=>{
                        return result.job_done !== "0"
                    })
                })
            }
        })
    }

    set_business_data() {
        const business_data = get_user_data(sessionStorage.getItem('userTokenData'));
        business_data.then((res) => {
            if (res.status !== 200) {
                this.logOut();
            } else {
                const business_data = JSON.parse(JSON.stringify(res.data.message.data));
                this.setState({
                    BusinessName: business_data.business,
                    BusinessBranch: business_data.branch,
                    BusinessCont: business_data.res_cont
                });
            }
        });
    }


    set_tour_way(event) {
        const {set_business_way, business_tour} = this.props;
        set_business_way(event.target.value);
        this.setState({
            price_loader: true,
        });
        setTimeout(() => {
            this.get_calculation(business_tour.bus_from, business_tour.bus_to);
        }, 1000)
    }

    get_calculation() {
        const {business_tour} = this.props;
        this.setState({
            mini_car_price: taxi_calculations(business_tour.bus_trip_way === "0" ? "1" : business_tour.bus_trip_way, 1, business_tour.bus_distance.value),
            car_price: taxi_calculations(business_tour.bus_trip_way === "0" ? "1" : business_tour.bus_trip_way, 2, business_tour.bus_distance.value),
            mini_van_price: taxi_calculations(business_tour.bus_trip_way === "0" ? "1" : business_tour.bus_trip_way, 3, business_tour.bus_distance.value),
            van_price: taxi_calculations(business_tour.bus_trip_way === "0" ? "1" : business_tour.bus_trip_way, 4, business_tour.bus_distance.value),
            bus_price: taxi_calculations(business_tour.bus_trip_way === "0" ? "1" : business_tour.bus_trip_way, 5, business_tour.bus_distance.value),
            price_loader: false
        });
    }


    set_vehicle_id(id) {
        this.props.bus_setVehicle(id);
    }

    get_from_data(event) {
        load_location_inputs_business(set_from_location_business, event.target.id, "Yes", setDistance_business);
    }

    get_to_data(event) {
        load_location_inputs_business(set_to_location_business, event.target.id, "Yes", setDistance_business);
    }

    logOut(event) {
        localStorage.removeItem('businessData');
        sessionStorage.removeItem('userTokenData');
        this.props.history.push('/business')
    }

    render() {
        const {tour_complete_set,tour_sets, insert_spin, bus_price, mini_car_price, car_price, mini_van_price, van_price, price_loader, additional_Info, BusinessName, BusinessBranch, bus_pick_up_time, bus_pick_up_date} = this.state;
        const {business_tour} = this.props;
        return (
            <div>
                <Navbar/>

                <div className="container-fluid main-business-container">
                    <div className="row companyName_row">
                        <div className="col-12 text-center">
                            <p className="head-name-comp">{BusinessName}</p>
                            <p className="branch-name-comp">{BusinessBranch}</p>
                        </div>
                        <div className="col-6 col-lg-2 col-xl-2 offset-lg-4 offset-xl-4 text-center">
                            <button type="button" className="settings-buttons text-center">
                                <span className="material-icons">settings</span>
                                Settings
                            </button>
                        </div>
                        <div className="col-6 col-lg-2 col-xl-2 text-center">
                            <button onClick={(e) => this.logOut(e)} type="button"
                                    className="settings-buttons text-center">
                                <span className="material-icons">power_settings_new</span>
                                Sign out
                            </button>
                        </div>
                    </div>
                    <div className="row tab-area">
                        <div className="col-xl-10 col-lg-10 offset-xl-1 offset-lg-1">
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active tab-text-cus" id="nav-trip-tab"
                                       data-toggle="tab" href="#nav-trip" role="tab" aria-controls="nav-trip"
                                       aria-selected="true">Make Tour</a>
                                    <a className="nav-item nav-link  tab-text-cus" id="nav-home-tab"
                                       data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home"
                                       aria-selected="true">Pending Tour</a>
                                    <a className="nav-item nav-link tab-text-cus" id="nav-profile-tab" data-toggle="tab"
                                       href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Completed
                                        Tours</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active tab-inner" id="nav-trip" role="tabpanel"
                                     aria-labelledby="nav-trip-tab">
                                    <form onSubmit={(e) => this.book_for_tour(e)}>
                                        <div className="row">
                                            <div className="col-12 text-center title-text-tab-inner">
                                                New Tour
                                                <hr/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-4 col-xl-4 offset-xl-2 offset-lg-2">
                                                <input
                                                    autoComplete="form"
                                                    onKeyUp={(e) => this.get_from_data(e)}
                                                    onChange={(e) => this.handleChange(e)}
                                                    id="bus_from"
                                                    name="bus_from"
                                                    className="cus-input"
                                                    placeholder="Pickup Location"
                                                    defaultValue={business_tour.bus_from === "" ? this.state.bus_from : business_tour.bus_from}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 col-xl-4">
                                                <input
                                                    onKeyUp={(e) => this.get_to_data(e)}
                                                    onChange={(e) => this.handleChange(e)}
                                                    autoComplete="to"
                                                    id="bus_to"
                                                    name="bus_to"
                                                    className="cus-input cus-input-sups"
                                                    placeholder="Destination Location"
                                                    defaultValue={business_tour.bus_to === "" ? this.state.bus_to : business_tour.bus_to}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-4 col-xl-4 offset-xl-2 offset-lg-2">
                                                <p className="input-label">Pick up date</p>
                                                <input
                                                    type="date"
                                                    id="bus_pick_up_date"
                                                    name="bus_pick_up_date"
                                                    className="cus-input cus-input-sups"
                                                    placeholder="Second name"
                                                    onChange={(e) => this.handleChange(e)}
                                                    value={bus_pick_up_date === "" ? business_tour.bus_pick_up_date : bus_pick_up_date}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 col-xl-4">
                                                <p className="input-label">Pick up time</p>
                                                <input
                                                    type="time"
                                                    id="bus_pick_up_time"
                                                    name="bus_pick_up_time"
                                                    className="cus-input cus-input-sups"
                                                    placeholder="Second name"
                                                    onChange={(e) => this.handleChange(e)}
                                                    value={bus_pick_up_time === "" ? business_tour.bus_pick_up_time : bus_pick_up_time}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <hr/>
                                            </div>
                                            <div className="col-6 col-md-4 offset-md-2 text-center">
                                                <input className="cus-radio-btns" onChange={(e) => this.set_tour_way(e)}
                                                       checked={business_tour.bus_trip_way === "1"} value="1"
                                                       type="radio"
                                                       name="trip_way"/>
                                                <label className="radio-label">One way trip</label>
                                            </div>
                                            <div className="col-6 col-md-4 text-center">
                                                <input className="cus-radio-btns" onChange={(e) => this.set_tour_way(e)}
                                                       checked={business_tour.bus_trip_way === "2"} value="2"
                                                       type="radio"
                                                       name="trip_way"/>
                                                <label className="radio-label">Two way trip</label>
                                            </div>
                                        </div>
                                        <div className="row info-row text-center">
                                            <div className="col-12 ">
                                                <hr/>
                                            </div>
                                            <div className="col-6 col-md-4 offset-md-2">
                                                <p className="value-lables">Distance</p>
                                                <p className="time_date_value">{business_tour.bus_distance.text}</p>
                                            </div>
                                            <div className="col-6 col-md-4">
                                                <p className="value-lables">Duration</p>
                                                <p className="time_date_value">{business_tour.bus_durations.text}</p>
                                            </div>
                                            <div className="col-12 ">
                                                <hr/>
                                                {additional_Info ?
                                                    <p className="badge badge-info">Tell up Pick up, Drop off location
                                                        and
                                                        tour
                                                        type.</p>
                                                    : null}
                                            </div>
                                        </div>

                                        <div className="row images-tax-ex">

                                            <div onClick={(e) => this.set_vehicle_id("1")}
                                                 className={business_tour.selected_vehicle === "1" ? "col-6 col-md-2 offset-md-1 text-center  extend-image-base-selected" : "col-6 offset-md-1  col-md-2 text-center extend-image-base"}>
                                                <img

                                                    src={mini_car}
                                                    alt="mini car thumb"
                                                    className={business_tour.selected_vehicle === "1" ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                                />
                                                <p>Mini Car</p>
                                                {price_loader ?
                                                    <SpinnerLoading/>
                                                    : <p className="price-label">LKR {mini_car_price.toFixed(2)}</p>
                                                }
                                            </div>
                                            <div onClick={(e) => this.set_vehicle_id("2")}
                                                 className={business_tour.selected_vehicle === "2" ? "col-6 col-md-2 text-center  extend-image-base-selected" : "col-6 col-md-2 text-center extend-image-base"}>

                                                <img

                                                    src={ car }
                                                    alt="car thumb"
                                                    className={business_tour.selected_vehicle === "2" ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                                />
                                                <p>Car</p>
                                                {price_loader ?
                                                    <SpinnerLoading/>
                                                    :
                                                    <p className="price-label">LKR {car_price.toFixed(2)}</p>
                                                }
                                            </div>
                                            <div onClick={(e) => this.set_vehicle_id("3")}
                                                 className={business_tour.selected_vehicle === "3" ? "col-6 col-md-2 text-center  extend-image-base-selected" : "col-6 col-md-2 text-center extend-image-base"}>
                                                <img

                                                    src={ mini_van}
                                                    alt="mini van thumb"
                                                    className={business_tour.selected_vehicle === "3" ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                                />
                                                <p>Mini Van</p>
                                                {price_loader ?
                                                    <SpinnerLoading/>
                                                    :
                                                    <p className="price-label">LKR {mini_van_price.toFixed(2)}</p>
                                                }
                                            </div>
                                            <div onClick={(e) => this.set_vehicle_id("4")}
                                                 className={business_tour.selected_vehicle === "4" ? "col-6 col-md-2 text-center  extend-image-base-selected" : "col-6 col-md-2 text-center extend-image-base"}>
                                                <img

                                                    src={ kdh}
                                                    alt="kdh thumb"
                                                    className={business_tour.selected_vehicle === "4" ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                                />
                                                <p>Van</p>
                                                {price_loader ?
                                                    <SpinnerLoading/>
                                                    :
                                                    <p className="price-label">LKR {van_price.toFixed(2)}</p>
                                                }
                                            </div>
                                            <div onClick={(e) => this.set_vehicle_id("5")}
                                                 className={business_tour.selected_vehicle === "5" ? "col-6 col-md-2 text-center  extend-image-base-selected" : "col-6 col-md-2 text-center extend-image-base"}>
                                                <img

                                                    src={ bus}
                                                    alt="kdh thumb"
                                                    className={business_tour.selected_vehicle === "5" ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                                                />
                                                <p>Bus</p>
                                                {price_loader ?
                                                    <SpinnerLoading/>
                                                    :
                                                    <p className="price-label">LKR {bus_price.toFixed(2)}</p>
                                                }
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <hr/>
                                            </div>
                                            <div className="col-12 col-lg-4 col-xl-4 offset-xl-2 offset-lg-2">
                                                <input
                                                    autoComplete="bus_res_name"
                                                    onChange={(e) => this.handleChange(e)}
                                                    id="bus_res_f_name"
                                                    name="bus_res_f_name"
                                                    className="cus-input"
                                                    placeholder="Enter Tour Leader First Name"
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 col-xl-4">
                                                <input
                                                    autoComplete="bus_res_f_name"
                                                    onChange={(e) => this.handleChange(e)}
                                                    id="bus_res_s_name"
                                                    name="bus_res_s_name"
                                                    className="cus-input"
                                                    placeholder="Enter Tour Leader Second Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-4 col-xl-4 offset-xl-2 offset-lg-2">
                                                <input
                                                    autoComplete="bus_res_cont"
                                                    onChange={(e) => this.handleChange(e)}
                                                    id="bus_res_cont"
                                                    name="bus_res_cont"
                                                    className="cus-input"
                                                    placeholder="Enter Tour Leader Contact Number"
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 col-xl-4">
                                                <input
                                                    autoComplete="bus_res_name"
                                                    onChange={(e) => this.handleChange(e)}
                                                    id="bus_member_count"
                                                    name="bus_member_count"
                                                    className="cus-input"
                                                    placeholder="Members Count"
                                                />
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-6 col-xl-6 offset-xl-3 offset-lg-3">
                                                <textarea
                                                    style={{resize: "none"}}
                                                    rows="3"
                                                    autoComplete="bus_res_cont"
                                                    onChange={(e) => this.handleChange(e)}
                                                    id="bus_special_note"
                                                    name="bus_special_note"
                                                    className="cus-input"
                                                    placeholder="Enter Special Note"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-12 col-lg-4 col-xl-4 offset-xl-4 offset-lg-4">
                                                {insert_spin ? <SpinnerInsert/> : null}

                                                <button className="cus-button" type="submit">
                                                    OK, Lets ride
                                                </button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade show " id="nav-home" role="tabpanel"
                                     aria-labelledby="nav-home-tab">
                                    <div className="row tab-inner">
                                        <div className="col-lg-12 col-xl-12">
                                            <table className="table table-custom-mobile" style={{width: "100%"}}>
                                                <tbody>
                                                <tr>
                                                    <th>
                                                        Ref ID
                                                    </th>
                                                    <th>From</th>
                                                    <th>to</th>
                                                    <th className="hide-col-table">Duration</th>
                                                    <th className="hide-col-table">Distance</th>
                                                    <th>Status</th>
                                                </tr>
                                                {
                                                    tour_sets.map((tour_sets, index) =>
                                                        <tr key={index}>
                                                            <td>{tour_sets.id}</td>
                                                            <td>{tour_sets.fromLocation}</td>
                                                            <td>{tour_sets.toLocation}</td>
                                                            <td className="hide-col-table">{tour_sets.durations}</td>
                                                            <td className="hide-col-table">{tour_sets.distance}</td>
                                                            <td>{
                                                                tour_sets.job_done === "0" ? <span
                                                                    className="badge badge-warning">Pending...</span> :
                                                                    <span
                                                                        className="badge badge-secondary">Secondary</span>
                                                            }</td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel"
                                     aria-labelledby="nav-profile-tab">
                                    <div className="row tab-inner">
                                        <div className="col-lg-12 col-xl-12">
                                            <table className="table table-custom-mobile" style={{width: "100%"}}>
                                                <tbody>
                                                <tr>
                                                    <th>
                                                        Ref ID
                                                    </th>
                                                    <th>From</th>
                                                    <th>to</th>
                                                    <th className="hide-col-table">Duration</th>
                                                    <th className="hide-col-table">Distance</th>
                                                    <th>Status</th>
                                                </tr>
                                                {
                                                    tour_complete_set.map((tour_complete_set, index) =>
                                                        <tr key={index}>
                                                            <td>{tour_complete_set.id}</td>
                                                            <td>{tour_complete_set.fromLocation}</td>
                                                            <td>{tour_complete_set.toLocation}</td>
                                                            <td className="hide-col-table">{tour_complete_set.durations}</td>
                                                            <td className="hide-col-table">{tour_complete_set.distance}</td>
                                                            <td>{
                                                                tour_complete_set.job_done !== "0" ? <span
                                                                    className="badge badge-success">Successful...</span> :
                                                                    <span
                                                                        className="badge badge-warning">Pending...</span>
                                                            }</td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        business_tour: state.business_tour
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        set_from_location_business: (value) => {
            dispatch(set_from_location_business(value))
        },
        set_to_location_business: (value) => {
            dispatch(set_to_location_business(value))
        },
        setPickUpDateTime: (date, time) => {
            dispatch(setPickUpDateTime(time, date))
        },
        set_business_way: (type) => {
            dispatch(set_business_way(type))
        },
        bus_setVehicle: (value) => {
            dispatch(bus_setVehicle(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDashboard);