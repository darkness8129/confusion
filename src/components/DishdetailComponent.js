import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, } from 'reactstrap';

const RenderDish = ({ dish }) => {
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

const RenderComments = ({ comments }) => {
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

const DishDetail = ({ selectedDish }) => {
    return (
        <div className="row">
            <div className="col-12 col-md-5 mt-1">
                <RenderDish dish={selectedDish} />
            </div>
            <div className="col-12 col-md-5 mt-1">
                {selectedDish != null ? <RenderComments comments={selectedDish.comments} /> : <RenderComments comments={null} />}
            </div>

        </div>
    );
}

export default DishDetail;