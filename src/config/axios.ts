import { readToken } from '@app/services/localStorage.service';
import { message } from 'antd';
import axios from 'axios';

function createAxios() {
  const axiosInstant = axios.create({});

  axiosInstant.interceptors.request.use(
    async (config) => {
      config.baseURL = 'http://139.180.195.102:8080';
      axiosInstant.defaults.timeout = 20000;
      config.headers.Authorization = `Bearer ${readToken()}`;
      config.headers['Access-Control-Allow-Credentials'] = true;
      config.headers['Content-Type'] = 'application/json';
      config.headers['Referrer-Policy'] = 'no-referrer';

      return config;
    },
    (error) => Promise.reject(error),
  );
  axiosInstant.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const responseUR = error.request.responseURL === 'http://139.180.195.102:8080/api/Login/Login';
      if (responseUR) {
        message.error('Tài khoản hoặc mật khẩu không chính xác');
      } else if (error.response && error.response.status === 401) {
        window.location.pathname = '/login';
      }
    },
  );
  return axiosInstant;
}

export const axiosClient = createAxios();

export default axiosClient;
