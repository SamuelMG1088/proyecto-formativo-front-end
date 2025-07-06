import axios from 'axios';


const conexionAxios = axios.create({
    baseURL: '',
    withCredentials: true,
});


export default conexionAxios;