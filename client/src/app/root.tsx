import React from 'react';
import { Provider } from 'react-redux';

import Routing from './Router'
import { store } from './Store';

import '@styles/app.scss'


export default function App() {
    return (
        <>
            <React.StrictMode>
                <Provider store={store}>
                    <Routing />
                </Provider>
            </React.StrictMode>
        </>
    );
}
