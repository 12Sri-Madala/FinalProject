import { combineReducers } from 'redux';
import clockReducer from './clock_reducer';

export default combineReducers({
    clock: clockReducer
});