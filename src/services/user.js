import { formatEnpoint } from '../utils/format';
import { getUser } from './auth';
import axios from 'axios';
import _ from 'lodash';

export const userProfile = () => {
    if (!isBrowser) return false;
    axios.defaults.port = 6001;
    const url = formatEnpoint('profile');
    const nnUser = getUser();
    const token = nnUser.accessToken;
    return axios({
        headers: {"Authorization" : `Bearer ${token}`},
        method: 'get',
        url
    }).then(
        function (response) {
            console.log('RESPONSE SUCESSFUL');
            return response;
        }
    ).catch(function (error) {
        if (error.response) {
          console.log('RESPONSE ERRORED');
          console.log(error.response);
          return error.response;
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        return error;
      });
};