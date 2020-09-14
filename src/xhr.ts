// 处理AJAX请求逻辑
import { AxiosRequestConfig } from './types/type'

export function xhr(config: AxiosRequestConfig) {
  const {method = 'get', url, data = null} = config;

  let request = new XMLHttpRequest();

  // 初始化请求
  request.open(method.toUpperCase(), url, true);

  // 发送http请求
  request.send(data);
}
