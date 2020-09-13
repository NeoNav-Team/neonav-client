import axios from 'axios';

const isBrowser = typeof window !== `undefined`;

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
            return response;
        }
    ).catch(function (error) {
        if (error.response) {
          console.log('RESPONSE ERRORED');
          console.log(error.response);
          return error.response;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        return error;
      });
};