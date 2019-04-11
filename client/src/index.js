import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import appStore from './store/store';
import * as serviceWorker from './serviceWorker';

import { router } from 'router';
import { UIRouter, UIView } from '@uirouter/react';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
const store = createStore(appStore, ['Use Redux'])

ReactDOM.render(
    <Provider store={store}>
        <UIRouter router={router}>
            <UIView />
        </UIRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

export {store};
