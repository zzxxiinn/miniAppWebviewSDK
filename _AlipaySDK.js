import {SDK as Base} from './SDK'

class AlipaySDK extends Base{
  static sdk_name = 'alipay';
  static window_base = {};
  static script_load_flag = false;
  static script_url = 'https://appx/web-view.min.js';

  static onload(cb) {
    super.onload(() => {
      this.window_base = window.my;
      this.script_load_flag = !!window.my;
      cb(AlipaySDK)
    })
  }

  static isThisSDK() {
    let userAgent = window.navigator.userAgent;

    return userAgent.indexOf('Alipay') > -1
  }

  /**
   * 监听小程序向网页传消息
   * @param cb
   */
  static onMessage(cb) {
    // null
      this.window_base.onMessage = cb;
  }

  static hideLoading() {
    this.window_base.hideLoading()
  }

  static showLoading() {
    this.window_base.showLoading()
  }
}

export {
  AlipaySDK
}