import { modals }  from '../constants/defaults';
import queryString from 'querystring';

export const modalFromLocation = location => {
    const stub = location.hash.replace('#', '');
    return modals.includes(stub) ? stub : null;
};

export const stubFromLocation = location => {
    return location.hash.replace('#', '');
};

export const stubFromSearch = (location, key) => {
    const params = queryString.parse(location.search);
    return typeof params[key] !== 'undefined' ? params[key] : null;
};