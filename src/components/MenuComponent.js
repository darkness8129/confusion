/**
 * @module Menu
 */
import React from 'react';
import {
    Card,
    CardImg,
    CardTitle,
    CardImgOverlay,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

/**
 * Component for rendering menu item.
 * @param {object} dish Containing information about dish.
 */
const RenderMenuItem = ({ dish }) => {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`} className="menu-card">
                <CardImg
                    src={baseUrl + dish.image}
                    alt={dish.name}
                    width="100%"
                />
                <CardImgOverlay className="card-title-menu">
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
};

RenderMenuItem.propTypes = {
    dish: PropTypes.object,
};

/**
 * Component for showing menu.
 * @param {object} dishes Containing array of dishes and information about errors and loading.
 */
const Menu = ({ dishes }) => {
    const menu = dishes.dishes.map((dish) => {
        return (
            <div className="col-12 col-md-5 mt-3 mb-3" key={dish.id}>
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    if (dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (dishes.errMessage) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{dishes.errMessage}</h4>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4 className="page-title">Menu</h4>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">{menu}</div>
            </div>
        );
    }
};

Menu.propTypes = {
    dishes: PropTypes.object,
};

export default Menu;
