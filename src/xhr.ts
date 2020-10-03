// 处理AJAX请求逻辑
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/type'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {method = 'get', url, data = null,
      headers, responseType, timeout} = config;

    let request = new XMLHttpRequest();

    // 设置响应数据的类型
    if (responseType) {
      request.responseType = responseType;
    }

    // 设置请求超时时间
    if (timeout) {
      request.timeout = timeout;
    }

    // 初始化请求
    request.open(method.toUpperCase(), url, true);

    // 只要 readyState 属性发生变化，就会调用相应的处理函数
    request.onreadystatechange = function () {
      // readyState为4代表请求已经完成或失败
      if (request.readyState !== 4) {
        return
      }

      // 请求完成前或请求出错，status的值是0
      if (request.status === 0) {
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

      handleResponse(response);
    };

    // 当请求遇到错误时,例如网络异常，将触发error事件
    request.onerror = function handleError() {
      reject(createError('Network Error!', config, null, request));
    };

    // 当请求超时，会触发timeout事件
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded.`, config, 'ECONNABORTED', request));
    };

    // 对于一个正常的请求，往往会返回 200-300 之间的 HTTP 状态码，对于不在这个区间的状态码，
    // 我们也把它们认为是一种错误的情况做处理
    function handleResponse(res: AxiosResponse): void {
      if (res.status >= 200 && res.status < 300) {
        resolve(res);
      } else {
        reject(createError(`Request failed with status code ${res.status}`, config, null, request, res));
      }
    }

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
