import axios from 'axios';

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

export const axiosClientFiles = axios.create({
  baseURL: 'http://localhost:10000/files',
  responseType: 'arraybuffer',
});
