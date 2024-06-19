import axios from 'axios';

const BASE_URL = 'https://test.create.diagnal.com';

export const fetchPageData = (page) => {
    return axios.get(`${BASE_URL}/data/page${page}.json`);
};

export const fetchImage = (imageName) => {
    return `${BASE_URL}/images/${imageName}`;
};
