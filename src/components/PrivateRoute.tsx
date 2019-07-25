import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

export interface PrivateRouteProps extends RouteProps {
    component: any;
    i18n?: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                localStorage.getItem("access_token") ?
                    <Component {...routeProps} i18n={props.i18n}/>  :
                    <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />
            }
        />
    );
};

export default PrivateRoute;