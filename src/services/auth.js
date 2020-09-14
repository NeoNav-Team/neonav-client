import axios from 'axios';

const isBrowser = typeof window !== `undefined`;

export const getUser = () =>
  isBrowser() && window.localStorage.getItem('nnUser')
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
        url: `https://neonav.net:6001/api/auth/signin`,
        data
    }).then(
        function (response) {
            console.log('RESPONSE SUCESSFUL');
            console.log('setUser', response);
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