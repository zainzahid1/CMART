import axios from 'axios'

const instance = axios.create({
    /* baseURL: "https://myburger-fa836.firebaseio.com/" */
    baseURL: "http://localhost/CMart/" ,
})

export default instance;