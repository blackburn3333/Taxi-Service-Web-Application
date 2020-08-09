import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";

class BusinessRegisterForm extends Component {

    renderField = ({size, maxLength, autoComplete, value, defaultValue, onChange, placeholder, input, label, type, validate, meta: {touched, error}}) => (
        <div>
            <input value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder}
                   className="cus-input"
                   autoComplete={autoComplete}
                   maxLength={maxLength}
                   size={size}
                   {...input} type={type}/>
        </div>
    );

    render() {

        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmitRegForm)}>
                <Field component={this.renderField}
                       name="businessName"
                       type="text"
                       placeholder="Business Name"
                       maxLength="60"
                       size="60"
                />
                <Field component={this.renderField}
                       name="businessBranchName"
                       type="text"
                       placeholder="Branch Name"
                       maxLength="60"
                       size="60"
                />
                <Field component={this.renderField}
                       name="businessContactNumber"
                       type="text"
                       placeholder="Business Contact Number"
                />
                <Field component={this.renderField}
                       name="businessEmailAddress"
                       type="text"
                       placeholder="Business Email Address"
                       maxLength="60"
                       size="60"
                />
                <Field component={this.renderField}
                       name="businessResponsiblePerson"
                       type="text"
                       placeholder="Responsible Person's Name"
                       maxLength="60"
                       size="60"
                />
                <Field component={this.renderField}
                       name="businessResponsibleNumber"
                       type="text"
                       placeholder="Responsible Person's Contact Number"
                       autoComplete="username"
                />
                <Field component={this.renderField}
                       name="businessPassword"
                       type="password"
                       placeholder="Password"
                       autoComplete="new-password"
                />
                <Field component={this.renderField}
                       name="businessPasswordConf"
                       type="password"
                       placeholder="Confirm Password"
                       autoComplete="new-password"
                />
                <input type="submit" value="Register" className="cus-button"/>
            </form>
        )
    }

}

BusinessRegisterForm = reduxForm({
    form: "businessRegForm"
})(BusinessRegisterForm);

export default BusinessRegisterForm;