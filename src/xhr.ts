// 处理AJAX请求逻辑
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/type'
import { parseHeaders } from './helpers/headers'

export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const {method = 'get', url, data = null, headers, responseType} = config;

    let request = new XMLHttpRequest();

    // 设置响应数据的类型
    if (responseType) {
      request.responseType = responseType;
    }

    // 初始化请求
    request.open(method.toUpperCase(), url, true);

    // 只要 readyState 属性发生变化，就会调用相应的处理函数
    request.onreadystatechange = function () {
      // readyState为4代表请求已经完成或失败
      if (request.readyState !== 4) {
        return
      }

      // 获取响应头
      let responseHeaders = parseHeaders(request.getAllResponseHeaders());
      // 获取响应数据(根据设置的responseType决定获取的方式)
      let responseData = request.responseType !== 'text' ? request.response : request.responseText;
      // 响应对象
      let response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      resolve(response);
    };

    // 处理headers
    Object.keys(headers).forEach(key => {
      // 如果data为null,设置content-type就没有必要
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key];
      } else {
        request.setRequestHeader(key, headers[key]);
      }
    });

    // 发送http请求
    request.send(data);
  });
}
