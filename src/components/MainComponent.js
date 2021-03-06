/**
 * @module Main
 */
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Home from './HomeComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import { fetchDishes, fetchPromotions, fetchLeaders, fetchComments, postComment, postFeedback } from '../redux/ActionCreators';

// For access to state from component (as props).
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

// Determines what actions a component can perform
const mapDispatchToProps = dispatch => {
    return ({
        fetchDishes: () => dispatch(fetchDishes()),
        fetchPromotions: () => dispatch(fetchPromotions()),
        fetchLeaders: () => dispatch(fetchLeaders()),
        fetchComments: () => dispatch(fetchComments()),
        resetFeedbackForm: () => dispatch(actions.reset('feedback')),
        postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
        postFeedback: (feedback) => dispatch(postFeedback(feedback))
    });
}

/**
 * Container component of application.
 * @param {object} dishes Containing array of dishes and information about errors and loading.  
 * @param {object} leaders Containing array of leaders and information about errors and loading. 
 * @param {object} promotions Containing array of promotions and information about errors and loading. 
 * @param {object} comments Containing array of dishes and information about errors.
 * @param {function} fetchDishes Function for fetching dishes.
 * @param {function} fetchPromotions Function for fetching promotions.
 * @param {function} fetchLeaders Function for fetching leaders.
 * @param {function} fetchComments Function for fetching comments.
 * @param {function} resetFeedbackForm Clear the feedback form when the feedback is sent.
 * @param {function} postComment Posting comment to the server.
 * @param {function} postFeedback Sending feedback to the server.
 */
class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchPromotions();
        this.props.fetchLeaders();
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
                leader={filterItems(this.props.leaders.leaders)}
                leadersLoading={this.props.leaders.isLoading}
                leadersFailed={this.props.leaders.errMessage} />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail selectedDish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMessage={this.props.dishes.errMessage}
                    comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsFailed={this.props.comments.errMessage}
                    postComment={this.props.postComment} />
            );
        }
        //in last route children, because it fixes animation
        return (
            <>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch location={this.props.location}>
                            <Route path='/home' component={HomePage} />
                            <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                            <Route path='/menu/:dishId' component={DishWithId} />
                            <Route path='/contactus' children={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </>
        );
    }
}

Main.propTypes = {
    dishes: PropTypes.object,
    comments: PropTypes.object,
    leaders: PropTypes.object,
    promotions: PropTypes.object,
    fetchDishes: PropTypes.func,
    fetchPromotions: PropTypes.func,
    fetchLeaders: PropTypes.func,
    fetchComments: PropTypes.func,
    resetFeedbackForm: PropTypes.func,
    postFeedback: PropTypes.func,
    postComment: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));