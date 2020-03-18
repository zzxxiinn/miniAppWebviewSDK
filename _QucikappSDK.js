export class QuicappSDK {
  static window_base = {};
  static sdk_name = 'quickapp';

  static onload(cb) {
    this.window_base = window.system;
    console.log('is hap');
    cb(QuicappSDK)
  }

  static isThisSDK() {
    let userAgent = window.navigator.userAgent;
    return userAgent.indexOf('hap/') > -1
  }

  static onMessage(cb) {
    this.window_base.onmessage = cb;
  }

  static hideLoading() {}
  static showLoading() {}

  static postMessage(arg) {
    arg = JSON.stringify(arg);
    this.window_base.postMessage(arg)
  }
}