import React, {Component} from "react";
import Navbar from "../components/navbar";
import {ViewNotification} from "../class/globalfuntions";
import {NotificationContainer} from "react-notifications";
import {SpinnerInsert, SpinnerConfirming} from "../components/spinners";
import Footer from "../components/footer";
import {Helmet} from 'react-helmet';
import {
    business_login,
    business_register,
    set_confirmation,
    confirm_number,
    check_responsible_person_number,
    send_email
} from "../class/BusinessFuntions";
import primeLogo from "../assets/images/logo-two.png";
import BusinessRegisterForm from "../components/BusinessRegister";
import $ from "jquery/dist/jquery";
import OTP from "../assets/images/otp.png";

import {
    nullChecker,
    passwordValidation,
    emailValidation,
    contactValidation,
    passwordConfirm
} from "../class/formValidation";
import {setSpinner} from "../actions/BusinessActions";
import {connect} from "react-redux";
import {reloadWindow} from "../services/global";

class Business extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userPassword: "",
            signInForm: true,
            loginSpin: false,
            conformation_code: "",
            confirm_sip: false,
            booking_place_error: ""

        }
    }


    onChangeHandle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    confirm_number(event) {
        event.preventDefault();
        const {conformation_code} = this.state;
        this.setState({
            confirm_sip: true
        });
        setTimeout(() => {
            const result = confirm_number(this.props.business.ref_id, conformation_code);
            result.then((res) => {
                if (res.status === 200) {
                    ViewNotification('success', 'Business Registration', res.data.message, 5000);
                    setTimeout(() => {
                        reloadWindow();
                    }, 2000)
                } else {
                    ViewNotification('info', 'Business Registration', res.data.message, 10000);
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

    CheckLogin(event) {
        event.preventDefault();
        if (this.state.userName !== "" || this.state.userPassword !== "") {
            this.setState({
                loginSpin: true
            });
            const result = business_login(this.state.userName, this.state.userPassword);
            result.then((res) => {
                if (res.status === 200) {
                    sessionStorage.setItem('userTokenData', res.data.token);
                    this.setState({
                        loginSpin: false
                    });
                    this.props.history.push('/businessHome')
                } else {
                    ViewNotification('error', 'Business Login', 'Invalid username or password', 5000);
                    this.setState({
                        loginSpin: false
                    });
                }
            })
        } else {
            ViewNotification('warning', 'Business Login', 'Enter both username and password', 5000);
        }

    }


    registerForm(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
        this.setState({
            signInForm: !this.state.signInForm
        })
    }

    componentDidMount() {
        this.check_available_user();
    }

    check_available_user() {
        if (sessionStorage.getItem('userTokenData') !== null) {
            this.props.history.push('/businessHome')
        }
    }

    componentWillMount(){
        this.props.history.push('/business')
    }

    onSubmitRegForm(values) {
        const {businessContactNumber, businessEmailAddress, businessName, businessResponsiblePerson, businessResponsibleNumber, businessPassword, businessPasswordConf} = values;
        const passValues = {
            businessContactNumber,
            businessEmailAddress,
            businessName,
            businessResponsiblePerson,
            businessResponsibleNumber,
            businessPassword,
            businessPasswordConf
        };
        if (nullChecker((passValues))) {
            ViewNotification('error', 'Business Registration', 'Business name, Business contact details, Responsible Person contact details and Password required.', 10000);
        } else {
            if (passwordValidation(businessPassword)) {
                ViewNotification('error', 'Business Registration', 'Password between 8 and 20 characters must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character', 10000);
            } else {
                if (passwordConfirm(businessPassword, businessPasswordConf)) {
                    ViewNotification('error', 'Business Registration', 'Password Did Not Match', 10000);
                } else {
                    if (emailValidation(businessEmailAddress)) {
                        ViewNotification('error', 'Business Registration', 'Invalid Email Address', 5000);
                    } else {
                        if (contactValidation(businessContactNumber)) {
                            ViewNotification('error', 'Business Registration', 'Invalid Business Contact Number, Maximum length is 10', 5000);
                        } else {
                            if (contactValidation(businessResponsibleNumber)) {
                                ViewNotification('error', 'Business Registration', "Invalid Responsible Person's Contact Number, Maximum length is 10", 5000);
                            } else {
                                const numberResult = check_responsible_person_number(businessResponsibleNumber);
                                numberResult.then((res) => {
                                    if (res.status === 200) {
                                        ViewNotification('error', 'Business Registration', "Entered Responsible Person's Contact Number Already Taken By Another Business", 5000);
                                    } else {
                                        const result = business_register(values);
                                        result.then((res) => {
                                            if (res.status === 200) {
                                                set_confirmation(res.data.last_id);
                                                send_email(res.data.last_id);
                                                $('#conf_model_business').modal('show');
                                            } else {
                                                ViewNotification('info', 'Business Registration', "Business Registration Failed Contact our customer care", 10000)
                                            }
                                        })
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    };


    render() {
        const {ref_id} = this.props.business;
        const {loginSpin, signInForm, booking_place_error, confirm_sip} = this.state;
        return (
            <div>
                <Helmet>
                    <title>Your Taxi service</title>
                    <meta name="description"
                          content=""/>
                    <meta name="theme-color" content="#00ACEE"/>
                    <meta name="keywords"
                          content="business,business taxi,taxi business,cabs,tours cabs and tours,sri lanka, kalutara,agalawatta,taxi,local taxi,local taxi service, local taxi cab service,taxi,taxi 12200,wedding, wedding hires,booking, cabs taxi,  cabs packages, tours, tour packages"/>
                </Helmet>
                <NotificationContainer/>
                <Navbar/>
                <div className="container-fluid business-container">
                    <div className="row container-inner">
                        <div className="col-12 col-lg-6 col-xl-6 business-logo-side text-center">
                            <div className="logo-side col-12 col-lg-10 col-xl-10 offset-lg-1 offset-xl-1">
                                <p className="call_us ">CALL US NOW</p>
                                <p className="contact-number"><a className="tel-num" href="tel:+000000000">+94 000000000</a></p>
                                <img src={primeLogo} className="img-fluid" alt="logo"/>
                                <p className="title-packs">Your Taxi service</p>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 col-xl-6 business-form-side text-center">
                            {signInForm ?
                                <div
                                    className={loginSpin ? "login-side-cus col-12 col-xl-6 col-lg-6 offset-lg-3 offset-xl-3" : "login-side col-12 col-xl-6 col-lg-6 offset-lg-3 offset-xl-3"}>
                                    <p>Enter your credentials</p>
                                    {loginSpin ?
                                        <SpinnerInsert/>
                                        : null}
                                    <form onSubmit={(e) => this.CheckLogin(e)}>
                                        <input autoComplete="username" onChange={(e) => this.onChangeHandle(e)}
                                               name="userName" type="text"
                                               className="cus-input" placeholder="Contact number"/>
                                        <input onChange={(e) => this.onChangeHandle(e)} name="userPassword"
                                               type="password" className="cus-input" placeholder="Password"
                                               autoComplete="current-password"/>
                                        <input type="submit" value="Sign In" className="cus-button"/>

                                    </form>
                                    <input onClick={(e) => this.registerForm(e)} type="button" value="Sign Up"
                                           className="cus-button"/>
                                </div>
                                : <div className="animated fadeInDown register-side col-12 col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
                                    <div className="row text-left">
                                        <div className="col-12 back-arrow">
                                            <span onClick={(e) => this.registerForm(e)} className="material-icons">backspace</span>
                                        </div>
                                    </div>
                                    <p>Register your business</p>
                                    {this.props.business.regiserSpin ? <SpinnerInsert/> : null}
                                    <BusinessRegisterForm
                                        onSubmitRegForm={this.onSubmitRegForm}
                                    />
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="modal fade number_conf_model" id="conf_model_business" tabIndex="-1" role="dialog"
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
                                        <p className="decs-data">Enter verification number that sent to responsible
                                            persons contact
                                            number</p>
                                        <form onSubmit={(e) => this.confirm_number(e)}>
                                            <input
                                                onChange={(e) => this.onChangeHandle(e)}
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
                                            <p className="badge badge-danger errorBadge">Registration error contact our
                                                customer care</p>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        business: state.business
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSpinner: (value) => {
            dispatch(setSpinner(value));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Business);