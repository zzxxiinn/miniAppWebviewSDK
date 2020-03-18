class NativeAppSDK {
  static sdk_name = 'nativeApp';

  static onload(cb) {
    try {
      // 尝试检查是否有 安卓约定好的方法，或者定义与 ios 约定好的方法
    } catch (error) {
      // err
    }

    cb(NativeAppSDK)
  }

  static isThisSDK() {
    let userAgent = window.navigator.userAgent;

    // 通过 webview 的 userAgent 判断是否为 App 环境
    return userAgent.indexOf('xxx') > -1
  }

  /**
   * 请求支付
   */
  static requestPayment() {
   // 自定义的 payment 方法
  }

  // static requestImage(name, phone) {
  //   if (!phone) { // 如果当前版本带换正装（或其他），只传递一个 JSON 形式的 str 参数
  //     window.payment.requestImage(name)
  //   } else { // 如果是最初的版本，使用两个参数
  //     window.payment.requestImage(name, phone)
  //   }
  // }

  // static resetAppRoute() {
  //   const canResetRoute = !!(window.payment && window.payment.resetAppRoute);
  //   console.log('in NativeAppSdk.js, can reset route: ', canResetRoute);

  //   return canResetRoute ?
  //     window.payment.resetAppRoute() : null
  // }

  static reLaunch() { 
  }

  static onMessage() {
  }

  static hideLoading() {
  }

  static showLoading() {
  }
}


export {
  NativeAppSDK
}