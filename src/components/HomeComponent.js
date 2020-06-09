import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Loading } from './LoadingComponent';

const RenderCard = ({ item, isLoading, errMessage }) => {
    if (isLoading) {
        return (
            <Loading />
        );
    } else if (errMessage) {
        return (
            <h4>{errMessage}</h4>
        );
    } else {
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
}

const Home = ({ dish, promotion, leader, dishesLoading, dishesFailed }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md m-1">
                    <RenderCard item={dish} isLoading={dishesLoading} errMessage={dishesFailed} />
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