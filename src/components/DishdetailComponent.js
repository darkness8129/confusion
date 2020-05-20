import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, } from 'reactstrap';

export default class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.renderDish = this.renderDish.bind(this);
        this.renderComments = this.renderComments.bind(this);
    }

    renderDish(dish) {

        if (dish != null) {
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    renderComments(comments) {
        if (comments != null) {
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
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 mt-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 mt-1">
                    {this.props.selectedDish != null ? this.renderComments(this.props.selectedDish.comments) : this.renderComments(null)}
                </div>

            </div>
        );
    }
}