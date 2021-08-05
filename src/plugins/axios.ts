import axios from 'axios';
import { store } from './../store/store';

export const axiosClientPostImage = axios.create({
  baseURL: 'http://localhost:10000/files',
  method: 'post',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   transformRequest: (data, headers) => {
  //     headers.Authorization = 'Bearer ' + store.site.token || '';
  //     return data;
  //   },
});

export const axiosClientGetImage = axios.create({
  baseURL: 'http://localhost:10000/files',
  method: 'get',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   transformRequest: (data, headers) => {
  //     headers.Authorization = 'Bearer ' + store.site.token || '';
  //     return data;
  //   },
});
