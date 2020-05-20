import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay } from 'reactstrap';

export default class Menu extends Component {

    render() {
        const menu = this.props.dishes.map(dish => {
            return (<div className="col-12 col-md-5 mt-1" key={dish.id} >
                <Card onClick={() => this.props.onClick(dish.id)}>
                    <CardImg src={dish.image} alt={dish.name} width="100%" />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>);
        });

        return (
            <div className="row">
                {menu}
            </div>

        );
    }
}