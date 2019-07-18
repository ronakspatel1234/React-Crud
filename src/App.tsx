import React, { Suspense, lazy } from 'react';
import './App.css';

import { Home } from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import { Login } from './components/LogIn';

// use for lazy loading component

const Customer = lazy(() => import('./components/Customer'));
const Employee = lazy(() => import('./components/Employee'));
const CustomerForm = lazy(() => import('./components/CustomerForm'));
const AddEmployee = lazy(() => import('./components/AddEmployee'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          React Js with Web api Demo
      </h3>
        <h5 className="m-3 d-flex justify-content-center">
          Employee Management Portal
      </h5>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/customer' component={Customer} />
            <PrivateRoute path='/employee' component={Employee} />
            <PrivateRoute path='/add-customer' component={CustomerForm} />
            <PrivateRoute path='/edit-customer/:id' component={CustomerForm} />
            <PrivateRoute path='/add-employee' component={AddEmployee} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
