import axios from 'axios';

export const axiosClientPostImage = axios.create({
  baseURL: process.env.VUE_APP_MINIO_URL,
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
  baseURL: process.env.VUE_APP_MINIO_URL,
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
  baseURL: process.env.VUE_APP_MINIO_URL,
  responseType: 'arraybuffer',
});
