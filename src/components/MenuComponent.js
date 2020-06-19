/**
 * @module Menu
 */
import React from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem } from 'reactstrap';
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
            <Link to={`/menu/${dish.id}`}>
                <CardImg src={baseUrl + dish.image} alt={dish.name} width="100%" />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

RenderMenuItem.propTypes = {
    dish: PropTypes.object
}

/**
 * Component for showing menu.
 * @param {object} dishes Containing array of dishes and information about errors and loading. 
 */
const Menu = ({ dishes }) => {
    const menu = dishes.dishes.map(dish => {
        return (
            <div className="col-12 col-md-5 mt-1 mb-1" key={dish.id} >
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
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h4>Menu</h4>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

Menu.propTypes = {
    dishes: PropTypes.object
}

export default Menu;