import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export const httpClient = axios.create({
    baseURL: process.env.REACT_APP_BE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const getToken = () => {
    return localStorage.getItem('TOKEN');
};

export const apiUtils = {
    get: (url, query) => {
        const token = getToken();
        return httpClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                ...query
            }
        });
    },
    post: (url, data) => {
        const token = getToken();
        return httpClient.post(url, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    patch: (url, data) => {
        const token = getToken();
        return httpClient.patch(url, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    delete: (uri) => {
        const token = getToken();
        return httpClient.delete(uri, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
};
