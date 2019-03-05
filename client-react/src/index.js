import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import appStore from './store/store';
import ReduxToastr from 'react-redux-toastr'

import { createStore } from 'redux'
import { Provider } from 'react-redux';
const store = createStore(appStore, ['Use Redux'])

console.log(ReduxToastr);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <App/>
            <ReduxToastr 
                preventDuplicates
                position="bottom-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                closeOnToastrClick/>
        </div>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
