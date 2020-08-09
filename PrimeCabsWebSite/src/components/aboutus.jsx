import React, {Component} from "react";
import Navbar from "../components/navbar";
import primeLogo from "../assets/images/logo-two.png";
import Footer from "../components/footer";
import {Helmet} from 'react-helmet';
class AboutUs extends Component {

    componentWillMount(){
        this.props.history.push('/aboutus')
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Your Taxi service</title>
                    <meta name="description"
                          content="Your Taxi service.We ensure safe and comfortable travelling facilities for all the cutomers without any delay."/>
                    <meta name="theme-color" content="#00ACEE"/>
                    <meta name="keywords"
                          content="business,business taxi,taxi business,cabs,tours,sri lanka, kalutara,agalawatta,taxi,local taxi,local taxi service, local taxi cab service,taxi,taxi 12200,wedding, wedding hires,booking, cabs packages, tours, tour packages"/>
                </Helmet>
                <Navbar/>
                <div className="container-fluid about-us-main">
                    <div className="row about-us-head">
                        <div className="col-12 col-md-4 offset-md-4 text-center">
                            <p className="call_us">CALL US NOW</p>
                            <p className="contact-number"><a className="tel-num" href="tel:+94000000000">+94 00 000
                                0000</a></p>
                            <img src={primeLogo} className="img-fluid" alt="logo"/>
                            <p className="title-packs">About us</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-xl-6 offset-xl-3 col-lg-6 col-lg-3 text-justify">
                            <div className="content_container shadow-sm">
                                <p className="service-title">About Us</p>
                                <p className="service-short-dec">
                                   About Us comes here
                                     </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }

}

export default AboutUs;