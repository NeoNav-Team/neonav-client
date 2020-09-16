import { formatEnpoint } from '../utils/format';
import axios from 'axios';
import _ from 'lodash';

export const userProfile = data => {
    if (!isBrowser) return false;
    axios.defaults.port = 6001;
    const url = formatEnpoint('profile');
    return axios({
        method: 'get',
        url,
        data
    }).then(
        function (response) {
            console.log('RESPONSE SUCESSFUL');
            console.log('setUser', response.data);
            setUser(response.data);
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