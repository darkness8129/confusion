import React from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay } from 'reactstrap';

const RenderMenuItem = ({ dish, onClick }) => {
    return (
        <Card onClick={() => onClick(dish.id)}>
            <CardImg src={dish.image} alt={dish.name} width="100%" />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

const Menu = ({ dishes, onClick }) => {
    const menu = dishes.map(dish => {
        return (
            <div className="col-12 col-md-5 mt-1" key={dish.idнфкт } >
                <RenderMenuItem dish={dish} onClick={onClick} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
    );
}

export default Menu;