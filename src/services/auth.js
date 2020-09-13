import axios from 'axios';

const isBrowser = typeof window !== `undefined`;

export const userLogin = data => {
    console.log('OMG LOGIN INNNSSS');
    if (!isBrowser) return false;
    axios.defaults.port = 6001;
    axios({
        method: 'post',
        url: `https://neonav.net:6001/api/auth/signin`,
        data
    }).then(
        function (response) {
            console.log('RESPONSE SUCESSFUL');
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            return response;
        }
    ).catch(function (error) {
        if (error.response) {
          console.log('RESPONSE ERRORED');
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
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
        return error.response;
      });
};