import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
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
                <Switch>
                    <Route path='/home' component={() => <Home />} />
                    <Route exact path = '/menu' component ={() => <Menu dishes={this.state.dishes} />} />
                    <Redirect to ='/home'/>
                </Switch>
                <Footer />
            </>
        );
    }
}