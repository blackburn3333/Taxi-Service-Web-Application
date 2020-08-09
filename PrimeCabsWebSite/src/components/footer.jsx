import React, {Component} from "react";
import primeLogo from "../assets/images/logo-two.png";
import dev_logo from "../assets/images/jays.png";

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid prime-footer">
                <div className="row footer-bar-row">
                    <div className="col-6 order-1 col-md-3 order-md-0 offset-md-1 footer-bar-divs">
                        <img className="img-fluid dev-logo" src={dev_logo} alt="designer logo"/>
                    </div>
                    <div className="col-12 order-0 col-md-4 footer-bar-divs">
                        
                    </div>
                    <div className="col-6 order-2 col-md-3 footer-bar-divs">
                        <img className="img-fluid" src={primeLogo} alt="designer logo"/>
                    </div>
                    <div className="col-12 order-12 col-md-12 footer-bar-bottom text-center">
                        <p className="text-uppercase footer-text-cop">Copyright &copy; {(new Date().getFullYear())} - Jay's Code works</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;