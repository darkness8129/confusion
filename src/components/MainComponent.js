import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.onDishSelect = this.onDishSelect.bind(this);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        return (
            <div className = "main">
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <div className="container">
                    <Menu dishes={this.state.dishes}
                        onClick={this.onDishSelect} />
                    <DishDetail selectedDish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]} />
                </div>
            </div>
        );
    }
}