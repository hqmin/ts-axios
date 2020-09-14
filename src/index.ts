// 项目入口文件
import { AxiosRequestConfig } from './types/type'
import { xhr } from './xhr';

function axios(config: AxiosRequestConfig): void {
  xhr(config);
}

export default axios;
