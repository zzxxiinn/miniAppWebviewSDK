import { WechatSDK } from './_WechatSDK'
import { AlipaySDK } from './_AlipaySDK'
import { BaiduSDK } from "./_BaiduSDK"
import { NativeAppSDK } from './NativeAppSDK'
import { QuicappSDK } from './_QucikappSDK'
import { QqSDK } from './_QqSDK'

let SDK_list = [
  WechatSDK,
  AlipaySDK,
  BaiduSDK,
  NativeAppSDK,
  QuicappSDK,
  QqSDK
];

class UnionSDK {
  static _currSDK = null;

  static get currSDK() {
    if (!this._currSDK)
      for (let sdk of SDK_list) {
        if (sdk.isThisSDK()) {
          this._currSDK = sdk; break;
        }
      }

    return this._currSDK;
  }

  /**
   * load sdk for curr env
   * @param cb callback
   */
  static onload(cb) {
    (!!this.currSDK)
      ? this.currSDK.onload(cb)
      : console.log('env err! no sdk loaded')
  }


  /**
   * post 消息并跳转 deck 页面
   * @param {Object} params - postMessage 的参数
   * @param {string} deckName - 跳转的页面名称，除了支付宝小程序用不到，
   *    微信、百度等小程序得跳转页面获取 postMessage 传输的数据
   * @param {Object} sdk - 当前的 sdk 回调
   */
  static postMessage({ params, deckName = '/pages/print-web-deck/print-web-deck' }) {
    const sdk = this.currSDK;
    if (sdk.sdk_name === 'nativeApp') return;

    sdk.postMessage(params);
    !!(sdk.showLoading) && sdk.showLoading();

    if ((sdk.sdk_name !== 'alipay' && sdk.sdk_name !== 'quickapp'))
      sdk.redirectTo({ url: deckName });
  }


  static onMessage(cb) {
    const sdk = this.currSDK;
    if (!sdk) return;
    sdk.onMessage((e) => {
      cb(e); sdk.hideLoading();
    });
  }
}

export {
  UnionSDK
}