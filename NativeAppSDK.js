class NativeAppSDK {
  static sdk_name = 'nativeApp';

  static onload(cb) {
    if (!window.payment) {
      try {
        window.payment = {
          requestImage(name, phone) {
            window.webkit.messageHandlers.requestImage.postMessage({ name, phone })
          },
          askWechatRequest(noncestr, partnerid, prepayid, timestamp, sign, appid, _package) {
            let userAgent = window.navigator.userAgent;
            if (userAgent.indexOf('app/leqiApp/ex') > -1) {
              window.webkit.messageHandlers.askWechatRequest.postMessage({
                'noncestr': noncestr,
                'partnerid': partnerid,
                'prepayid': prepayid,
                'timestamp': timestamp,
                'sign': sign,
                'appid': appid,
                'package': _package
              })
              return
            }
            window.webkit.messageHandlers.askWechatRequest.postMessage({
              'noncestr': noncestr,
              'partnerid': partnerid,
              'prepayid': prepayid,
              'timestamp': timestamp,
              'sign': sign
            })
          },
          askAliRequest(orderStr) {
            window.webkit.messageHandlers.askAliRequest.postMessage(orderStr)
          },
          moreOrder() {
            window.webkit.messageHandlers.moreOrder.postMessage(null)
          },
          resetAppRoute() {
            window.webkit.messageHandlers.resetAppRoute.postMessage(null)
          }
        };
      } catch (e) {
        console.log(e)
      }
    }

    cb(NativeAppSDK)
  }

  static isThisSDK() {
    let userAgent = window.navigator.userAgent;

    return userAgent.indexOf('app/leqiApp') > -1
  }

  /**
   * 请求支付
   * @param type: 支付方式 ['wechat', 'alipay']
   * @param param: 支付参数
   */
  static requestPayment(type, param) {

    /**
     *  appid: "wxa097956663e2bc33"
        noncestr: "b679d92d9bca473a8dacfba8aa777f83"
        package: "Sign=WXPay"
        partnerid: "1521227411"
        prepayid: "wx170901416983164c225604c21799737000"
        sign: "533B112A1746DCCA4F3D6B075CF730A7"
        timestamp: 1563354101
     */
    try {
      if (type === 'wechat') {
        let userAgent = window.navigator.userAgent;
        if (userAgent.indexOf('app/leqiApp/ex') > -1) { // more
          window.payment.askWechatRequest(
            param['noncestr'], param['partnerid'], param['prepayid'],
            param['timestamp'], param['sign'], param['appid'], param['package']
          )
        } else {
          window.payment.askWechatRequest(
            param['noncestr'], param['partnerid'], param['prepayid'],
            param['timestamp'], param['sign']
          )
        }
      } else if (type === 'alipay') {
        window.payment.askAliRequest(param['orderStr'])
      }
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * 请求获取下订单的图片
   * @param name
   * @param phone
   */
  static requestImage(name, phone) {
    if (!phone) { // 如果当前版本带换正装（或其他），只传递一个 JSON 形式的 str 参数
      window.payment.requestImage(name)
    } else { // 如果是最初的版本，使用两个参数
      window.payment.requestImage(name, phone)
    }

  }

  static resetAppRoute() {
    const canResetRoute = !!(window.payment && window.payment.resetAppRoute);
    console.log('in NativeAppSdk.js, can reset route: ', canResetRoute);

    return canResetRoute ?
      window.payment.resetAppRoute() : null
  }

  static reLaunch() {
    window.payment.moreOrder()
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