import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS,
        }
    }

    render() {
        function filterItems(items) {
            return items.filter(elem => elem.featured)[0];
        }

        const HomePage = () => {
            return (<Home dish={filterItems(this.state.dishes)}
                leader={filterItems(this.state.leaders)}
                promotion={filterItems(this.state.promotions)} />
            );
        }

        const DishWithId = ({match}) => {
            return (
                <DishDetail selectedDish={this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                />
            );
        }

        return (
            <>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={() => <Contact />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </>
        );
    }
}