import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import logo from "../assets/images/logo-two-no-mg.png";


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page_top: true,
            collapse: true,
            path_url: "",
            businessPage: false,
            businessHome: false,
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const posY = window.scrollY;
            if (posY >= 100) {
                this.setState({
                    page_top: false
                })
            } else {
                this.setState({
                    page_top: true
                })
            }

        });

        this.setState({
            path_url: window.location.hash
        });

        if (window.location.hash === "#/business") {
            this.setState({
                businessPage: true
            })
        } else if (window.location.hash === "#/businesshome") {
            this.setState({
                businessHome: true
            })
        }
        else {
            this.setState({
                businessPage: false,
                businessHome: false,
            })
        }
    }

    collapse_change(event) {
        const {collapse} = this.state;
        this.setState({
            collapse: !collapse
        })
    }

    render() {
        const {businessHome, businessPage, path_url, page_top, collapse} = this.state;

        return (
            <nav
                className={
                    businessPage ?
                        "navbar fixed-top navbar-expand-lg navbar-light cus-navbar-two" :
                        businessHome && page_top && collapse ? "navbar fixed-top  navbar-expand-lg navbar-light cus-navbar-trans cus-navbar-two-bus" :
                            page_top && collapse ?
                                "navbar fixed-top  navbar-expand-lg navbar-light cus-navbar-trans"
                                : "navbar fixed-top navbar-expand-lg navbar-light cus-navbar-trans cus-navbar shadow-sm"
                }>
                <a className="navbar-brand brand-nav" href="/">
                    <img alt="logo_nav" src={logo} width={"100"}/>
                </a>
                <button onClick={(e) => this.collapse_change(e)} className="navbar-toggler toggle-cus" type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto nav-cus-collapse">
                        <li className={path_url === "#/ourtourpackages" ? "nav-item nav-item-style cus-active" : "nav-item nav-item-style"}>
                            {/** <a className="" href="/OurTourPackages">Our Tour Packages</a> */ }
                            <NavLink activeClassName={"cus-active-anchor"} to="/ourtourpackages">Our Tour
                                Packages</NavLink>
                        </li>
                        <li className={path_url === "#/getyourtaxi" ? "nav-item nav-item-style cus-active" : "nav-item nav-item-style"}>
                            {/* <a className="" href="/getYourTaxi">Get Taxi</a>*/}
                            <NavLink to="/getyourtaxi">Get Taxi</NavLink>
                        </li>
                        <li className={path_url === "#/business" || path_url === "#/businesshome" ? "nav-item nav-item-style cus-active" : "nav-item nav-item-style"}>
                            {/*<a className="" href="/Business">Business</a>*/}
                            <NavLink to="/business">Business</NavLink>
                        </li>
                        <li className={path_url === "#/aboutus" ? "nav-item nav-item-style cus-active" : "nav-item nav-item-style"}>
                            {/*<a className="" href="/AboutUs">About us</a>*/}
                            <NavLink to="/aboutus">About us</NavLink>
                        </li>

                    </ul>

                </div>
            </nav>
        )
    }
}

export default Navbar;