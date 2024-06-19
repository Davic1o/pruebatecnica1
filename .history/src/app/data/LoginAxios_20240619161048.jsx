import axios from 'axios';
import { BASE_URL } from './BaseUrl';

const Compras = {


  crearCompraCompleta: (data) => {
    return axios.post(`${BASE_URL}login/`, data);
  },

  // Puedes agregar más funciones según sea necesario
};

export default Compras;


