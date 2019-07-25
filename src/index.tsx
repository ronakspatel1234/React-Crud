import "react-app-polyfill/ie9"
import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import 'raf/polyfill';
import 'core-js/es/map';
import 'core-js/es/set';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
// ------------------------------------------------------------- //
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
axios.interceptors.request.use(request => { console.log('req', request); return request })
axios.interceptors.response.use(response => { console.log('res', response); return response })

ReactDOM.render(
    <I18nextProvider i18n={i18n}> 
        <Suspense fallback={<div>{i18n.t('HOME.TITLE.LOADING')}</div>}>
            <App /> 
        </Suspense>
    </I18nextProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
