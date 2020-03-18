import {SDK as Base} from './SDK'

class BaiduSDK extends Base{
  static sdk_name = 'baidu';
  static window_base = {};
  static script_load_flag = false;
  static script_url = 'https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-2.0.4.js';

  static onload(cb) {
    super.onload(() => {
      this.window_base = window.swan.webView;
      this.script_load_flag = !!window.swan;
      cb(BaiduSDK)
    })
  }

  static isThisSDK() {
    let userAgent = window.navigator.userAgent;

    return !!window['__swanjs_environment']
      || /baidu/i.test(userAgent)
      || /swan/.test(userAgent)
  }

  static postMessage(arg) {
    super.postMessage({data: arg})
  }
}

export {
  BaiduSDK
}