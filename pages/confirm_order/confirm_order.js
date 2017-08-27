// confirm_order.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carts: null,
    totalFreight: 0,
    cartsPrice: 0,
    totalPrice: 0,
    isFromCart: false,
    showOther: true,
    showHint: false,
    ip: '',
    owner: '',
    phone: '',
    remark: '',
    address: '',
    invoiceType: -1,
    invoice: ''
  },
  onUnload: function () {
    console.log("order onUnload");
    app.invoice = null;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.dir(options);
    var that = this;
    wx.request({
      url: 'http://jsonip.com',
      success: function (e) {
        console.log(e.data.ip)
        that.setData({
          ip: e.data.ip
        })
      }
    })
    var isFromCart = options.isFromCart === "true";
    var carts = app.buyCarts;
    console.dir(carts);
    var totalFreight = 0;
    var cartsPrice = 0;
    var totalPrice = 0;
    for (var i = 0; i < carts.length; i++) {
      var cart = carts[i];
      cartsPrice += parseFloat(cart.price) * parseInt(cart.count);
    }
    totalPrice = cartsPrice + totalFreight;
    this.setData({
      isFromCart: isFromCart,
      carts: carts,
      totalFreight: totalFreight,
      cartsPrice: cartsPrice,
      totalPrice: totalPrice,
    })
  },
  onShow: function() {
    console.log("onShow");
    if (app.invoice) {
        var invoiceType = app.invoice.type;
        var invoice = '不需要';
        if(invoiceType == 0) {
          invoice = '个人发票';
        } else if(invoiceType == 1) {
          invoice = '企业发票';
        }
        this.setData({
          invoiceType: invoiceType,
          invoice: invoice
        });
    }
  },
  onPhoneInput: function(e){
      this.setData({
        phone: e.detail.value
      })
  },
  onOwnerInput: function(e){
      this.setData({
        owner: e.detail.value
      })
  },
  showHint: function(){
    this.setData({
      showOther: false,
      showHint: true
    })
  }, 
  onInput: function (e) {
    var value = e.detail.value;
    value = parseInt(value);
    if (!value || isNaN(value) || typeof value !== 'number') {
      value = 1;
    }
    if ((value + "").length > 3) {
      value = parseInt((value + "").substring(0, 3));
    }
    var cart = this.data.carts[0];
    if (!cart) {
      return;
    }
    cart.count = value;
    var cartsPrice = value * cart.price;
    var totalPrice = cartsPrice + this.data.totalFreight;

    this.setData({
      carts: this.data.carts,
      cartsPrice: cartsPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    })
  },
  minus: function () {
    var cart = this.data.carts[0];
    if (!cart) {
      return;
    }
    cart.count -= 1;
    var cartsPrice = this.data.cartsPrice;
    cartsPrice -= cart.price;
    var totalPrice = cartsPrice + this.data.totalFreight;

    this.setData({
      carts: this.data.carts,
      cartsPrice: cartsPrice,
      totalPrice: totalPrice,
    })
  },
  plus: function () {
    var cart = this.data.carts[0];
    if (!cart) {
      return;
    }
    cart.count += 1;
    var cartsPrice = parseFloat(this.data.cartsPrice);
    cartsPrice += parseFloat(cart.price);
    var totalFreight = parseFloat(this.data.totalFreight)
    var totalPrice = cartsPrice + totalFreight;

    this.setData({
      carts: this.data.carts,
      cartsPrice: cartsPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    })
  },
  randomString: function (length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
  },
  pad: function (number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  },
  trade: function () {
    var date = new Date();
    var yyyy = date.getFullYear().toString();
    var MM = this.pad(date.getMonth() + 1, 2);
    var dd = this.pad(date.getDate(), 2);
    var hh = this.pad(date.getHours(), 2);
    var mm = this.pad(date.getMinutes(), 2);
    var ss = this.pad(date.getSeconds(), 2);
    var SSS = this.pad(date.getMilliseconds(), 3);
    return yyyy + MM + dd + hh + mm + ss + SSS;
  },
  MD5: function (s) {
    function L(k, d) { return (k << d) | (k >>> (32 - d)) } function K(G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) { return (x ^ 2147483648 ^ F ^ H) } if (I | d) { if (x & 1073741824) { return (x ^ 3221225472 ^ F ^ H) } else { return (x ^ 1073741824 ^ F ^ H) } } else { return (x ^ F ^ H) } } function r(d, F, k) { return (d & F) | ((~d) & k) } function q(d, F, k) { return (d & k) | (F & (~k)) } function p(d, F, k) { return (d ^ F ^ k) } function n(d, F, k) { return (F ^ (d | (~k))) } function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F) } function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F) } function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F) } function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F) } function e(G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++ } Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa } function B(x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) { G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16); k = k + F.substr(F.length - 2, 2) } return k } function J(k) { k = k.replace(/rn/g, "n"); var d = ""; for (var F = 0; F < k.length; F++) { var x = k.charCodeAt(F); if (x < 128) { d += String.fromCharCode(x) } else { if ((x > 127) && (x < 2048)) { d += String.fromCharCode((x >> 6) | 192); d += String.fromCharCode((x & 63) | 128) } else { d += String.fromCharCode((x >> 12) | 224); d += String.fromCharCode(((x >> 6) & 63) | 128); d += String.fromCharCode((x & 63) | 128) } } } return d } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) { h = Y; E = X; v = W; g = V; Y = u(Y, X, W, V, C[P + 0], S, 3614090360); V = u(V, Y, X, W, C[P + 1], Q, 3905402710); W = u(W, V, Y, X, C[P + 2], N, 606105819); X = u(X, W, V, Y, C[P + 3], M, 3250441966); Y = u(Y, X, W, V, C[P + 4], S, 4118548399); V = u(V, Y, X, W, C[P + 5], Q, 1200080426); W = u(W, V, Y, X, C[P + 6], N, 2821735955); X = u(X, W, V, Y, C[P + 7], M, 4249261313); Y = u(Y, X, W, V, C[P + 8], S, 1770035416); V = u(V, Y, X, W, C[P + 9], Q, 2336552879); W = u(W, V, Y, X, C[P + 10], N, 4294925233); X = u(X, W, V, Y, C[P + 11], M, 2304563134); Y = u(Y, X, W, V, C[P + 12], S, 1804603682); V = u(V, Y, X, W, C[P + 13], Q, 4254626195); W = u(W, V, Y, X, C[P + 14], N, 2792965006); X = u(X, W, V, Y, C[P + 15], M, 1236535329); Y = f(Y, X, W, V, C[P + 1], A, 4129170786); V = f(V, Y, X, W, C[P + 6], z, 3225465664); W = f(W, V, Y, X, C[P + 11], y, 643717713); X = f(X, W, V, Y, C[P + 0], w, 3921069994); Y = f(Y, X, W, V, C[P + 5], A, 3593408605); V = f(V, Y, X, W, C[P + 10], z, 38016083); W = f(W, V, Y, X, C[P + 15], y, 3634488961); X = f(X, W, V, Y, C[P + 4], w, 3889429448); Y = f(Y, X, W, V, C[P + 9], A, 568446438); V = f(V, Y, X, W, C[P + 14], z, 3275163606); W = f(W, V, Y, X, C[P + 3], y, 4107603335); X = f(X, W, V, Y, C[P + 8], w, 1163531501); Y = f(Y, X, W, V, C[P + 13], A, 2850285829); V = f(V, Y, X, W, C[P + 2], z, 4243563512); W = f(W, V, Y, X, C[P + 7], y, 1735328473); X = f(X, W, V, Y, C[P + 12], w, 2368359562); Y = D(Y, X, W, V, C[P + 5], o, 4294588738); V = D(V, Y, X, W, C[P + 8], m, 2272392833); W = D(W, V, Y, X, C[P + 11], l, 1839030562); X = D(X, W, V, Y, C[P + 14], j, 4259657740); Y = D(Y, X, W, V, C[P + 1], o, 2763975236); V = D(V, Y, X, W, C[P + 4], m, 1272893353); W = D(W, V, Y, X, C[P + 7], l, 4139469664); X = D(X, W, V, Y, C[P + 10], j, 3200236656); Y = D(Y, X, W, V, C[P + 13], o, 681279174); V = D(V, Y, X, W, C[P + 0], m, 3936430074); W = D(W, V, Y, X, C[P + 3], l, 3572445317); X = D(X, W, V, Y, C[P + 6], j, 76029189); Y = D(Y, X, W, V, C[P + 9], o, 3654602809); V = D(V, Y, X, W, C[P + 12], m, 3873151461); W = D(W, V, Y, X, C[P + 15], l, 530742520); X = D(X, W, V, Y, C[P + 2], j, 3299628645); Y = t(Y, X, W, V, C[P + 0], U, 4096336452); V = t(V, Y, X, W, C[P + 7], T, 1126891415); W = t(W, V, Y, X, C[P + 14], R, 2878612391); X = t(X, W, V, Y, C[P + 5], O, 4237533241); Y = t(Y, X, W, V, C[P + 12], U, 1700485571); V = t(V, Y, X, W, C[P + 3], T, 2399980690); W = t(W, V, Y, X, C[P + 10], R, 4293915773); X = t(X, W, V, Y, C[P + 1], O, 2240044497); Y = t(Y, X, W, V, C[P + 8], U, 1873313359); V = t(V, Y, X, W, C[P + 15], T, 4264355552); W = t(W, V, Y, X, C[P + 6], R, 2734768916); X = t(X, W, V, Y, C[P + 13], O, 1309151649); Y = t(Y, X, W, V, C[P + 4], U, 4149444226); V = t(V, Y, X, W, C[P + 11], T, 3174756917); W = t(W, V, Y, X, C[P + 2], R, 718787259); X = t(X, W, V, Y, C[P + 9], O, 3951481745); Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g) } var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase()
  },
  //弹出框让用户授权访问用户信息
  showSetting: function () {
    var that = this;
    wx.getSetting({
      success: function (e) {
        console.log("getSetting!");
        console.dir(e);
        if (e.authSetting && !e.authSetting['scope.address']) {
          console.log("用户拒绝访问用户权限");
          wx.showModal({
            title: '未授权访问通讯地址',
            showCancel: false,
            confirmText: '去设置',
            success: function (e) {
              if (e.confirm) {
                wx.openSetting({
                  success: function (e) {
                    if (e.authSetting && !e.authSetting['scope.address']) {
                      that.showSetting();
                    } else if (e.authSetting && e.authSetting['scope.address']) {
                      //允许访问通讯地址
                      wx.chooseAddress({
                        success: function(e) {
                          var address = e.provinceName + e.cityName + e.countyName + e.detailInfo;
                          that.setData({
                            address: address
                          });
                        }
                      })
                    }
                  }
                })
              }
            }
          });
        }
      }
    })
  },
  chooseAddress: function(e){
    var that = this;
    console.dir(e);
    wx.chooseAddress({
      success(e) {
        console.dir(e);
        var address = e.provinceName + e.cityName + e.countyName + e.detailInfo;
        console.log(address);
        that.setData({
          address: address
        });
      },
      fail: function(e) {
        that.showSetting();
      }
    })
  },
  setInvoice: function(e) {
    wx.navigateTo({
      url: '/pages/invoice/invoice',
    })
  },
  toBuy: function () {
    var notice;
    if(!this.data.owner){
      notice = '请输入收件人姓名';
    } else if (!this.data.phone) {
      notice = '请输入联系电话';
    } else if (! /^1[34578]{1}\d{9}$/.test(this.data.phone)) {
      notice = '手机号格式错误';
    } else if (!this.data.address) {
      notice = '请输入收货地址';
    }
    if(notice) {
      wx.showToast({
        title: notice,
      });
      return;
    }

    var invoice = app.invoice || {};
    var username = null;
    if (this.data.invoiceType == 0) {
        username = this.data.owner;
    }
    invoice.username = username;
    console.dir(invoice);

    var requestData = {
      "openid": app.globalData.userInfo.openid,
      "invoice": invoice,//发票信息
      "owner": this.data.owner,
      "phone": this.data.phone,
      "address": this.data.address,
      "remark": this.data.remark,
      "distribution": "顺丰快递",//配送方式
      "total_freight": 0,//邮费
      "cart_price": this.data.cartsPrice,//订单总价
      "total_preferential": 0,//优惠价格
      "total_price": this.data.totalPrice,//支付价格
      "products": this.data.carts
    };
    console.dir(requestData);
    // var that = this;
    // var appid = 'wxae6424dbbecd71b7';
    // var body = 'body';
    // var mch_id = '1447295702';
    // var nonce_str = this.randomString(32, '#aA');
    // var notify_url = 'http://mybgi.genomics.cn/main.jsp';
    // var openid = app.globalData.userInfo.openid;
    // var out_trade_no = this.trade();//生成订单号
    // var spbill_create_ip = this.data.ip;
    // var total_fee = this.data.totalPrice * 100;
    // var trade_type = 'JSAPI';
    // var stringA = 'appid=' + appid + '&body=' + body + '&mch_id=' + mch_id + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + openid + '&out_trade_no=' + out_trade_no + '&spbill_create_ip=' + spbill_create_ip + '&total_fee=' + total_fee + '&trade_type=' + trade_type;
    // console.log('stringA = ' + stringA);
    // var stringSignTemp = stringA + "&key=0fUK0QkQ7BXAHZV3zCyJNnH0iZWyRG2D"; //注：key为商户平台设置的密钥key
    // var sign = that.MD5(stringSignTemp).toUpperCase();//注：MD5签名方式
    // console.log('sign = ' + sign);
    // wx.request({
    //   method: 'post',
    //   url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    //   data: '<xml>'
    //   + '<appid>' + appid + '</appid>'
    //   + '<body>' + body + '</body>'
    //   + '<mch_id>' + mch_id + '</mch_id>'
    //   + '<nonce_str>' + nonce_str + '</nonce_str>'
    //   + '<notify_url>' + notify_url + '</notify_url>'
    //   + '<openid>' + openid + '</openid>'
    //   + '<out_trade_no>' + out_trade_no + '</out_trade_no>'
    //   + '<spbill_create_ip>' + spbill_create_ip + '</spbill_create_ip>'
    //   + '<total_fee>' + total_fee + '</total_fee>'
    //   + '<trade_type>' + trade_type + '</trade_type>'
    //   + '<sign>' + sign + '</sign>'
    //   + '</xml>',
    //   success: function (e) {
    //     console.dir(e);
    //     if (e.statusCode === 200) {
    //       if (e.data) {
    //         console.log(e);
    //         var result = e.data;
    //         if (result.indexOf('<prepay_id>') != -1) {
    //           var rs = result.substring(result.indexOf('<prepay_id>') + 11, result.indexOf('</prepay_id>'))
    //           var prepay_id = rs.substring(rs.indexOf('CDATA') + 6, rs.indexOf(']]'));
    //           console.dir(prepay_id);

    //           var timeStamp = Math.floor(new Date().getTime() / 1000) + '';
    //           console.log("timeStamp = " + timeStamp);
    //           var nonceStr = that.randomString(32, '#aA');
    //           console.dir('nonceStr = ' + nonceStr);
    //           var _package = 'prepay_id=' + prepay_id;
    //           console.log('package =' + _package);

    //           var stringB = 'appid=' + appid + '&nonceStr=' + nonceStr + '&package=' + _package + '&signType=MD5&timeStamp=' + timeStamp;
    //           console.log('stringB =' +stringB);
    //           var paySign = that.MD5(stringB).toUpperCase();  
    //           console.log('paySign = ' + paySign);
    //           wx.requestPayment({
    //             timeStamp: timeStamp,
    //             nonceStr: nonceStr,
    //             package: _package,
    //             signType: 'MD5',
    //             paySign: paySign,
    //             success: function (e) {
    //               console.log("pay success!");
    //               console.dir(e);
    //             },
    //             fail: function (e) {
    //               console.log('failed');
    //               console.dir(e);
    //               console.log(e);
    //             }
    //           })
    //         }
    //       }
    //     }
    //   },
    //   fail: function (e) {
    //     console.dir(e);
    //   }
    // })
  }
})