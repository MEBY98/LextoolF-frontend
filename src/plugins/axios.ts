import axios from 'axios';
import { store } from './../store/store';

// export const axiosClient = axios.create({
//   baseURL: 'http://localhost:5000',
//   method: 'post',
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
//   transformRequest: (data, headers) => {
//     headers.Authorization = 'Bearer ' + store.site.token || '';
//     return data;
//   },
// });
