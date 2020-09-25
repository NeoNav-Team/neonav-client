import React, { useState } from 'react';
import {useTransition, animated} from 'react-spring'
import { navigate } from 'gatsby';
import { isBrowser }  from '../utils/checks';
import { isLoggedIn } from '../services/auth';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const [show] = useState(true);
    const transitions = useTransition(show, null, {
        from: { transform: 'translate3d(-40px, 0,0)', opacity:0 },
        enter: { transform: 'translate3d(0,0px,0)', opacity:1 },
        leave: { transform: 'translate3d(4px, 0,0)', opacity:0 },
        trail: 2
    })
    const loggedInStatus = isLoggedIn();
    if (isBrowser && loggedInStatus !== 'true' && location.pathname !== `/login`) {
        navigate('/login#loggedOut');
        return null;
    }
    return transitions.map(({ item, key, props }) =>
        item && <animated.div key={key} style={props}><Component location={location} {...rest} /></animated.div>
    )
}
export default PrivateRoute;