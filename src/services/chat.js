import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { isBrowser } from '../utils/checks';
import { getUser, logout } from './auth';
import { formatEnpoint } from '../utils/format';
import { navigate } from 'gatsby';

export const getMessages = () =>
  isBrowser && window.localStorage.getItem('nnMessages')
    ? JSON.parse(window.localStorage.getItem('nnMessages'))
    : [];

export const setChatLocalStorage = messages => {
  window.localStorage.setItem('nnMessages', JSON.stringify(messages));
}

export const getChatLocalStorage = () =>
  isBrowser && window.localStorage.getItem('nnChatStore')
    ? JSON.parse(window.localStorage.getItem('nnChatStore'))
    : {};

export const orderMessagesbyTimestamp = (messages, dir) => {
  const direction = dir || 'asc';
  const orderedMessages = _.orderBy(messages, (o) => {
    return moment(o.ts);
  }, [direction]);
  return orderedMessages;
}

export const getChatChannels = () => {
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

export const seedChannel = (channel, params) => {
  // const { since, until, limit } = params;
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const url = formatEnpoint('channels') + `/${channel}/history`;
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

export const pollChatter = async (showMessage, sinceMarker) => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const WAIT_TIME = 3000;
  const since = sinceMarker || 'now';
  const url = formatEnpoint('channels') + `/all?since=${since}`;
  const nnUser = getUser();
  const token = nnUser.accessToken;
  const fetchResponse = await axios({
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
  if (typeof fetchResponse !== 'undefined' && (
      fetchResponse.status === 403 ||
      fetchResponse.status === 401
  )) {
    logout(() => {
      navigate('/login#invalidToken');
    });
    return fetchResponse;
  } else if (typeof fetchResponse !== 'undefined' && fetchResponse.status === 502) {
    await pollChatter(showMessage, sinceMarker);
  } else if (typeof fetchResponse !== 'undefined' && fetchResponse.status !== 200) {
    // An error - let's show it
    showMessage(fetchResponse);
    // Reconnect
    await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
    await pollChatter(showMessage, sinceMarker);
  } else {
    // Get and show the message
    let message = await fetchResponse;
    showMessage(message.data);
    // Call pollChatter() again to get the next message
    await pollChatter(showMessage, message.data[0]);
  }
};


export const postMessage = (channel, data) => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const url = formatEnpoint('channels') + `/${channel}`;
  const nnUser = getUser();
  const token = nnUser.accessToken;
  return axios({
      headers: {
        'x-access-token': `${token}`,
        'content-type': 'application/json'
      },
      method: 'post',
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

export const createChannel = (data) => {
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
      method: 'post',
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

export const getChannelUsers = (channel, data) => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const url = formatEnpoint('channels') + `/${channel}/users`;
  const nnUser = getUser();
  const token = nnUser.accessToken;
  return axios({
      headers: {
        'x-access-token': `${token}`,
        'content-type': 'application/json'
      },
      method: 'get',
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

export const addUserToChannel = (channel, user, data) => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const url = formatEnpoint('channels') + `/${channel}/${user}`;
  const nnUser = getUser();
  const token = nnUser.accessToken;
  return axios({
      headers: {
        'x-access-token': `${token}`,
        'content-type': 'application/json'
      },
      method: 'post',
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

export const removeUserToChannel = (channel, user, data) => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const url = formatEnpoint('channels') + `/${channel}/${user}`;
  const nnUser = getUser();
  const token = nnUser.accessToken;
  return axios({
      headers: {
        'x-access-token': `${token}`,
        'content-type': 'application/json'
      },
      method: 'delete',
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

export const changeAdminToChannel = (channel, user, data) => {
  if (!isBrowser) return false;
  axios.defaults.port = 6001;
  const url = formatEnpoint('channels') + `/${channel}/${user}`;
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