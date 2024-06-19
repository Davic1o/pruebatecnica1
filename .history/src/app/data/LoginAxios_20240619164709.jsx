import axios from 'axios';
import { BASE_URL } from './BaseUrl'; 

const LoginAxios = {
  InicioSession: (data) => {
    return axios.post(`${BASE_URL}login/`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
};

export default LoginAxios;
