import url from 'url';
import { apis } from '../constants/apis';

// this function is for if we need to expand later to different 
// base domains or new versioned endpoints
export const formatEnpoint = endpoint => {
    const apiObject = apis;
    apiObject.url.pathname = apis[endpoint];
    return url.format(apiObject.url);
}