import React, {Component} from "react";
import {Helmet} from 'react-helmet';
class OurServices extends Component {


    render() {
        return (<div className="container our-services-component">
                <Helmet>
                    <title>Your Taxi service</title>
                    <meta name="description"
                          content="Your Taxi service"/>
                    <meta name="theme-color" content="#00ACEE"/>
                    <meta name="keywords"
                          content="self,self drive,tour,tour packages cab packages,business,business taxi,taxi business,cabs,tours cabs and tours,sri lanka, kalutara,agalawatta,taxi,local taxi,local taxi service, local taxi cab service,taxi,taxi 12200,wedding, wedding hires,booking cabs taxi, cabs packages, tours, tour packages"/>
                </Helmet>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p className="head-title">Our Services</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 offset-md-1 service-card">
                        <div className="service-inner shadow-sm">
                            <p className="service-title">Taxi Service</p>
                            <p className="service-short-dec text-justify">
                                Data here
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 service-card">
                        <div className="service-inner shadow-sm">
                            <p className="service-title">Wedding Service</p>
                            <p className="service-short-dec text-justify">
                                Data here</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 offset-md-1 service-card">
                        <div className="service-inner shadow-sm">
                            <p className="service-title">Self-Drive Rental</p>
                            <p className="service-short-dec text-justify">
                               Data here</p>
                        </div>
                    </div>
                    <div className="col-md-5 service-card">
                        <div className="service-inner shadow-sm">
                            <p className="service-title">Tour Packages</p>
                            <p className="service-short-dec text-justify">
                                Data here</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default OurServices;