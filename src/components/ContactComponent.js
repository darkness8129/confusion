/**
 * @module ContactUs
 */
import React, { Component } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Label,
    Col,
    Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Control, Errors } from 'react-redux-form';
import PropTypes from 'prop-types';

/**
 * Function for validate for feedback form. Sets the input a s required.
 * @param {*} value Value of input.
 */
const required = (value) => value && value.length;

/**
 * Function for validate for feedback form. Sets the max length of the str.
 * @param {number} len Max length.
 */
const maxLength = (len) => (value) => !value || value.length <= len;

/**
 * Function for validate for feedback form. Sets the min length of the str.
 * @param {number} len Min length.
 */
const minLength = (len) => (value) => value && value.length >= len;

/**
 * Function for validate for feedback form. Сhecks if the value is a number.
 * @param {*} value Value of input.
 */
const isNumber = (value) => !isNaN(Number(value));

/**
 * Function for validate for feedback form. Сhecks the correctness of the email.
 * @param {*} value Value of input.
 */
const validEmail = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

/**
 * Component for showing contact page.
 * @param {function} postFeedback Sending feedback to the server.
 * @param {function} resetFeedbackForm Clear the form when the feedback is sent.
 */
class Contact extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Function for submitting feedback.
     * @param {object} values Containing feedback entered by the user in the form.
     */
    handleSubmit(values) {
        this.props.postFeedback(values);
        this.props.resetFeedbackForm();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="page-title">Contacts Us</h3>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12 md-9">
                        <Form
                            model="feedback"
                            onSubmit={(values) => this.handleSubmit(values)}
                            className="contact-form"
                        >
                            <Row className="form-group">
                                <Label htmlFor="firstname">First Name</Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".firstname"
                                        id="firstname"
                                        name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength:
                                                'Must be greater than 2 characters ',
                                            maxLength:
                                                'Must be 15 characters or less',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname">Last Name</Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".lastname"
                                        id="lasttname"
                                        name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength:
                                                'Must be greater than 2 characters ',
                                            maxLength:
                                                'Must be 15 characters or less',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum">Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".telnum"
                                        id="telnum"
                                        name="telnum"
                                        placeholder="Tel. number"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15),
                                            isNumber,
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength:
                                                'Must be greater than 2 numbers ',
                                            maxLength:
                                                'Must be 15 numbers or less ',
                                            isNumber: 'Must be a number',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email">Email</Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required,
                                            validEmail,
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            validEmail: 'Invalid Email Address',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row
                                className="form-group"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox
                                            model=".agree"
                                            type="checkbox"
                                            name="agree"
                                            className="form-check-input"
                                        />
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </div>

                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select
                                        model=".contactType"
                                        type="select"
                                        name="contactType"
                                        className="form-control"
                                    >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>
                                    Your Feedback
                                </Label>
                                <Col md={10}>
                                    <Control.textarea
                                        model=".message"
                                        type="textarea"
                                        id="message"
                                        name="message"
                                        rows="7"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group text-center">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

Contact.propTypes = {
    postFeedback: PropTypes.func,
    resetFeedbackForm: PropTypes.func,
};

export default Contact;
