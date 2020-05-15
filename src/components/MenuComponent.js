import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay } from 'reactstrap';
import DishDetail from './DishdetailComponent';

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.onDishSelect = this.onDishSelect.bind(this);

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }

    render() {
        const menu = this.props.dishes.map(dish => {
            return (<div className="col-12 col-md-5 mt-1" key={dish.id} >
                <Card onClick={() => this.onDishSelect(dish)}>
                    <CardImg src={dish.image} alt={dish.name} width="100%" />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>);
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <DishDetail selectedDish={this.state.selectedDish} />
            </div>
        );
    }
}