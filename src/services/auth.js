import { formatEnpoint } from '../utils/format';
import { isBrowser } from '../utils/checks';
import { navigate } from 'gatsby';
import axios from 'axios';
import _ from 'lodash';

export const getUser = () =>
  isBrowser && window.localStorage.getItem('nnUser')
    ? JSON.parse(window.localStorage.getItem('nnUser'))
    : {};

const setUser = user => {
  window.localStorage.setItem('nnUser', JSON.stringify(user));
}

export const userRegister = data => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const url = formatEnpoint('register');
  return axios({
      method: 'post',
      url,
      data
  }).then(
    function (response) {
      logout(() => {
        navigate('/login#newUser');
      });
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

export const userInvite = data => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const url = formatEnpoint('invite');
  return axios({
      method: 'post',
      url,
      data
  }).then(
    function (response) {
      logout(() => {
        navigate('/login#newUser');
      });
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

export const userChangePass = data => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const nnUser = getUser();
  data.dbid = nnUser.id;
  const userid = nnUser.userid;
  const token = nnUser.accessToken;
  const url = `${formatEnpoint('changePass')}${userid}`;
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
        logout(() => {
          navigate('/login#changePass');
        });
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

export const validateToken = () => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const nnUser = getUser();
  const token = nnUser.accessToken;
  const url = formatEnpoint('validate');
  return axios({
      headers: {
        'x-access-token': `${token}`,
        'content-type': 'application/json'
      },
      method: 'get',
      url
  }).then(function (response) {}
  ).catch(function (error) {
      if (error.response) {
        console.log('Error', error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log('Error', error.config);
      logout(() => {
        navigate('/login#invalidToken');
      });
      return error;
    });
};

export const userLogin = data => {
    if (!isBrowser) return false;
    axios.defaults.port = 6001;
    const url = formatEnpoint('login');
    return axios({
        method: 'post',
        url,
        data
    }).then(
        function (response) {
            setUser(response.data);
            return response;
        }
    ).catch(function (error) {
        if (error.response) {
          return error.response;
        } else if (error.request) {
          console.log('Error', error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log('Error', error.config);
        return error;
      });
};

export const isLoggedIn = () => {
  const user = getUser();
  const loginBool = _.get(user, 'userid', '').length >= 1;
  return loginBool.toString();
}


export const logout = callback => {
  setUser({});
  callback();
}