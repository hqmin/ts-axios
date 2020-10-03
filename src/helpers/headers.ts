// 处理请求headers：当我们把数据发送到服务端，需要设置正确的content-type,这样服务端才能正确解析我们发送的数据
import { isPlainObject } from './utils'

// 将传入的headers转成规范的格式
function normalizeHeaders(headers: any, normalizeString: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(key => {
    if (key !== normalizeString && key.toUpperCase() === normalizeString.toUpperCase()) {
      headers[normalizeString] = headers[key];
      delete headers[key];
    }
  });
}

export function processHeaders(headers: any, data: any): any {
  // 规范化content-type
  normalizeHeaders(headers, 'Content-Type');
  // 如果data是普通对象，则要将content-type设置为application/json;charset=utf-8
  if (isPlainObject(data)) {
    // 如果没有设置默认的content-type
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  return headers;
}

// 将返回的响应头转换成对象形式
export function parseHeaders(headers: string): any {
  let parseObj = Object.create(null);

  if (!headers) {
    return parseObj;
  }
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':');
    key = key.trim().toLowerCase(); // 将属性名去除前后空格并转成小写
    if (!key) {
      return
    }
    parseObj[key] = value.trim();
  });

  return parseObj;
}
