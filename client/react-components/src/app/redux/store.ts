import { createStore, applyMiddleware } from 'redux';
import {reducers} from './reducers';
import createSagaMiddleWare from 'redux-saga';
import {rootSaga} from "./sagas";

const sagaMiddleware = createSagaMiddleWare();

const rootReducer = (state: any, action: any) => {
    return reducers(state, action)
}

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
