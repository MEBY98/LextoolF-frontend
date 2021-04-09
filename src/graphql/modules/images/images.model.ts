import { axiosClient } from './../../../plugins/axios';

export class ImageModel {
  static uploadOne(path, file) {
    let formData = new FormData();
    formData.append('image', file);
    return axiosClient.post(`images/upload/one/${path}`, formData);
  }
  static uploadMultiple() {
    console.log('uploadMultiple');
  }
}
