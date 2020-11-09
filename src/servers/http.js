import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class httpRequest {

  baseOptions(params, method = "GET") {
    let { url, data } = params;
    const BASE_URL = getBaseUrl();
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'Accept': contentType,
        'content-type': contentType,
        'Authorization': 'Bearer ' + Taro.getStorageSync('Authorization')
      }
    };
    return Taro.request(option);
  }

  uploadOptions(params) {
    let { url, path } = params;
    const BASE_URL = getBaseUrl();
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url,
      filePath: path,
      name: 'file',
      header: {
        'Accept': contentType,
        'content-type': contentType,
        'Authorization': 'Bearer ' + Taro.getStorageSync('Authorization')
      }
    };
    return Taro.uploadFile(option)
  }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }

  upload(url, path) {
    let option = {url, path}
    return this.uploadOptions(option);
  }

}

export default new httpRequest()
