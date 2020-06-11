import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import Home from './HomeComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import { postComment, fetchDishes, fetchPromotions, fetchComments } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
        fetchDishes: () => dispatch(fetchDishes()),
        fetchPromotions: () => dispatch(fetchPromotions()),
        fetchComments: () => dispatch(fetchComments()),
        resetFeedbackForm: () => dispatch(actions.reset('feedback'))
    });
}

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchPromotions();
        this.props.fetchComments();
    }

    render() {
        function filterItems(items) {
            return items.filter(elem => elem.featured)[0];
        }

        const HomePage = () => {
            return (<Home dish={filterItems(this.props.dishes.dishes)}
                dishesLoading={this.props.dishes.isLoading}
                dishesFailed={this.props.dishes.errMessage}
                promotion={filterItems(this.props.promotions.promotions)}
                promotionsLoading={this.props.promotions.isLoading}
                promotionsFailed={this.props.promotions.errMessage}
                leader={filterItems(this.props.leaders)} />
            );
        }

        const DishWithId = ({ match }) => {
            return (

                < DishDetail selectedDish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMessage={this.props.dishes.errMessage}
                    comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsFailed={this.props.comments.errMessage}
                    postComment={this.props.postComment} />
            );
        }

        return (
            <>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));