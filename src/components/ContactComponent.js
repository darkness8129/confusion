import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            telnum: "",
            email: "",
            agree: false,
            contactType: "Tel.",
            message: "",
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false,
                message: false
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validation = this.validation.bind(this);
    }

    handleInputChange(e) {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({ [e.target.name]: value });
    }

    handleSubmit(e) {
        alert('Current State is: ' + JSON.stringify(this.state));
        e.preventDefault();
    }

    handleBlur(e) {
        const inputName = e.target.name;
        this.setState({ touched: { ...this.state.touched, [inputName]: true } })
    }

    validation({ firstname, lastname, telnum, email, message }) {
        const errors = {
            firstname: "",
            lastname: "",
            telnum: "",
            email: "",
            message: ""
        }

        if (this.state.touched.firstname && firstname.length < 2) {
            errors.firstname = "The first name is too short";
        } else if (this.state.touched.firstname && firstname.length > 15) {
            errors.firstname = "The first name is too long";
        } else if (this.state.touched.firstname && !/^[A-za-z]+$/.test(firstname)) {
            errors.firstname = "The first name should not contains numbers";
        }


        if (this.state.touched.lastname && lastname.length < 2) {
            errors.lastname = "The last name is too short";
        } else if (this.state.touched.lastname && lastname.length > 15) {
            errors.lastname = "The last name is too long";
        } else if (this.state.touched.lastname && !/^[A-za-z]+$/.test(lastname)) {
            errors.lastname = "The last name should not contains numbers";
        }

        if (this.state.touched.telnum && telnum.length < 11) {
            errors.telnum = "The Tel. number is too short";
        } else if (this.state.touched.telnum && telnum.length > 11) {
            errors.telnum = "The Tel. number is too long";
        } else if (this.state.touched.telnum && !/^(\+380)/.test(telnum)) {
            errors.telnum = "The Tel. number should start with '+380'";
        } else if (this.state.touched.telnum && /[A-za-z]+/.test(telnum)) {
            errors.telnum = "The Tel. number should not contains letters";
        }

        if (this.state.touched.email && !email.split('').includes("@")) {
            errors.email = "The email should includes '@'";
        }

        if (this.state.touched.message && message.length === 0) {
            errors.message = "Your message do not have any symbols";
        }


        return errors;
    }

    render() {
        const errors = this.validation(this.state);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contacts Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input id="firstname"
                                        name="firstname"
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur}
                                        valid={errors.firstname === ''}
                                        invalid={errors.firstname !== ''} />
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input id="lasttname"
                                        name="lastname"
                                        placeholder="Last Name"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur}
                                        valid={errors.lastname === ''}
                                        invalid={errors.lastname !== ''} />
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input id="telnum"
                                        name="telnum"
                                        placeholder="Tel. number"
                                        value={this.state.telnum}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur}
                                        valid={errors.telnum === ''}
                                        invalid={errors.telnum !== ''} />
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 6, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} />
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Input type="select"
                                        name="contactType"
                                        value={this.state.contactType}
                                        onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea"
                                        id="message"
                                        name="message"
                                        rows="7"
                                        value={this.state.message}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur}
                                        valid={errors.message === ''}
                                        invalid={errors.message !== ''} />
                                    <FormFeedback>{errors.message}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>

                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}