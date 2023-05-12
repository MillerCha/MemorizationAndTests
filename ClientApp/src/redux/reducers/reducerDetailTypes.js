import {  SET_DETAIL_TYPES, SET_IS_LOADING } from './../actions/actionsDetailTypes';

function reducerDetailTypes(state = { detailTypes: [], isLoading: true }, action) {
    switch (action.type) {
        case SET_DETAIL_TYPES:
            console.log("s"+action.payload);
            return {
                ...state, detailTypes: action.payload
            };
        case SET_IS_LOADING:
            return {
                ...state, isLoading: action.payload
            };
        default:
            return state;
    }
}

export default reducerDetailTypes;