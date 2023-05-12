import { createStore, compose, applyMiddleware  } from 'redux';
//import subjectReducer from './subjectReducer';
import unitedReducer from './reducers/unitedReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const store = createStore(unitedReducer,
    //{
    //    detailTypes: { detailTypes:[], isLoading: true},
    //        subject: { subjects: [], selectedSubject: [] }

    //},
    //subjectReducer, { subjects: [], selectedSubject: [] }
     composeWithDevTools(
        applyMiddleware(
            thunk
        )
    ));

export default store;