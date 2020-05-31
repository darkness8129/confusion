import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './HomeComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

class Main extends Component {
    render() {
        function filterItems(items) {
            return items.filter(elem => elem.featured)[0];
        }

        const HomePage = () => {
            return (<Home dish={filterItems(this.props.dishes)}
                leader={filterItems(this.props.leaders)}
                promotion={filterItems(this.props.promotions)} />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail selectedDish={this.props.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                />
            );
        }

        return (
            <>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={() => <Contact />} />
                    <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));