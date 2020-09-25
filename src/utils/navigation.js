import { modals }  from '../constants/defaults';
import queryString from 'querystring';

export const stubFromLocation = location => {
    const stub = location.hash.replace('#', '');
    return modals.includes(stub) ? stub : null;
};

export const stubFromSearch = (location, key) => {
    const params = queryString.parse(location.search);
    return typeof params[key] !== 'undefined' ? params[key] : null;
};