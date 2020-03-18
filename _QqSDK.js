import {SDK as Base} from './SDK'

class QqSDK extends Base {
  static sdk_name = 'qq';
  static window_base = {};
  static script_load_flag = false;
  static script_url = 'https://qqq.gtimg.cn/miniprogram/webview_jssdk/qqjssdk-1.0.0.js';

  static onload(cb) {
    super.onload(() => {
      this.window_base = window.qq.miniProgram;
      this.script_load_flag = !!window.qq;
      cb(QqSDK)
    })
  }
  
  static isThisSDK() {
    let userAgent = window.navigator.userAgent;
    return window['__qqjs_environment'] === 'miniprogram'|| /qq.+miniprogram/i.test(userAgent) //sdk本身问题没有解决异步判断当时前环境只能这么解决
  }

  static postMessage(arg) {
    super.postMessage({data: arg})
  }
}

export {
    QqSDK
}