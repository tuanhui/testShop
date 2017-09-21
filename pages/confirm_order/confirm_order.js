// confirm_order.js
var config = require('../../utils/config.js');
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
    prices: 0,
    isFromCart: false,    
    showOther: true,
    showHint: false,
    minusPrice: 0,
    owner: '',
    phone: '',
    remark: '',
    address: '',
    invoiceType: -1,
    invoice: ''
  },
  onUnload: function () {
    app.invoice = null;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var isFromCart = options.isFromCart === "true";
    var carts = app.buyCarts;
    var totalFreight = 0;
    var cartsPrice = 0;
    var totalPrice = 0;
    var prices = 0;
    for (var i = 0; i < carts.length; i++) {
      var cart = carts[i];
      prices += parseFloat(cart.itemOriginalPrice || 0) * parseInt(cart.count);
      cartsPrice += parseFloat(cart.itemPrice || 0) * parseInt(cart.count);
    }
    var minusPrice = prices - cartsPrice;
    if(minusPrice < 0) {
      minusPrice = 0;
    }
    totalPrice = cartsPrice + totalFreight;
    this.setData({
      isFromCart: isFromCart,
      carts: carts,
      prices: prices,
      totalFreight: totalFreight,
      cartsPrice: cartsPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      minusPrice: minusPrice.toFixed(2)
    })
  },
  onShow: function() {
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

    var prices = value * parseFloat(cart.itemOriginalPrice);
    cart.count = value;

    var cartsPrice = value * parseFloat(cart.itemPrice);

    var totalPrice = cartsPrice + this.data.totalFreight;

    var minusPrice = prices - totalPrice;

    this.setData({
      carts: this.data.carts,
      cartsPrice: cartsPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      minusPrice: minusPrice.toFixed(2),
      prices: prices
    })
  },
  minus: function () {
    var cart = this.data.carts[0];
    if (!cart) {
      return;
    }
    cart.count -= 1;
    var cartsPrice = parseFloat(this.data.cartsPrice || 0);
    cartsPrice -= cart.itemPrice;

    var prices = parseFloat(this.data.prices || 0);
    prices -= parseFloat(cart.itemOriginalPrice);

    var totalPrice = cartsPrice + parseFloat(this.data.totalFreight || 0);

    var minusPrice = prices - cartsPrice;
    this.setData({
      carts: this.data.carts,
      cartsPrice: cartsPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      minusPrice: minusPrice.toFixed(2),
      prices: prices
    })
  },
  plus: function () {
    var cart = this.data.carts[0];
    if (!cart) {
      return;
    }
    cart.count += 1;
    var prices = parseFloat(this.data.prices);
    prices += parseFloat(cart.itemOriginalPrice || 0);

    var cartsPrice = parseFloat(this.data.cartsPrice);
    cartsPrice += parseFloat(cart.itemPrice || 0);

    var totalFreight = parseFloat(this.data.totalFreight)
    var totalPrice = cartsPrice + totalFreight;
    var minusPrice = prices - cartsPrice

    this.setData({
      carts: this.data.carts,
      cartsPrice: cartsPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      minusPrice: minusPrice.toFixed(2),
      prices: prices
    })
  }, 
  //弹出框让用户授权访问用户信息
  showSetting: function () {
    var that = this;
    wx.getSetting({
      success: function (e) {
        if (e.authSetting && !e.authSetting['scope.address']) {
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
    wx.chooseAddress({
      success(e) {
        var address = e.provinceName + e.cityName + e.countyName + e.detailInfo;
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
    var that = this;
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

    var requestData = {
      "orderType": "2",//1.小程序，2公众号
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
    wx.showLoading({
      title: '请稍后...',
      mask: true
    })
    console.log(JSON.stringify(requestData))
    // wx.request({
    //   url: config.BASE_URL + '/wechat/createWeChatOrder.action',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'},
    //   method: 'POST',
    //   data: { 
    //     "wechatOrderStr": JSON.stringify(requestData)
    //     },
    //   success: function(e) {
    //     app.delCarts(that.data.carts);
    //       if(e.data.success) {
    //         var appid = e.data.object.appId;
    //         var nonceStr = e.data.object.nonceStr;
    //         var _package = e.data.object.package;
    //         var paySign = e.data.object.paySign;
    //         var signType = e.data.object.signType;
    //         var timeStamp = e.data.object.timeStamp;
            
    //     wx.requestPayment({
    //           timeStamp: timeStamp,
    //           nonceStr: nonceStr,
    //           "package": _package,
    //           signType: signType,
    //           paySign: paySign,
    //           success: function (e) {
    //             wx.hideLoading();
    //             if (! that.data.isFromCart) {
    //               app.isFromDetail = true;
    //             } else {
    //               app.isFromCartOrderSuccess = true;
    //             }
    //             wx.navigateBack({
    //               delta: 1
    //             });
    //           },
    //           fail: function (e) {
    //             wx.hideLoading();
    //             wx.showToast({
    //               title: '订单未支付',
    //               mask: true,
    //               duration: 3000
    //             })
    //             setTimeout(function(){
    //               wx.redirectTo({
    //                 url: '/pages/order/order',
    //               })
    //             }.bind(this), 3000);
    //           }
    //         })
    //       }
    //   },
    //   fail: function(e) {
    //     wx.hideLoading();
    //     wx.showToast({
    //       title: '请求失败,请检查网络是否正常!',
    //       duration: 3000
    //     })
    //   }
    // }) 
  }
})