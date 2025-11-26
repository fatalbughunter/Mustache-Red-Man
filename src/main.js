import Vue from 'vue';
import VueMeta from 'vue-meta';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/css/global.css';

Vue.use(VueMeta);

Vue.config.productionTip = false;

// Set axios base URL with fallback
const backendUrl = process.env.VUE_APP_BACKEND_URL || 'https://api.novacasino.bet';
axios.defaults.baseURL = backendUrl;
console.log('Backend URL:', backendUrl);

// Add request interceptor for debugging
axios.interceptors.request.use(
    config => {
        if (process.env.NODE_ENV === 'development') {
            console.log('API Request:', config.method?.toUpperCase(), config.url);
        }
        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            // Server responded with error status
            if (process.env.NODE_ENV === 'development') {
                console.error('API Error Response:', error.response.status, error.response.data);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('API Connection Error: No response from server. Please check:', backendUrl);
            console.error('Error details:', error.message);
        } else {
            // Something else happened
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

const token = localStorage.getItem('token');
if (token !== undefined && token !== null) {
    axios.defaults.headers.common['x-auth-token'] = token;
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
