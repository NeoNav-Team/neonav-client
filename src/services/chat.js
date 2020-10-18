import axios from 'axios';
import { isBrowser } from '../utils/checks';
import { getUser } from './auth';
import { formatEnpoint } from '../utils/format';

export const chatChannels = () => {
    if (!isBrowser) return false;
    axios.defaults.port = 6001;
    const url = formatEnpoint('channels');
    const nnUser = getUser();
    const token = nnUser.accessToken;
    return axios({
        headers: {
          'x-access-token': `${token}`,
          'content-type': 'application/json'
        },
        method: 'get',
        url
    }).then(
        function (response) {
            return response;
        }
    ).catch(function (error) {
        if (error.response) {
          console.log('Error', error.response);
          return error.response;
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log('Error', error.config);
        return error;
      });
};