// 项目入口文件
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/type'
import { xhr } from './xhr';
import { buildURL } from './helpers/url'
import {transformRequest, transformResponse} from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
}

// 处理请求的config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

// 处理请求的url
function transformURL(config: AxiosRequestConfig): string {
  const {url, params} = config;
  return buildURL(url, params);
}

// 处理请求的data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

// 处理headers
function transformHeaders(config: AxiosRequestConfig): any {
  // 因为headers是可选的，如果不传默认给一个空对象，因为processHeaders有个非空判断
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res;
}

export default axios;
