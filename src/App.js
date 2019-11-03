import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import UsersList from './screens/UsersList';

const App = () => {
    return (
        <Provider store={store}>
            <UsersList />
        </Provider>
    )
}

export default App;
