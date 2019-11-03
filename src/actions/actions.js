import axios from 'axios';
import { LOAD_USERS_SUCCESS } from './actionTypes';

const baseUrl = 'https://api.github.com/search/users?q=location%3A';

export function loadUsersSuccess(users) {
    return {
        type: LOAD_USERS_SUCCESS,
        users
    };
}

export function loadUsers(cityName) {
    return dispatch => {
        axios.get(`${baseUrl}${cityName}`)
            .then(users => {
                dispatch(loadUsersSuccess(users.data.items));
            })
            .catch(err => {
                throw err;
            });

    }
ßß}