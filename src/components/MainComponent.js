import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
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
            <>
                <Header />
                <Menu dishes={this.state.dishes}
                    onClick={this.onDishSelect} />
                <DishDetail selectedDish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]} />
                <Footer />
            </>
        );
    }
}