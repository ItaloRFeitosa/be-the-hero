import axios from 'axios';

const config = require('../config');

const api = axios.create(config.api.staging);

export default api;