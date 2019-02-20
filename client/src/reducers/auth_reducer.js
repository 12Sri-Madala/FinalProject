import types from '../actions/types';

const DEFAULT_STATE = {
    auth: false,
    info: {}
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SIGN_IN:
            return { auth: true, info: action.user };
        case types.SIGN_IN_ERROR:
            return { auth: false, info: {} };
        default:
            return state;
    }
}
