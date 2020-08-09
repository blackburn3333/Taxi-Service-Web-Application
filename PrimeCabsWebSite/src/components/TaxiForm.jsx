import React, {Component} from "react";
import {Field, reduxForm, SubmissionError} from "redux-form";

import mini_car from "../assets/images/car_icons/mini_ori.png";
import car from "../assets/images/car_icons/car_ori.png";
import mini_van from "../assets/images/car_icons/minivan_ori.png";
import kdh from "../assets/images/car_icons/kdh_ori.png";

class BusinessTaxiForm extends Component {



    submit = ({fromLocation = "", toLocation= "", current_date= "", current_time= ""}) => {
        if (fromLocation === "" || toLocation === "" || current_date === "" || current_time === "") {
            throw new SubmissionError({
                _error: "Tell Pick up, Drop off locations and date before take a seat"
            })
        } else {

        }
    };

    renderField = ({value,defaultValue,onChange,id,placeholder, input, label, type, meta: {touched, error}}) => (
        <div>
            <input value={value} defaultValue={defaultValue} onChange={onChange} id={id} placeholder={placeholder} className="cus-input" {...input} type={type}/>
        </div>
    );

    render() {
        const {handleSubmit, get_to_data, get_from_data, taxiData} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)}>

                <div className="row">
                    <div className="col-md-12 col-12 ">
                        <Field id="fromLocation" className="cus-input" placeholder="Pickup Location"
                               onChange={(e) => get_from_data(e)} name="fromLocation" component={this.renderField}
                               type="text"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 col-12 ">
                        <Field id="toLocation" className="cus-input" placeholder="Destination Location"
                               onKeyUp={(e) => get_to_data(e)} name="toLocation" component="input"
                               type="text"/>
                    </div>
                </div>

                <div className="row  text-left">
                    <div className="col-md-12 col-12 ">
                        <p className="input-label">Pick up date</p>
                        <Field
                            type="date"
                            component="input"
                            name="current_date"
                            className="cus-input"
                        />
                    </div>
                </div>

                <div className="row  text-left">
                    <div className="col-md-12 col-12 ">
                        <p className="input-label">Pick up date</p>
                        <Field
                            type="time"
                            component="input"
                            name="current_time"
                            className="cus-input"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <img
                            onClick={(e) => this.props.set_vehicle_id(1)}
                            src={mini_car}
                            alt="mini car thumb"
                            className={taxiData.selected_vehicle === 1 ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                        />
                        <img
                            onClick={(e) => this.props.set_vehicle_id(2)}
                            src={ car }
                            alt="car thumb"
                            className={taxiData.selected_vehicle === 2 ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                        />
                        <img
                            onClick={(e) => this.props.set_vehicle_id(3)}
                            src={ mini_van}
                            alt="mini van thumb"
                            className={taxiData.selected_vehicle === 3 ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                        />
                        <img
                            onClick={(e) => this.props.set_vehicle_id(4)}
                            src={ kdh}
                            alt="kdh thumb"
                            className={taxiData.selected_vehicle === 4 ? "img-fluid small_vehicle-color" : "img-fluid small_vehicle-color-gray"}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <p className="error_text">
                            {this.props.error && this.props.error}
                        </p>
                        <button
                            /*onClick={() => this.check_for_data_set()}*/
                            className="cus-button"
                            type="submit"
                        >
                            OK, Take a seat
                        </button>
                    </div>
                </div>

            </form>
        )
    }
}

BusinessTaxiForm = reduxForm({
    form: 'business_taxi_form'
})(BusinessTaxiForm);

export default BusinessTaxiForm;