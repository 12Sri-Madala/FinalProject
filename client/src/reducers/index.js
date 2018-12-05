import { combineReducers } from 'redux';
import listReducer from './list_reducer'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    list: listReducer
});

export default rootReducer;








