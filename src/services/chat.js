import axios from 'axios';
import { isBrowser } from '../utils/checks';
import { getUser, logout } from './auth';
import { formatEnpoint } from '../utils/format';
import { navigate } from 'gatsby';

export const getMessages = () =>
  isBrowser && window.localStorage.getItem('nnMessages')
    ? JSON.parse(window.localStorage.getItem('nnMessages'))
    : [];

export const saveMessages = messages => {
  window.localStorage.setItem('nnMessages', JSON.stringify(messages));
}

export const getChatStore = () =>
  isBrowser && window.localStorage.getItem('nnChatStore')
    ? JSON.parse(window.localStorage.getItem('nnChatStore'))
    : {};

const setChatStore = store => {
  window.localStorage.setItem('nnChatStore', JSON.stringify(store));
}

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

export const seedChannel = (channel, params) => {
  const { since, until, limit } = params;
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
  console.log('Fetching Chat...');
  const fetchResponse = await axios({
      headers: {
        'x-access-token': `${token}`,
        'content-type': 'application/json'
      },
      method: 'get',
      url
  }).then(
    function (response) {
      console.log('fetch complete!');
      console.log('response', response);
      return response;
    }
  ).catch(function (error) {
    console.log('fetch complete!');
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