import {loadScript} from './utils'

/**
 * for extend
 */
export class SDK {
  script_load_flag = '';
  script_url = '';
  window_base = {};
  sdk_name = '';

  static onload(cb) {
    if (this.script_url) {
      if (this.script_load_flag) {
        cb();
        console.log(`${this.sdk_name} loaded!`)
      } else {
        loadScript(this.script_url, cb)
      }
    }
  }

  /**
   * 路由跳转
   * @param arg
   */
  static navigateTo(arg) {
    this.window_base.navigateTo(arg)
  }

  /**
   * 重启小程序某个页面
   * @param arg
   */
  static reLaunch(arg) {
    this.window_base.reLaunch(arg)
  }

  /**
   * 重定位到某个页面
   * @param arg
   */
  static redirectTo(arg) {
    this.window_base.redirectTo(arg);
  }

  /**
   * 传递消息给小程序
   * @param arg
   */
  static postMessage(arg) {
    // 销毁、回退、分享
    this.window_base.postMessage(arg);
  }


  // 非共有方法，需要要重写
  static onMessage() {}
  static hideLoading() {}
  static showLoading() {}
}