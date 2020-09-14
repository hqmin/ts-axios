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
  params?: any
}
