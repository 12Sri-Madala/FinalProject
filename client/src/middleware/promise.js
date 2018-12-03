export default (store) => (next) => (action) => {


    if(!action.payload || !action.payload.then){
        //no payload
        //or
        //not a promise

        return next(action);
    }
    //has a promise on the payload prop

    action.payload.then((resp) => {
        const newAction = {
            ...action,
            payload: resp

        }
        store.dispatch(newAction);
    });

    return action.payload;
}