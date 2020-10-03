// 处理请求的data
import { isPlainObject } from './utils'

export function transformRequest(data: any): any {
  // 如果是普通对象，将其序列化传给服务端
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }

  return data;
}

// 处理响应data:如果是字符串，则将其转成JSON对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
  }

  return data;
}
