import axios from 'axios';
import _ from 'lodash';

export const isBrowser = typeof window !== 'undefined';

export const getUser = () =>
  isBrowser && window.localStorage.getItem('nnUser')
    ? JSON.parse(window.localStorage.getItem('nnUser'))
    : {};

const setUser = user => {
  window.localStorage.setItem('nnUser', JSON.stringify(user));
}

export const userLogin = data => {
    if (!isBrowser) return false;
    axios.defaults.port = 6001;
    return axios({
        method: 'post',
        url: `https://neonav.net:6001/api/auth`,
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

export const isLoggedIn = () => {
  const user = getUser();
  const loginBool = _.get(user, 'userid', '').length >= 1;
  return loginBool;
}

export const logout = callback => {
  setUser({});
  callback();
}