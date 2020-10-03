// 类型声明文件

// 为了让method只能传特定的类型，所以可以使用字符串字面量的形式进行约束
export type Method = 'get' | 'GET'
| 'post' | 'POST'
| 'delete' | 'DELETE'
| 'put' | 'PUT'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'patch' | 'PATCH';

export interface AxiosRequestConfig {
  method?: Method
  url: string
  data?: any
  params?: any,
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number
}

// 客户端接收到的响应数据类型
export interface AxiosResponse {
  data: any // 返回的数据
  status: number // http状态码
  statusText: string // 状态消息
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置对象
  request: any // 请求的XML对象实例
}

// 定义axios函数返回的对象类型，是一个promise对象
export interface AxiosPromise extends Promise<AxiosResponse>{

}

// 定义axios错误信息返回的对象类型
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
}
