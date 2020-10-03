// 用于处理URL相关的处理函数
import { isDate, isPlainObject } from './utils'

// 对params参数进行URI组件编码:对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode,我们会把空格 转换成 +
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function buildURL(url: string, params?: any): string {
  // 如果不传params，原样返回url
  if (!params) {
    return url;
  }

  let parts: string[] = [];
  // 如果传params，则判断其类型
  Object.keys(params).forEach(key => {
    // ①如果值是null或undefined，则忽略不拼接
    let value = params[key];
    if (typeof value === 'undefined' || value === null) {
      return
    }

    let values: string[];
    // ②如果值是数组,例如{ foo: [hqm, age] },则以`foo[]=hqm&foo[]=age`的形式拼接到url后面
    if (Array.isArray(value)) {
      values = value;
      key += '[]';
    } else {
      values = [value];
    }
    values.forEach(val => {
      // ③如果是日期对象，则对它执行toISOString
      if (isDate(val)) {
        val = val.toISOString();
      } else if (isPlainObject(val)) {
        // ④如果是对象，则将其序列化
        val = JSON.stringify(val);
      }
      parts.push(`${encode(key)}=${encode(val)}`);
    });
  });

  let seriesParams: string = parts.join('&');
  if (seriesParams) {
    // 丢弃 url 中的哈希标记
    let markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    // 如果url原先就有参数直接用&拼接，原先没有就用?拼接
    url += (url.indexOf('?') === -1 ? '?' : '&') + seriesParams;
  }

  return url;
}
