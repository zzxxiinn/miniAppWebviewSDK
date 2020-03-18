import {SDK as Base} from './SDK'

class WechatSDK extends Base {
  static sdk_name = 'wechat';
  static window_base = {};
  static script_load_flag = false;
  static script_url = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js';

  static onload(cb) {
    super.onload(() => {
      this.window_base = window.wx.miniProgram;
      this.script_load_flag = !!window.wx;
      cb(WechatSDK)
    })
  }

  static isThisSDK() {
    let userAgent = window.navigator.userAgent;

    return (window['__wxjs_environment'] === 'miniprogram'
      || /microMessenger/i.test(userAgent))&&!window['__qqjs_environment']
  }

  static postMessage(arg) {
    super.postMessage({data: arg})
  }
}

export {
  WechatSDK
}