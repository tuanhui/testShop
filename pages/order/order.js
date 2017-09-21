var config = require('../../utils/config.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      orders: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh();
  },
  /**
   * 刷新订单列表
   */
  onPullDownRefresh: function () {
    this.loadData();
  }, 
  loadData: function(e) {
    var that = this;
    wx.request({
      url: config.BASE_URL+'/wechat/getWechatOrders.action',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      // data: {
      //   "wcsOrder": app.globalData.userInfo.openid
      // },
      success: function(e){
        console.dir(e);
        console.log(JSON.stringify(e.data));
        if (! e.data.rows || e.data.rows.length == 0) {
          wx.showToast({
            title: '无订单',
          })
          return;
        }
        var orders = [];
        for (var key in e.data.rows) {
          var tmp = e.data.rows[key];
          if (tmp.orderOpenid == app.globalData.userInfo.openid) {
            orders.push(tmp);
          }
        }
        that.setData({
          orders: orders
        }) 
      },
      complete: function(e) {
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 订单详情
   */
  toOrderDetail: function(e){
    var orderId = e.currentTarget.dataset.orderId;
      wx.navigateTo({
        url: '/pages/order_detail/order_detail?orderId=' + orderId
      })
  }, 
  /**
   * 支付
   */
  toBuy: function(e){
    var index = e.currentTarget.dataset.index;
    var requestData = {
      "orderId": this.data.orders[index].orderId,
    };
    wx.showLoading({
      title: '请稍后...',
      mask: true
    })
    wx.request({
      url: config.BASE_URL + '/createWeChatOrder.action',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        "wechatOrderStr": JSON.stringify(requestData)
      },
      success: function (e) {
        if (e.data.success) {
          var appid = e.data.object.appId;
          var nonceStr = e.data.object.nonceStr;
          var _package = e.data.object.package;
          var paySign = e.data.object.paySign;
          var signType = e.data.object.signType;
          var timeStamp = e.data.object.timeStamp;

          wx.requestPayment({
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            "package": _package,
            signType: signType,
            paySign: paySign,
            success: function (e) {
              wx.hideLoading();
              wx.navigateBack({
                delta: 1
              });
              wx.navigateTo({
                url: '/pages/buy_success/buy_success',
              })
            },
            fail: function (e) {
              wx.hideLoading();
              wx.showToast({
                title: '订单未支付',
                mask: true,
                duration: 3000
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/order/order',
                })
              }.bind(this), 3000);
            }
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '服务器请求出错!',
            duration: 3000
          })
        }
      },
      fail: function (e) {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败,请检查网络是否正常!',
          duration: 3000
        })
      }
    }) 
  }
})