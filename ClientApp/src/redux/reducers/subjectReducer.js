import { SET_SELECTED_SUBJECTS, SET_SUBJECTS } from './../actions/actions';

function subjectReducer(state = { subjects: [], selectedSubject: 1}, action) {
    switch (action.type) {
        case SET_SELECTED_SUBJECTS:
            return {
                ...state, selectedSubject:  action.payload
            };
        case SET_SUBJECTS:
            return {
                ...state, subjects: action.payload
            };
        default:
            return state;
    }
}

export default subjectReducer;