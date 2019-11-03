import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
// import user from './userReducer';

const rootReducer = combineReducers({
    users: usersReducer
});

export default rootReducer;