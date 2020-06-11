import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const RenderDish = ({ dish }) => {
    return (
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );

}

const RenderComments = ({ comments, postComment, dishId }) => {
    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {
                    comments.map(elem => {
                        return (
                            <li key={elem.id}>
                                <p>{elem.comment}</p>
                                <p>-- {elem.author}, {new Date(elem.date).toDateString()}</p>
                            </li>
                        );
                    })
                }
            </ul>
            <CommentForm postComment={postComment} dishId={dishId} />
        </div>
    );
}

const maxLength = (len) => (value) => !value || value.length <= len;
const minLength = (len) => (value) => value && value.length >= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommentFormOpen: false
        }

        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCommentForm() {
        this.setState({ isCommentFormOpen: !this.state.isCommentFormOpen })
    }

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
                                    className="form-control" >
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

export default DishDetail;