import { store } from '../db/store';
import request from './request';

export default function registerInterceptors() {
  const {
    auth: { session },
  } = store.getState();

  // Add a request interceptor
  request.interceptors.request.use(
    function (config) {
      const header = config.headers;

      let token = session?.token;
      console.log('token:23222', token);
      if (token) {
        header.Authorization = `Bearer ${token}`;
      }

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
