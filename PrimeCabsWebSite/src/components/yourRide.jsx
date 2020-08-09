import React, {Component} from "react";

import mini_car_rel from "../assets/images/options/mimi-car.jpg";
import car_rel from "../assets/images/options/car.jpg";
import van_rel from "../assets/images/options/van.jpg";
import kdh_rel from "../assets/images/options/kdh.jpg";
import bus_rel from "../assets/images/options/bus.jpg";

import mini_car from "../assets/images/car_icons/mini_ori.png";
import car_sm from "../assets/images/car_icons/car_ori.png";
import mini_van from "../assets/images/car_icons/minivan_ori.png";
import kdh_sm from "../assets/images/car_icons/kdh_ori.png";
import bus_sm from "../assets/images/car_icons/bus_ori.png";
import {Helmet} from 'react-helmet';
class YourRide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewVehicle: 0,
            move_side: 0,
            our_vehicles: [
                {
                    Title: "Mini Car",
                    Description: "A small and comfortable car (usually hat chback) suitable for a maximum of 3 passengers or 2 passengers with more than a few bags accompanying them.",
                    car_types: [
                        "Suzuki Alto",
                        "Suzuki Wagon R",
                        "Toyota Aqua",
                    ],
                    car_options: []
                }
            ]
        }
    }

    setVehicle(id) {
        const {viewVehicle} = this.state;
        this.setState({
            viewVehicle: id,
            move_side: id >= viewVehicle ? 0 : 1
        });
    }

    left_arrows() {
        const {viewVehicle} = this.state;
        this.setState({
            viewVehicle: viewVehicle === 0 ? 4 : viewVehicle - 1,
            move_side: 1,
        });
    }

    right_arrow() {
        const {viewVehicle} = this.state;
        this.setState({
            viewVehicle: viewVehicle === 4 ? 0 : viewVehicle + 1,
            move_side: 0,
        });
    }


    render() {
        const {viewVehicle} = this.state;
        return (
            <div className="container-fluid our-options-container">
                <Helmet>
                    <title>Your Taxi service</title>
                    <meta name="description"
                          content=""/>
                    <meta name="theme-color" content="#00ACEE"/>
                    <meta name="keywords"
                          content="business,business taxi,taxi business,cabs,tours cabs and tours,sri lanka, kalutara,agalawatta,taxi,local taxi,local taxi service, local taxi cab service,taxi,taxi 12200,wedding, wedding hires,booking cabs taxi,  cabs packages, tours, tour packages"/>
                </Helmet>
                <div className="row text-row">
                    <div className="col-12 text-center">
                        <p className="head-title">
                            Pick Your Ride
                        </p>
                    </div>
                </div>

                <div className="row option-cont-sub">
                    <div className="col-md-1  offset-md-1 arrow-container  align-self-center">
                        <button className="material-icons opt-arrows" onClick={(e) => this.left_arrows()}>
                            navigate_before
                        </button>
                    </div>
                    <div id="ride_carousel" className="col-12 carousel slide col-md-8  option-gall" data-ride="carousel"
                         data-interval="false">
                        <div className="carousel-inner">
                            <div
                                className={viewVehicle === 0 ? "carousel-item active option-image-view" : "carousel-item"}>
                                <div className="card-option-texts col-12 col-md-7">
                                    <p className="title-opt">
                                        Mini Car
                                    </p>
                                    <p className="description-ops text-justify">
                                        A small and comfortable car (usually hat chback) suitable for a maximum of 3
                                        passengers or 2 passengers with more than a few bags accompanying them.
                                    </p>

                                    <table className="table table-borderless option-vehicles">
                                        <tbody>
                                        <tr className="">
                                            <td>Suzuki Alto</td>
                                            <td>Suzuki Wagon R</td>
                                            <td>Toyota Aqua</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive option-vehicles-mobiles">
                                        <table className="table table-borderless ">
                                            <tbody>
                                            <tr className="">
                                                <td>Suzuki Alto</td>
                                                <td>Suzuki Wagon R</td>
                                                <td>Toyota Aqua</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className="table settings-table">
                                        <tbody>
                                        <tr>
                                            <td className="">
                                                <p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                    <span className="opt-val"> 3 </span>
                                                    <span className="option-info">Passengers</span>
                                                </p></td>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                <span className="option-info">Air Condition</span>
                                            </p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                <span className="option-info">24/7 Service</span>
                                            </p></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive  settings-table-mobile">
                                        <table className="table table-mobile">
                                            <tbody>
                                            <tr>
                                                <td className="">
                                                    <p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                        <span className="opt-val"> 3 </span>
                                                        <span className="option-info">Passengers</span>
                                                    </p></td>

                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                    <span className="option-info">Air Condition</span>
                                                </p></td>
                                            </tr>
                                            <tr>
                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                    <span className="option-info">24/7 Service</span>
                                                </p></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <img src={mini_car_rel} alt="" className="img-fluid pot-image float-right"/>

                            </div>

                            <div
                                className={viewVehicle === 1 ? "carousel-item active option-image-view" : "carousel-item" }>
                                <div className="card-option-texts col-12  col-md-7">
                                    <p className="title-opt">
                                        Car
                                    </p>
                                    <p className="description-ops text-justify">
                                        A comfortable sedan with reasonable luggage space and the capacity to
                                        accommodate a maximum of 4
                                        passengers. A economical option for a grand entrance.
                                    </p>

                                    <table className="table table-borderless option-vehicles">
                                        <tbody>
                                        <tr className="">
                                            <td>Toyota Axio</td>
                                            <td>Toyota Prius</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive option-vehicles-mobiles">
                                        <table className="table table-borderless ">
                                            <tbody>
                                            <tr className="">
                                                <td>Toyota Axio</td>
                                                <td>Toyota Prius</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className="table settings-table">
                                        <tbody>
                                        <tr>
                                            <td className=""><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                <span className="opt-val"> 4 </span>
                                                <span className="option-info">Passengers</span>
                                            </p></td>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                <span className="option-info">Air Condition</span>
                                            </p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                <span className="option-info">24/7 Service</span>
                                            </p></td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <div className="table-responsive  settings-table-mobile">
                                        <table className="table table-mobile">
                                            <tbody>
                                            <tr>
                                                <td className=""><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                    <span className="opt-val"> 4 </span>
                                                    <span className="option-info">Passengers</span>
                                                </p></td>
                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                    <span className="option-info">Air Condition</span>
                                                </p></td>
                                            </tr>
                                            <tr>
                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                    <span className="option-info">24/7 Service</span>
                                                </p></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <img alt="" src={car_rel} className="img-fluid float-right pot-image"/>
                            </div>

                            <div
                                className={viewVehicle === 2 ? "carousel-item active option-image-view" : "carousel-item"}>
                                <div className="card-option-texts col-12  col-md-7">
                                    <p className="title-opt">
                                        Mini Van
                                    </p>
                                    <p className="description-ops text-justify">
                                        With a capacity of 9 passengers, this is the ideal modal of transport for those
                                        traveling in packs.
                                        The van is a good choice for luggage transport.
                                    </p>

                                    <table className="table table-borderless option-vehicles">
                                        <tbody>
                                        <tr className="">
                                            <td>Toyota</td>
                                            <td>Nissan</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive option-vehicles-mobiles">
                                        <table className="table table-borderless =">
                                            <tbody>
                                            <tr className="">
                                                <td>Toyota</td>
                                                <td>Nissan</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className="table settings-table">
                                        <tbody>
                                        <tr>
                                            <td className=""><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                <span className="opt-val"> 9 </span>
                                                <span className="option-info">Passengers</span>
                                            </p></td>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                <span className="option-info">Air Condition</span>
                                            </p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                <span className="option-info">24/7 Service</span>
                                            </p></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive  settings-table-mobile">
                                        <table className="table table-mobile">
                                            <tbody>
                                            <tr>
                                                <td className=""><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                    <span className="opt-val"> 9 </span>
                                                    <span className="option-info">Passengers</span>
                                                </p></td>
                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                    <span className="option-info">Air Condition</span>
                                                </p></td>
                                            </tr>
                                            <tr>
                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                    <span className="option-info">24/7 Service</span>
                                                </p></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <img src={van_rel} alt="" className="img-fluid float-right pot-image"/>
                            </div>

                            <div
                                className={viewVehicle === 3 ? "carousel-item active option-image-view" : "carousel-item"}>
                                <div className="card-option-texts col-12  col-md-7">
                                    <p className="title-opt">
                                        Van
                                    </p>
                                    <p className="description-ops text-justify">
                                        With a capacity of 14 passengers, this is the ideal modal of transport for those
                                        traveling in packs.
                                        The van is a good choice for luggage transport.
                                    </p>

                                    <table className="table table-borderless option-vehicles">
                                        <tbody>
                                        <tr className="">
                                            <td>Toyota KDH Highroof</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive option-vehicles-mobiles">
                                        <table className="table table-borderless">
                                            <tbody>
                                            <tr className="">
                                                <td>Toyota KDH Highroof</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className="table settings-table">
                                        <tbody>
                                        <tr>
                                            <td className=""><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                <span className="opt-val"> 14 </span>
                                                <span className="option-info">Passengers</span>
                                            </p></td>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                <span className="option-info">Air Condition</span>
                                            </p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                <span className="option-info">24/7 Service</span>
                                            </p></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive  settings-table-mobile">
                                        <table className="table table-mobile">
                                            <tbody>
                                            <tr>
                                                <td className=""><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                    <span className="opt-val"> 14 </span>
                                                    <span className="option-info">Passengers</span>
                                                </p></td>
                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                    <span className="option-info">Air Condition</span>
                                                </p></td>
                                            </tr>
                                            <tr>
                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                    <span className="option-info">24/7 Service</span>
                                                </p></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <img src={kdh_rel} alt="" className="img-fluid float-right pot-image"/>
                            </div>

                            <div
                                className={viewVehicle === 4 ? "carousel-item active option-image-view" : "carousel-item"}>
                                <div className="card-option-texts col-12  col-md-7">
                                    <p className="title-opt">
                                        Bus
                                    </p>
                                    <p className="description-ops text-justify">
                                        With a capacity of 28 passengers, this is the ideal modal of transport for those
                                        traveling in packs.
                                    </p>

                                    <table className="table table-borderless option-vehicles">
                                        <tbody>
                                        <tr className="">
                                            <td>Toyota Coster</td>
                                            <td>Toyota Rosa</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive option-vehicles-mobiles">
                                        <table className="table table-borderless">
                                            <tbody>
                                            <tr className="">
                                                <td>Toyota Coster</td>
                                                <td>Toyota Rosa</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <table className="table settings-table">
                                        <tbody>
                                        <tr>
                                            <td className=""><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                <span className="opt-val"> 28 </span>
                                                <span className="option-info">Passengers</span>
                                            </p></td>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                <span className="option-info">Air Condition</span>
                                            </p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                <span className="option-info">24/7 Service</span>
                                            </p></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive  settings-table-mobile">
                                        <table className="table table-mobile">
                                            <tbody>
                                            <tr>
                                                <td className=""><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">airline_seat_recline_normal</span>
                                                    <span className="opt-val"> 28 </span>
                                                    <span className="option-info">Passengers</span>
                                                </p></td>
                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">ac_unit</span>
                                                    <span className="option-info">Air Condition</span>
                                                </p></td>
                                            </tr>
                                            <tr>
                                                <td><p className="option-texts">
                                                <span
                                                    className="material-icons option-icon">history</span>
                                                    <span className="option-info">24/7 Service</span>
                                                </p></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <img src={bus_rel} alt="" className="img-fluid float-right pot-image"/>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-1 arrow-container align-self-center arrow-container">
                        <button className="material-icons opt-arrows" onClick={(e) => this.right_arrow()}>
                            navigate_next
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-12  small-op-low text-center">
                        
                        <img onClick={(e) => this.setVehicle(0)} alt="mini car vec" src={mini_car}
                             className={viewVehicle === 0 ? "img-fluid small-vehicle-light com-opt-img" : "img-fluid small_vehicle-line com-opt-img"}/>

                        <img onClick={(e) => this.setVehicle(1)} alt="car vec" src={car_sm}
                             className={viewVehicle === 1 ? "img-fluid small-vehicle-light com-opt-img" : "img-fluid small_vehicle-line com-opt-img"}/>

                        <img onClick={(e) => this.setVehicle(2)} alt="mini van vec" src={mini_van}
                             className={viewVehicle === 2 ? "img-fluid small-vehicle-light com-opt-img" : "img-fluid small_vehicle-line com-opt-img"}/>

                        <img onClick={(e) => this.setVehicle(3)} alt="van vec" src={kdh_sm}
                             className={viewVehicle === 3 ? "img-fluid small-vehicle-light com-opt-img" : "img-fluid small_vehicle-line com-opt-img"}/>

                        <img onClick={(e) => this.setVehicle(4)} alt="bus vec" src={bus_sm}
                             className={viewVehicle === 4 ? "img-fluid small-vehicle-light com-opt-img" : "img-fluid small_vehicle-line com-opt-img"}/>

                    </div>
                </div>
            </div>
        )
    }

}
export default YourRide;