import types from '../actions/types';

const DEFAULT_STATE = {
    all: []
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.GET_REMINDER_LIST:
            console.log('List Reducer for REMINDer:', action);
            return state;
        default:
            return state;
    }
}