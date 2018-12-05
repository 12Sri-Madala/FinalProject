import types from './types';
import axios from 'axios';


export const BASE_URL = 'http://api.reactprototypes.com/todos';
export const API_KEY = '?key=c_918demouser';


export function addToDoItem(item){
    const resp = axios.post(BASE_URL + API_KEY, item);

    return {
        type: types.ADD_LIST_ITEM,
        payload: resp
    }
}

export function getReminderList(){
    const resp = axios.get(BASE_URL + API_KEY);

    return {
        type: types.GET_REMINDER_LIST,
        payload: resp
    }
}




/*export function tick(){
    return {
        type: types.TICK
    }
}*/
