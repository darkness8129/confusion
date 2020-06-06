import { COMMENTS } from "../shared/comments";
import * as ActionTypes from './actionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date();
            return state.concat(comment);
        default:
            return state;
    }
};
