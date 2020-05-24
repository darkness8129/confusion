import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderDish = ({ dish }) => {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );

}

const RenderComments = ({ comments }) => {
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
}

const DishDetail = ({ selectedDish, comments }) => {
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
                    <RenderComments comments={comments} />
                </div>
            </div>
        </div>
    );
}

export default DishDetail;