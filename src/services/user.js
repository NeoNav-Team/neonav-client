import { formatEnpoint } from '../utils/format';
import { isBrowser } from '../utils/checks';
import { getUser } from './auth';
import axios from 'axios';

export const userProfile = () => {
    if (!isBrowser) return false;
    axios.defaults.port = 6001;
    const url = formatEnpoint('profile');
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


export const updateProfile = data => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const url = formatEnpoint('profile');
  const nnUser = getUser();
  const token = nnUser.accessToken;
  return axios({
      headers: {
        'x-access-token': `${token}`,
        'content-type': 'application/json'
      },
      method: 'put',
      url,
      data
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