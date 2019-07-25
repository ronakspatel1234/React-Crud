import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
// ------------------------------------------------------------------------------- //
import { Home } from './components/Home';
import { Navigation } from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import { Login } from './components/LogIn';
import { CustomValidation } from './components/CustomValidation';
import './App.css';

// use for lazy loading component
const Customer = lazy(() => import('./components/Customer'));
const Employee = lazy(() => import('./components/Employee'));
const CustomerForm = lazy(() => import('./components/CustomerForm'));
const AddEmployee = lazy(() => import('./components/AddEmployee'));
const Accordion = lazy(() => import('./components/Accordion'));
const Tabs = lazy(() => import('./components/Tabs'));

function App()  {
  const { t, i18n } = useTranslation();

    return (
      <Router>
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center">
            <Trans>HOME.TITLE.HEADER_TITLE</Trans>
          </h3>
          <h5 className="m-3 d-flex justify-content-center">
            {t('HOME.TITLE.PORTAL_NAME')}
          </h5>
          <Navigation i18n={i18n}/>
          <Suspense fallback={<div>{t('HOME.TITLE.LOADING')}</div>}>
            <Switch>
              <Route path='/' component={Home} i18n={i18n} t={t} exact />
              <Route path='/login' render={(props) => <Login {...props} i18n={i18n} />} />
              <PrivateRoute path='/customer' component={Customer} i18n={i18n}/>
              <PrivateRoute path='/employee' component={Employee} />
              <PrivateRoute path='/add-customer' component={CustomerForm} />
              <PrivateRoute path='/edit-customer/:id' component={CustomerForm} />
              <PrivateRoute path='/add-employee' component={AddEmployee} />
              <Route path='/accordion' component={Accordion} i18n={i18n} t={t}/>
              <Route path='/tabs' component={Tabs} i18n={i18n} t={t}/>
              <Route path='/custom-validation' component={CustomValidation} i18n={i18n} t={t}/>
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
}

export default withTranslation('translations')(App);
