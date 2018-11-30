import types from './types';

export function tick(){
    return {
        type: types.TICK
    }
}

export function time_left(){
    return {
        type: types.TIME_LEFT
    }
}