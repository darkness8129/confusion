import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const RenderCard = ({ item }) => {
    return (
        <Card>
            <CardImg src={item.image} alt={item.name}></CardImg>
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

const Home = ({ dish, promotion, leader }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md m-1">
                    <RenderCard item={dish} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;