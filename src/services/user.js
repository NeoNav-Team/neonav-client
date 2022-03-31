import { formatEnpoint } from '../utils/format';
import _ from 'lodash';
import { isBrowser } from '../utils/checks';
import { getUser } from './auth';
import { apis } from '../constants/apis';
import axios from 'axios';

const { port } = _.get(apis, 'url', '');

export const userProfile = () => {
    if (!isBrowser) return false;
    axios.defaults.port = port;
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
  axios.defaults.port = port;
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


export const getFriends = () => {
  if (!isBrowser) return false;
  axios.defaults.port = port;
  const url = formatEnpoint('friends');
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

export const makeFriend = friend => {
  if (!isBrowser) return false;
  axios.defaults.port = port;
  const url = formatEnpoint('friends') + `/${friend}`;
  const nnUser = getUser();
  const token = nnUser.accessToken;
  return axios({
      headers: {
        'x-access-token': `${token}`,
        'content-type': 'application/json'
      },
      method: 'post',
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

export const dropFriend = friend => {
  if (!isBrowser) return false;
  axios.defaults.port = port;
  const url = formatEnpoint('friends') + `/${friend}`;
  const nnUser = getUser();
  const token = nnUser.accessToken;
  return axios({
      headers: {
        'x-access-token': `${token}`,
        'content-type': 'application/json'
      },
      method: 'delete',
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



export const fakeName = () => {
  if (!isBrowser) return false;
  axios.defaults.port = port;
  const url = formatEnpoint('fakename');
  return axios({
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