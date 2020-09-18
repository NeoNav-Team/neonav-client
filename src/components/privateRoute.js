import React from 'react';
import { navigate } from 'gatsby';
import { isBrowser }  from '../utils/checks';
import { isLoggedIn } from '../services/auth';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const loggedInStatus = isLoggedIn();
    if (isBrowser && loggedInStatus !== 'true' && location.pathname !== `/login`) {
        navigate('/login');
        return null;
    }
    return <Component location={location} {...rest} />
}
export default PrivateRoute;