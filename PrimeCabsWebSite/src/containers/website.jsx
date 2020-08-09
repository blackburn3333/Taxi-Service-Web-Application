import React, {Component} from "react";
import Welcome from "../components/welcome";
import OurServices from "../components/ourServices";
import YourRide from "../components/yourRide";
import Footer from "../components/footer";
import OurPacks from "../components/tourpacks";
import {connect} from "react-redux";
import Navbar from "../components/navbar";

import {Helmet} from 'react-helmet';

import {
    setVehicle,
    setFromLocation,
    setToLocation,
    setDistance,
    setPickUpDateTime,
    setTourWay,
    setPrice,
    setFinalData
} from "../actions/TaxiServiceActions";


class WebSite extends Component {
    render() {
        return (<div>
            <Helmet>
                <title>Your Taxi service</title>
                <meta name="description"
                      content="Your Taxi service"/>
                <meta name="theme-color" content="#00ACEE"/>
                <meta name="keywords"
                      content="business,business taxi,taxi business,cabs,tours cabs and tours,sri lanka, kalutara,agalawatta,taxi,local taxi,local taxi service, local taxi cab service,taxi,taxi 12200,wedding, wedding hires,booking cabs taxi, cabs packages, tours, tour packages"/>
            </Helmet>
            <Navbar/>
            <Welcome setVehicle={(id) => this.props.setVehicle(id)}
                     setPickUpDateTime={(time, date) => this.props.setPickUpDateTime(time, date)}
                     setFinalData={(name, contact, email, otp) => this.props.setFinalData(name, contact, email, otp)}
                     setTourWay={(type) => this.props.setTourWay(type)}
                     setPrice={setPrice}
                     taxiData={this.props.taxi}
                     setFromLocation={setFromLocation}
                     setToLocation={setToLocation}
                     setDistance={setDistance}/>
            <OurPacks/>
            <OurServices/>
            <YourRide/>
            <Footer/>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        taxi: state.taxi,
        global: state.global
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
        setPrice: (price) => {
            dispatch(setPrice(price))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebSite);
