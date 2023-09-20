import request from './request';

export default function registerInterceptors() {
  // Add a request interceptor
  request.interceptors.request.use(
    function (config) {
      const header = config.headers;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  request.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log('error:', error);
      if (error.response) {
        const message =
          error.response.data.status_message || 'Some error occured, please try after sometime.';

        console.warn('message:', message);
      }

      return Promise.reject(error);
    },
  );
}
