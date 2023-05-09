import axios from 'axios';

// const baseUrl = 'http://localhost:5000/'
const baseUrl = 'https://lyrics-backend.onrender.com/'

const instance = axios.create({
    baseURL:baseUrl,
    headers:{
        'Content-Type': 'application/json'
    }
})

export default instance;