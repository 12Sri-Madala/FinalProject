import types from './types';
import axios from 'axios';

export const signIn = () => async dispatch => {
    try {
        const { data: user } = await axios.get(`/auth/current-user?ts=${new Date().getTime()}`);

        console.log('User:', user);

        dispatch({
            type: types.SIGN_IN,
            user
        });

    } catch (err){
        // Dispatch any error handling types from here

        dispatch({
            type: types.SIGN_IN_ERROR
        });
    }
}
