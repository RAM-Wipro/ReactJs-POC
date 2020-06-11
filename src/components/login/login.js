import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Fade } from 'reactstrap';
import _ from 'lodash';
import login from "./login.css";
import logo from './app_icon.png';
import arrow from './rightarrow.png';
import { Redirect } from 'react-router-dom'



const validationMethods = {
    required: (field, value) => {
        if (!value.toString().trim().length) {
            return `This ${field} field is required.`
        }
    },
    isEmail: (field, value) => {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(value) === false) {
            return `Invalid Email Address.`
        }
    }
}

const validateForm = (form) => {
    const loginForm = document.getElementById(form)
    return loginForm.querySelectorAll('[validations]');
}

const runValidationRules = (element, errors) => {
    const target = element;
    const field = target.name;
    const value = target.value
    let validations = element.getAttribute('validations');
    validations = validations.split(',')

    for (let validation of validations) {
        validation = validation.split(':');
        const rule = validation[0];
        const error = validationMethods[rule](field, value);
        errors[field] = errors[field] || {};
        if (error) {
            errors[field][rule] = error;
        } else {
            if (_.isEmpty(errors[field])) {
                delete errors[field];
            } else {
                delete errors[field][rule];
            }
        }
    }

    return errors;
}


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: []
        }
    }



    login = (event) => {

        event.preventDefault();

        const formElements = validateForm("loginForm");

        formElements.forEach(element => {
            const errors = runValidationRules(element, this.state.errors);
            this.setState({
                errors: errors
            });
        })

        const email = this.state.email;
        const password = this.state.password;
        const errors = this.state.errors;
       
        console.log(email, password, errors);
        this.props.history.push('/home');


    }

    handleChange = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value

        const errors = runValidationRules(target, this.state.errors);

        this.setState({
            errors: errors
        });

        this.setState({
            [field]: value
        });
    }

    render() {
        return (
            <div className="container">
                <div className="form-container">
                    <Form id="loginForm" method="post" onSubmit={this.login}>
                        <FormGroup>
                            <div className="input-icons">

                                <i class="fa fa-user-circle-o icon" aria-hidden="true"></i>

                                <input
                                    className="input-field"
                                    type="text"
                                    validations={['required', 'isEmail']}
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    id="email"
                                    placeholder="User Id."
                                />
                            </div>
                            <FromValidationError field={this.state.errors.email} className="errMsg" />
                        </FormGroup>
                        <FormGroup>
                            <div className="input-icons">
                            <i class="fa fa-wrench icon" aria-hidden="true"></i>
                                <input
                                    type="password"
                                    className="input-field"
                                    validations={['required']}
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    id="password"
                                    placeholder="Password"
                                />
                            </div>
                            <FromValidationError field={this.state.errors.password} className="errMsg" />
                        </FormGroup>

                    </Form>
                    <div className="login-btn-div">
                        <Button onClick={this.login} className="login-btn">login  <i class="fa fa-long-arrow-right" aria-hidden="true" ></i>
                        </Button>
                    </div>
                    <div className="logo-div">
                        <img src={logo} width="100" height="50" className="Loginlogo" />
                    </div>
                </div>

            </div>
        );
    }
}

const FromValidationError = props => (
    <Fade in={Boolean(props.field)} tag="p" className="error">
        {props.field ? Object.values(props.field).shift() : ''}
    </Fade>
);