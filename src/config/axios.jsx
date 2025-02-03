import axios from 'axios';

// Crea una url base a backend
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios;