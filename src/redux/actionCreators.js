import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errorMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMessage
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchPromotions = () => (dispatch) => {
    dispatch(promotionsLoading(true));

    fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = (errorMessage) => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errorMessage
});

export const addPromotions = (promotions) => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errorMessage) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errorMessage
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const fetchComments = () => (dispatch) => {
    fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMessage
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId,
        rating,
        author,
        comment
    }

    newComment.date = new Date();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(comment => dispatch(addComment(comment)))
        .catch(error => alert(`Error: ${error.message}`));
}

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postFeedback = (feedback) => () => {
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(feedback => alert(`Thank you for your feedback! ${JSON.stringify(feedback)}`))
        .catch(error => alert(`Error: ${error.message}`));
}