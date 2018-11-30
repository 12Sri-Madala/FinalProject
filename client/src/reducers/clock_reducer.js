import types from '../actions/types';


const DEFAULT_STATE = {
    currentTime: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString()
};

function clockReducer(state = DEFAULT_STATE, action){


    switch(action.type){
        case types.TICK:
            return { ...state, currentTime: new Date().toLocaleTimeString() }
        default:
            return state;
    }
}

export default clockReducer;