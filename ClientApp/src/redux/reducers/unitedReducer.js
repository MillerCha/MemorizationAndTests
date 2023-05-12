import { combineReducers } from 'redux';
import reducerDetailTypes from './reducerDetailTypes';
import subjectReducer from './subjectReducer';

const unitedReducer = combineReducers({
    detailTypes: reducerDetailTypes,
    subjects: subjectReducer
});

export default unitedReducer;
