/**
 * @module Home
 */
import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import PropTypes from 'prop-types';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

/**
 * Component for rendering card.
 * @param {object} item Containing information that must be renderend in a card.
 * @param {boolean} isLoading Containing information about loading card.
 * @param {string} errMessage Containing error message if it occures.
 */
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
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name}></CardImg>
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}

RenderCard.propTypes = {
    item: PropTypes.object,
    isLoading: PropTypes.bool,
    errMesage: PropTypes.string
}

/**
 * Component for showing home page.
 * @param {object} dish Containing information about dish.
 * @param {boolean} dishesLoading Containing information about loading dishes.
 * @param {string} dishesFailed Containing error message if it occures.
 * @param {object} promotion Containing information about promotion.
 * @param {boolean} promotionsLoading Containing information about loading promotions.
 * @param {string} promotionsFailed Containing error message if it occures.
 * @param {object} leader Containing information about leader.
 * @param {boolean} leadersLoading Containing information about loading leaders.
 * @param {string} leadersFailed Containing error message if it occures.
 */
const Home = ({ dish, dishesLoading, dishesFailed, promotion, promotionsLoading, promotionsFailed, leader, leadersLoading, leadersFailed, }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md m-1">
                    <RenderCard item={dish} isLoading={dishesLoading} errMessage={dishesFailed} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={promotion} isLoading={promotionsLoading} errMessage={promotionsFailed} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={leader} isLoading={leadersLoading} errMessage={leadersFailed} />
                </div>
            </div>
        </div>
    );
}

Home.propTypes = {
    dish: PropTypes.object,
    dishesLoading: PropTypes.bool,
    dishesFailed: PropTypes.string,
    promotion: PropTypes.object,
    promotionsLoading: PropTypes.bool,
    promotionsFailed: PropTypes.string,
    leader: PropTypes.object,
    leadersLoading: PropTypes.bool,
    leadersFailed: PropTypes.string
}

export default Home;