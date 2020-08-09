import React, {Component} from "react";
import {getDateNow, getTimeNow} from "../class/datatime";
import Kandy from "../assets/images/packs/kandy.jpg";
import Hikka from "../assets/images/packs/hikka.jpg";
import Pasikuda from "../assets/images/packs/pasikuda.jpg";
import Matara from "../assets/images/packs/matara.jpg";
import Jaffna from "../assets/images/packs/jaffna.jpg";
import AruBay from "../assets/images/packs/aru.jpg";
import Baddula from "../assets/images/packs/baddula.jpg";
import Trinco from "../assets/images/packs/trinco.jpg";
import NuwaraEliya from "../assets/images/packs/nuwaraeliya.jpg";
import Katharagama from "../assets/images/packs/katharagama.jpg";
import Mathle from "../assets/images/packs/mathale.jpg";
import Anuradhapura from "../assets/images/packs/anuradhapura.jpg";
import Galle from "../assets/images/packs/galle.jpg";
import Ella from "../assets/images/packs/ella.jpg";
import Kurunegala from "../assets/images/packs/kurunegala.jpg";
import {SpinnerInsert} from "../components/spinners";

import mini_car from "../assets/images/car_icons/mini_ori.png";
import car_sm from "../assets/images/car_icons/car_ori.png";
import mini_van from "../assets/images/car_icons/minivan_ori.png";
import kdh_sm from "../assets/images/car_icons/kdh_ori.png";
import bus_sm from "../assets/images/car_icons/bus_ori.png";

import $ from "jquery/dist/jquery";

import {ViewNotification} from "../class/globalfuntions";
import {NotificationContainer} from "react-notifications";

import {pack_cal_new} from "../class/package_calculations";

import {set_package} from "../class/packageOperations";

import {reloadWindow} from "../services/global";



import {createHashHistory} from 'history';


class OurPacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehical_packs: [
                {id: 1, type: "Mini Car", perKm: 35, passengers: 3, graph: mini_car},
                {id: 2, type: "Car", perKm: 45, passengers: 4, graph: car_sm},
                {id: 3, type: "Mini van", perKm: 43, passengers: 9, graph: mini_van},
                {id: 4, type: "Van", perKm: 50, passengers: 14, graph: kdh_sm},
                {id: 5, type: "Bus", perKm: 70, passengers: 28, graph: bus_sm}
            ],
            tour_paks: [
                {
                    t_id: "kandy",
                    to: "Kandy",
                    fromKalutara: 300,
                    fromColombo: 250,
                    plus_k_2d: 100,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Kandy
                },
                {
                    t_id: "badulla",
                    to: "Badulla",
                    fromKalutara: 450,
                    fromColombo: 500,
                    plus_k_2d: 50,
                    plus_c_2d: 50,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Baddula
                },
                {
                    t_id: "matale",
                    to: "Matale",
                    fromKalutara: 400,
                    fromColombo: 400,
                    plus_k_2d: 100,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,


                    image: Mathle
                },
                {
                    t_id: "pasikuda",
                    to: "Pasikuda",
                    fromKalutara: 700,
                    fromColombo: 700,
                    plus_k_2d: 0,
                    plus_c_2d: 0,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Pasikuda
                },
                {
                    t_id: "trincomalee",
                    to: "Trincomalee",
                    fromKalutara: 600,
                    fromColombo: 550,
                    plus_k_2d: 0,
                    plus_c_2d: 50,
                    plus_k_3d: 125,
                    plus_c_3d: 125,


                    image: Trinco
                },
                {
                    t_id: "anuradhapura",
                    to: "Anuradhapura",
                    fromKalutara: 700,
                    fromColombo: 500,
                    plus_k_2d: 0,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Anuradhapura
                },
                {
                    t_id: "matara",
                    to: "Matara",
                    fromKalutara: 250,
                    fromColombo: 350,
                    plus_k_2d: 100,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Matara
                },
                {
                    t_id: "nuwara",
                    to: "Nuwara Eliya",
                    fromKalutara: 400,
                    fromColombo: 350,
                    plus_k_2d: 100,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: NuwaraEliya
                },
                {
                    t_id: "galla",
                    to: "Galle",
                    fromKalutara: 200,
                    fromColombo: 250,
                    plus_k_2d: 100,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Galle
                },
                {
                    t_id: "jaffna",
                    to: "Jaffna",
                    fromKalutara: 900,
                    fromColombo: 800,
                    plus_k_2d: 0,
                    plus_c_2d: 0,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Jaffna
                },
                {
                    t_id: "hikkaduwa",
                    to: "Hikkaduwa",
                    fromKalutara: 150,
                    fromColombo: 200,
                    plus_k_2d: 100,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Hikka
                },
                {
                    t_id: "Arugambay",
                    to: "Arugam Bay",
                    fromKalutara: 750,
                    fromColombo: 700,
                    plus_k_2d: 0,
                    plus_c_2d: 50,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: AruBay
                },
                {
                    t_id: "kataragama",
                    to: "Kataragama",
                    fromKalutara: 550,
                    fromColombo: 600,
                    plus_k_2d: 0,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Katharagama
                },
                {
                    t_id: "ella",
                    to: "Ella",
                    fromKalutara: 400,
                    fromColombo: 400,
                    plus_k_2d: 100,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Ella
                },
                {
                    t_id: "kurunegala",
                    to: "Kurunegala",
                    fromKalutara: 300,
                    fromColombo: 200,
                    plus_k_2d: 100,
                    plus_c_2d: 100,
                    plus_k_3d: 125,
                    plus_c_3d: 125,

                    image: Kurunegala
                },
            ],
            placetoExplore: "",
            searchError: false,
            redirect: false,
            redirect_full: false,
            selected_data: [],


            customer_f_name: "",
            customer_s_name: "",

            customer_email: "",
            customer_contact: "",

            package_name: "",

            selected_vehicle: "",
            pack_price: "",
            pack_distance: "",
            pack_pick_up_date: getDateNow(),
            pack_pick_up_time: getTimeNow(),

            pack_insert_wheel: false

        };
    }

    onhandleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    insertpackdata(event) {
        const {customer_f_name, customer_s_name, customer_email, customer_contact, package_name, selected_vehicle, pack_price, pack_distance, pack_pick_up_date, pack_pick_up_time} = this.state;
        event.preventDefault();
        const regexContact = /^[0-9]{10,10}$/;

        if (customer_f_name === "" || customer_s_name === "" || customer_email === "" || customer_contact === "") {
            ViewNotification('warning', 'Error', 'All Fields Are required', 5000)
        } else {
            if (customer_contact !== "" && !regexContact.test(customer_contact)) {
                ViewNotification('warning', 'Error', 'Invalid Contact Number Ex: ', 5000)
            } else {
                this.setState({
                    pack_insert_wheel: true
                });
                const result = set_package({
                    customer_f_name,
                    customer_s_name,
                    customer_email,
                    customer_contact,
                    package_name,
                    selected_vehicle,
                    pack_price,
                    pack_distance,
                    pack_pick_up_date,
                    pack_pick_up_time
                });
                result.then((res) => {
                    if (res.status === 200) {
                        ViewNotification('success', 'Package', res.data.message, 10000);
                        setTimeout(() => {
                            reloadWindow();
                        }, 2000)
                    } else {
                        ViewNotification('info', 'Package', res.data.message, 10000);
                        setTimeout(() => {
                            reloadWindow();
                        }, 2000)
                    }
                });
                this.setState({
                    pack_insert_wheel: false
                });
            }
        }


    }

    onSubmitExplore(event) {
        event.preventDefault();
        const {placetoExplore} = this.state;
        if (placetoExplore === null || placetoExplore === "") {
            this.setState({
                searchError: true
            });
        } else {
            /*this.setState({
             searchError: false,
             redirect: true
             })*/
            /*window.location = "/#/OurTourPackages/" + placetoExplore.toLowerCase();*/

            const history = createHashHistory();
            /* history.push({
             pathname: '/ourtourpackages',
             search: '?explorePlace=kandy'
             })*/
            history.push({
                pathname: '/ourtourpackages',
                search: '?explorePlace=' + placetoExplore
            });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitExploreFull(event) {
        event.preventDefault();
        window.location = "/ourtourpackages";
    }

    viewData(data) {
        console.log(data);
        this.setState({
            selected_data: data
        });
        $('#exampleModalCenter').modal('show')
    }

    set_package_data_model(package_name, selected_vehicle, pack_price, distance) {
        this.setState({
            package_name: package_name,
            selected_vehicle: selected_vehicle,
            pack_price: pack_price,
            pack_distance: distance
        })
    }

    render() {
        const {pack_insert_wheel, selected_data, vehical_packs, searchError, tour_paks, package_name, selected_vehicle, pack_price, pack_distance, pack_pick_up_date, pack_pick_up_time} = this.state;
        return (
            <div className="container-fluid package_container">
                <div className="row">
                    <div className="col-12 col-sm-12 text-center">
                        <p className="head-title">Our Tour Packages</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 offset-md-4 text-center">
                        <form onSubmit={e => this.onSubmitExplore(e)}>
                            <input
                                name="placetoExplore"
                                onChange={e => this.onhandleChange(e)}
                                type="text"
                                placeholder="Enter place to explore"
                                className="cus-input"
                            />
                            {searchError ? (
                                <p
                                    style={{marginBottom: "0", marginTop: "0"}}
                                    className="error_text"
                                >
                                    Enter place before explore.
                                </p>
                            ) : null}
                            <input className="cus-button" type="submit" value="Explore"/>
                        </form>
                    </div>
                    <div className="col-12 col-md-10 offset-md-1 ">
                        <hr />
                        <div className="card-columns card-columns-cus">
                            {tour_paks.slice(0, 4).map((tour_paks, index) => (
                                <div
                                    onClick={e => this.viewData(tour_paks)}
                                    key={index}
                                    className="card card-custom img-hover-zoom"
                                >
                                    <img
                                        src={tour_paks.image}
                                        className="img-fluid card-img-top"
                                        alt="Place_image"
                                    />
                                    <div className="card-information">
                                        <p className="tour-text text-uppercase">{tour_paks.to}</p>
                                        <p className="des-all">
                                            Following are the price for Car, click on image to more
                                            information
                                        </p>
                                        <p className="tour-lock">
                      <span>
                        From Kalutara {tour_paks.fromKalutara}
                          KM / LKR{" "}
                          {
                              /*calculate_package("12h", 45, tour_paks.fromKalutara)*/
                              pack_cal_new("12h", tour_paks.fromKalutara, tour_paks.plus_k_2d, tour_paks.plus_k_3d, 45)
                          }
                      </span>
                                        </p>
                                        <p className="tour-lock">
                      <span>
                        From Colombo {tour_paks.fromKalutara}
                          KM / LKR{" "}
                          {
                              /*calculate_package("12h", 45, tour_paks.fromColombo)*/
                              pack_cal_new("12h", tour_paks.fromColombo, tour_paks.plus_c_2d, tour_paks.plus_c_3d, 45)
                          }
                      </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-md-4 offset-md-4 text-center">
                        <form onSubmit={e => this.onSubmitExploreFull(e)}>
                            <input
                                className="cus-button"
                                type="submit"
                                value="Explore our all packages"
                            />
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="modal fade  bd-example-modal-lg"
                         id="exampleModalCenter" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-lg-cus modal-dialog-centered " role="document">
                            <div className="modal-content cus-model">
                                <div className="modal-header">
                                    <h5 className="modal-title title-head text-uppercase"
                                        id="exampleModalCenterTitle">{selected_data.to}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body modal-open">
                                    <div className="row">
                                        <div className="col-12 col-md-4 common-side">
                                            <p className="pack-sub-title">Tour package details</p>
                                            <p className="pack-small-title">Terms & Conditions For Package Rate</p>
                                            <p className="pack-dec text-justify">
                                                All mentioned rates are only for return rides from Colombo
                                                region/greater Colombo.
                                                Rates given do not include parking or highway tolls.
                                                Distance and duration exceeding the package limit will be charged as
                                                follows:
                                            </p>
                                            {
                                                vehical_packs.map((vehical_packs, index) =>
                                                    <div className="side_data_price" key={index}>
                                                        <img src={ vehical_packs.graph} className="img-fluid"
                                                             alt="Image_vec"/>
                                                        <span className="pack-v-type-ver">
                                                        { "" + vehical_packs.type + " - Rs " + vehical_packs.perKm + "/- Per Km "}
                                                    </span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="col-12 col-md-8 data-side">
                                            <div className="tabs-pack">
                                                <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active from-tab from-tab-cus"
                                                           id={selected_data.t_id + "Kalutara"} data-toggle="tab"
                                                           href={"#" + selected_data.t_id + "KalutaraFace"}
                                                           role="tab"
                                                           aria-controls="home" aria-selected="true">Kalutara
                                                            to {selected_data.to}</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link from-tab from-tab-cus"
                                                           id={selected_data.t_id + selected_data + "Colombo"}
                                                           data-toggle="tab"
                                                           href={"#" + selected_data.t_id + "ColomboFace"}
                                                           role="tab"
                                                           aria-controls="profile" aria-selected="false">Colombo
                                                            to {selected_data.to}</a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content days-tab" id="myTabContent">
                                                    <div className="tab-pane fade show active"
                                                         id={selected_data.t_id + "KalutaraFace"} role="tabpanel"
                                                         aria-labelledby="home-tab">

                                                        <ul className="nav nav-tabs nav-fill" id="myTab"
                                                            role="tablist">
                                                            <li className="nav-item">
                                                                <a className="nav-link active"
                                                                   id={"12h" + selected_data.t_id + "Kalutara"}
                                                                   data-toggle="tab"
                                                                   href={"#h12h" + selected_data.t_id + "KalutaraTab"}
                                                                   role="tab" aria-controls="home"
                                                                   aria-selected="true">12
                                                                    Hours</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link"
                                                                   id={"2d" + selected_data.t_id + "Kalutara"}
                                                                   data-toggle="tab"
                                                                   href={"#h2d" + selected_data.t_id + "KalutaraTab"}
                                                                   role="tab" aria-controls="profile"
                                                                   aria-selected="false">2 Days</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link"
                                                                   id={"3d" + selected_data.t_id + "Kalutara"}
                                                                   data-toggle="tab"
                                                                   href={"#h3d" + selected_data.t_id + "KalutaraTab"}
                                                                   role="tab" aria-controls="contact"
                                                                   aria-selected="false">3 Days</a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content" id="myTabContent">
                                                            <div className="tab-pane fade show active"
                                                                 id={"h12h" + selected_data.t_id + "KalutaraTab"}
                                                                 role="tabpanel" aria-labelledby="home-tab">
                                                                <div className="data_content">
                                                                    {
                                                                        vehical_packs.map((vehical_packs, index) =>
                                                                            <div key={index}
                                                                                 className="row price-data-row"
                                                                                 data-toggle="modal"
                                                                                 data-target="#packageBookingModel"
                                                                                 onClick={() => this.set_package_data_model("12 Hours Package for Kalutara to " + selected_data.to, vehical_packs.id, pack_cal_new("12h", selected_data.fromKalutara, selected_data.plus_k_2d, selected_data.plus_k_3d, vehical_packs.perKm), selected_data.fromKalutara)}
                                                                            >
                                                                                <div
                                                                                    className="col-12 col-md-2 offset-md-1 img-div text-center">
                                                                                    <img alt="set_images"
                                                                                         src={vehical_packs.graph}
                                                                                         className="img-fluid table_vehi_images"/>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span
                                                                                        className="align-self-center"> {selected_data.fromKalutara}
                                                                                        KM</span>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span>LKR {
                                                                                        /*calculate_package("12h", vehical_packs.perKm, selected_data.fromKalutara)*/
                                                                                        pack_cal_new("12h", selected_data.fromKalutara, selected_data.plus_k_2d, selected_data.plus_k_3d, vehical_packs.perKm)
                                                                                    }</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade"
                                                                 id={"h2d" + selected_data.t_id + "KalutaraTab"}
                                                                 role="tabpanel" aria-labelledby="profile-tab">
                                                                <div className="data_content">
                                                                    {
                                                                        vehical_packs.map((vehical_packs, index) =>
                                                                            <div key={index}
                                                                                 className="row price-data-row"
                                                                                 data-toggle="modal"
                                                                                 data-target="#packageBookingModel"
                                                                                 onClick={() => this.set_package_data_model("2 Days Package for Kalutara to " + selected_data.to, vehical_packs.id, pack_cal_new("2d", selected_data.fromKalutara, selected_data.plus_k_2d, selected_data.plus_k_3d, vehical_packs.perKm), selected_data.fromKalutara + selected_data.plus_k_2d)}
                                                                            >
                                                                                <div
                                                                                    className="col-12 col-md-2 offset-md-1 img-div text-center">
                                                                                    <img alt="set_images"
                                                                                         src={vehical_packs.graph}
                                                                                         className="img-fluid table_vehi_images"/>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span
                                                                                        className="align-self-center"> {selected_data.fromKalutara + selected_data.plus_k_2d}
                                                                                        KM</span>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span>LKR {
                                                                                        /*calculate_package("2d", vehical_packs.perKm, selected_data.fromKalutara)*/
                                                                                        pack_cal_new("2d", selected_data.fromKalutara, selected_data.plus_k_2d, selected_data.plus_k_3d, vehical_packs.perKm)
                                                                                    }</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade"
                                                                 id={"h3d" + selected_data.t_id + "KalutaraTab"}
                                                                 role="tabpanel" aria-labelledby="contact-tab">
                                                                <div className="data_content">
                                                                    {
                                                                        vehical_packs.map((vehical_packs, index) =>
                                                                            <div key={index}
                                                                                 className="row price-data-row"
                                                                                 data-toggle="modal"
                                                                                 data-target="#packageBookingModel"
                                                                                 onClick={() => this.set_package_data_model("3 Days Package for Kalutara to " + selected_data.to, vehical_packs.id, pack_cal_new("3d", selected_data.fromKalutara, selected_data.plus_k_2d, selected_data.plus_k_3d, vehical_packs.perKm), selected_data.fromKalutara + selected_data.plus_k_2d + selected_data.plus_k_3d)}

                                                                            >
                                                                                <div
                                                                                    className="col-12 col-md-2 offset-md-1 img-div text-center">
                                                                                    <img alt="set_images"
                                                                                         src={vehical_packs.graph}
                                                                                         className="img-fluid table_vehi_images"/>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span
                                                                                        className="align-self-center"> {selected_data.fromKalutara + selected_data.plus_k_2d + selected_data.plus_k_3d}
                                                                                        KM</span>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span>LKR {
                                                                                        /*calculate_package("3d", vehical_packs.perKm, selected_data.fromKalutara)*/
                                                                                        pack_cal_new("3d", selected_data.fromKalutara, selected_data.plus_k_2d, selected_data.plus_k_3d, vehical_packs.perKm)
                                                                                    }</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div className="tab-pane fade"
                                                         id={selected_data.t_id + "ColomboFace"}
                                                         role="tabpanel" aria-labelledby="profile-tab">
                                                        <ul className="nav nav-tabs nav-fill" id="myTab"
                                                            role="tablist">
                                                            <li className="nav-item">
                                                                <a className="nav-link active"
                                                                   id={"12h" + selected_data.t_id + "Colombo"}
                                                                   data-toggle="tab"
                                                                   href={"#h12h" + selected_data.t_id + "ColomboTab"}
                                                                   role="tab" aria-controls="home"
                                                                   aria-selected="true">12
                                                                    Hours</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link"
                                                                   id={"2d" + selected_data.t_id + "Colombo"}
                                                                   data-toggle="tab"
                                                                   href={"#h2d" + selected_data.t_id + "ColomboTab"}
                                                                   role="tab" aria-controls="profile"
                                                                   aria-selected="false">2 Days</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link"
                                                                   id={"3d" + selected_data.t_id + "Colombo"}
                                                                   data-toggle="tab"
                                                                   href={"#h3d" + selected_data.t_id + "ColomboTab"}
                                                                   role="tab" aria-controls="contact"
                                                                   aria-selected="false">3 Days</a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content" id="myTabContent">
                                                            <div className="tab-pane fade show active"
                                                                 id={"h12h" + selected_data.t_id + "ColomboTab"}
                                                                 role="tabpanel" aria-labelledby="home-tab">
                                                                <div className="data_content">
                                                                    {
                                                                        vehical_packs.map((vehical_packs, index) =>
                                                                            <div key={index}
                                                                                 className="row price-data-row"
                                                                                 data-toggle="modal"
                                                                                 data-target="#packageBookingModel"
                                                                                 onClick={() => this.set_package_data_model("12 Hours Package for Colombo to " + selected_data.to, vehical_packs.id, pack_cal_new("12h", selected_data.fromColombo, selected_data.plus_c_2d, selected_data.plus_c_3d, vehical_packs.perKm), selected_data.fromColombo)}

                                                                            >
                                                                                <div
                                                                                    className="col-12 col-md-2 offset-md-1 img-div text-center">
                                                                                    <img alt="set_images"
                                                                                         src={vehical_packs.graph}
                                                                                         className="img-fluid table_vehi_images"/>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span
                                                                                        className="align-self-center"> {selected_data.fromColombo + selected_data.plus_c_2d}
                                                                                        KM</span>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span>LKR {
                                                                                        /*calculate_package("12h", vehical_packs.perKm, selected_data.fromColombo)*/
                                                                                        pack_cal_new("12h", selected_data.fromColombo, selected_data.plus_c_2d, selected_data.plus_c_3d, vehical_packs.perKm)
                                                                                    }</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade"
                                                                 id={"h2d" + selected_data.t_id + "ColomboTab"}
                                                                 role="tabpanel" aria-labelledby="profile-tab">
                                                                <div className="data_content">
                                                                    {
                                                                        vehical_packs.map((vehical_packs, index) =>
                                                                            <div key={index}
                                                                                 className="row price-data-row"
                                                                                 data-toggle="modal"
                                                                                 data-target="#packageBookingModel"
                                                                                 onClick={() => this.set_package_data_model("2 Days Package for Colombo to " + selected_data.to, vehical_packs.id, pack_cal_new("2d", selected_data.fromColombo, selected_data.plus_c_2d, selected_data.plus_c_3d, vehical_packs.perKm), selected_data.fromColombo + selected_data.plus_c_2d)}

                                                                            >
                                                                                <div
                                                                                    className="col-12 col-md-2 offset-md-1 img-div text-center">
                                                                                    <img alt="set_images"
                                                                                         src={vehical_packs.graph}
                                                                                         className="img-fluid table_vehi_images"/>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span
                                                                                        className="align-self-center"> {selected_data.fromColombo + selected_data.plus_c_2d }
                                                                                        KM</span>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span>LKR {
                                                                                        /*calculate_package("2d", vehical_packs.perKm, selected_data.fromColombo)*/
                                                                                        pack_cal_new("2d", selected_data.fromColombo, selected_data.plus_c_2d, selected_data.plus_c_3d, vehical_packs.perKm)
                                                                                    }</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade"
                                                                 id={"h3d" + selected_data.t_id + "ColomboTab"}
                                                                 role="tabpanel" aria-labelledby="contact-tab">
                                                                <div className="data_content">
                                                                    {
                                                                        vehical_packs.map((vehical_packs, index) =>
                                                                            <div key={index}
                                                                                 className="row price-data-row"
                                                                                 data-toggle="modal"
                                                                                 data-target="#packageBookingModel"
                                                                                 onClick={() => this.set_package_data_model("3 Days Package for Colombo to " + selected_data.to, vehical_packs.id, pack_cal_new("3d", selected_data.fromColombo, selected_data.plus_c_2d, selected_data.plus_c_3d, vehical_packs.perKm), selected_data.fromColombo + selected_data.plus_c_2d + selected_data.plus_c_3d)}

                                                                            >
                                                                                <div
                                                                                    className="col-12 col-md-2 offset-md-1 img-div text-center">
                                                                                    <img alt="set_images"
                                                                                         src={vehical_packs.graph}
                                                                                         className="img-fluid table_vehi_images"/>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span
                                                                                        className="align-self-center"> {selected_data.fromColombo + selected_data.plus_c_2d + selected_data.plus_c_3d}
                                                                                        KM</span>
                                                                                </div>
                                                                                <div
                                                                                    className="distance-div col-md-4 col-6">
                                                                                    <span>LKR {
                                                                                        /*calculate_package("3d", vehical_packs.perKm, selected_data.fromColombo)*/
                                                                                        pack_cal_new("3d", selected_data.fromColombo, selected_data.plus_c_2d, selected_data.plus_c_3d, vehical_packs.perKm)
                                                                                    }</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="packageBookingModel" tabIndex="1" role="dialog"
                     aria-labelledby="packageBookingModelModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-sm modal-lg-cus modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title pack-sub-title"
                                    id="packageBookingModelModalCenterTitle">{package_name}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div
                                        className="col-6 offset-3 offset-lg-5 col-lg-2 offset-xl-5 col-xl-2 text-center">
                                        <img src={
                                            selected_vehicle === 1 ? mini_car : selected_vehicle === 2 ? car_sm : selected_vehicle === 3 ? mini_van : selected_vehicle === 4 ? kdh_sm : bus_sm
                                        } className="img-fluid table_vehi_images" alt="Selected Vehicle"/>
                                    </div>

                                    <div className="col-12 text-center">

                                        <p className="pack-sub-title">Selected Vehicle : {
                                            selected_vehicle === 1 ? "Mini Car" : selected_vehicle === 2 ? "Car" : selected_vehicle === 3 ? "Van" : selected_vehicle === 4 ? "KDH" : "Mini Bus"
                                        }</p>

                                        <p className="pack-sub-title">
                                            Package Distance Km {pack_distance}
                                        </p>

                                        <p className="pack-sub-title">
                                            Package Price Rs {pack_price}
                                        </p>

                                    </div>
                                </div>
                                <form onSubmit={(e) => this.insertpackdata(e)}>
                                    <div className="row">

                                        <div className="col-12 col-lg-4 col-xl-4 offset-xl-2 offset-lg-2">
                                            <input
                                                name="customer_f_name"
                                                className="cus-input cus-input-sups"
                                                placeholder="Enter First Name"
                                                type="text"
                                                required
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </div>


                                        <div className="col-12 col-lg-4 col-xl-4">
                                            <input
                                                name="customer_s_name"
                                                className="cus-input cus-input-sups"
                                                placeholder="Enter Second Name"
                                                type="text"
                                                required
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </div>

                                        <div className="col-12 col-lg-4 col-xl-4 offset-xl-2 offset-lg-2">
                                            <input
                                                name="customer_contact"
                                                className="cus-input cus-input-sups"
                                                placeholder="Enter Contact Number"
                                                type="text"
                                                required
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </div>

                                        <div className="col-12 col-lg-4 col-xl-4">
                                            <input
                                                name="customer_email"
                                                className="cus-input cus-input-sups"
                                                placeholder="Enter Email Address"
                                                type="text"
                                                required
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-4 offset-md-2">
                                            <p className="input-label">Pick up date</p>
                                            <input
                                                type="date"
                                                id="current_date"
                                                name="pack_pick_up_date"
                                                className="cus-input cus-input-sups"
                                                onChange={(e) => this.handleChange(e)}
                                                value={ pack_pick_up_date}
                                            />
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <p className="input-label">Pick up time</p>
                                            <input
                                                type="time"
                                                id="current_time"
                                                name="pack_pick_up_time"
                                                className="cus-input cus-input-sups"
                                                onChange={(e) => this.handleChange(e)}
                                                value={pack_pick_up_time}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col-12 col-lg-4 col-xl-4 offset-xl-4 offset-lg-4">
                                            <hr/>
                                            {pack_insert_wheel ? <SpinnerInsert /> : null}
                                            <button
                                                className="cus-button"
                                            >
                                                Book Package
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}

export default OurPacks;
