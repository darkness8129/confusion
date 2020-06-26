/**
 * @module DetailsAboutSelecetedDish
 */
import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { FadeTransform, Stagger, Fade } from 'react-animation-components';
import PropTypes from 'prop-types';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

/**
 * Component for rendering dish.
 * @param {object} dish Containing information about dish.
 */
const RenderDish = ({ dish }) => {
    return (
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );

}

RenderDish.propTypes = {
    dish: PropTypes.object
}

/**
 * Component for rendering comments.
 * @param {array} comments Containing array of comments.
 * @param {function} postComment Posting comment to the server.
 * @param {number} dishId Id of selected dish.
 */
const RenderComments = ({ comments, postComment, dishId }) => {
    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in>
                    {
                        comments.map(elem => {
                            return (
                                <Fade in key={elem.id}>
                                    <li>
                                        <p>{elem.comment}</p>
                                        <p>-- {elem.author}, {new Date(elem.date).toDateString()}</p>
                                    </li>
                                </Fade>
                            );
                        })
                    }
                </Stagger>
            </ul>
            <CommentForm postComment={postComment} dishId={dishId} />
        </div>
    );
}

RenderComments.propTypes = {
    comments: PropTypes.array,
    postComment: PropTypes.func,
    dishId: PropTypes.number
}

/**
 * Function for validate for comment form. Sets the max length of the str.
 * @param {number} len Max length. 
 */
const maxLength = (len) => (value) => !value || value.length <= len;

/**
 * Function for validate for comment form. Sets the min length of the str.
 * @param {number} len Min length. 
 */
const minLength = (len) => (value) => value && value.length >= len;

/**
 * Component for showing comments form.
 * @param {function} postComment Posting comment to the server.
 * @param {number} dishId Id of selected dish.
 */
class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommentFormOpen: false
        }

        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Function thar open and close comment form.
     */
    toggleCommentForm() {
        this.setState({ isCommentFormOpen: !this.state.isCommentFormOpen })
    }

    /**
     * Function for submitting comment.
     * @param {values} values Containing comment entered by the user in the form.
     */
    handleSubmit(values) {
        this.toggleCommentForm();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleCommentForm}><span className="fa fa-pencil fa-lg"></span>Submit comment</Button>
                <Modal isOpen={this.state.isCommentFormOpen}>
                    <ModalHeader toggle={this.toggleCommentForm}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values => this.handleSubmit(values))}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating"
                                    id="rating"
                                    name="rating"
                                    className="form-control"
                                    defaultValue="1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less '
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment"
                                    id="comment"
                                    name="comment"
                                    rows="6"
                                    className="form-control" />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }

}

CommentForm.propTypes = {
    postComment: PropTypes.func,
    dishId: PropTypes.number
}

/**
 * Component for showing details of selected dish.
 * @param {object} selectedDish Containing information about selected dish.
 * @param {array} comments Array of comments.
 * @param {function} postComment Posting comments to the server.
 * @param {boolean} isLoading Information about loading selected dish.
 * @param {string} errMessage Containing error message if error occuring.
 */
const DishDetail = ({ selectedDish, comments, postComment, isLoading, errMessage }) => {
    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (errMessage) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{errMessage}</h4>
                </div>
            </div>
        );
    } else if (selectedDish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{selectedDish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{selectedDish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 mt-1">
                        <RenderDish dish={selectedDish} />
                    </div>
                    <div className="col-12 col-md-5 mt-1">
                        <RenderComments comments={comments} postComment={postComment} dishId={selectedDish.id} />
                    </div>
                </div>
            </div>
        );
    }
}

DishDetail.propTypes = {
    selectedDish: PropTypes.object,
    comments: PropTypes.array,
    postComment: PropTypes.func,
    isLoading: PropTypes.bool,
    errMessage: PropTypes.string
}

export default DishDetail;