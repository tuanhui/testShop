//获取应用实例
var config = require('../../utils/config.js');
var app = getApp();
Page({
  data: {
    product: {},
    imgs:[]
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '载入中...',
      mask: true
    });
    var id = options.id;
    var imgs = require("../../utils/products.js").imgUrls;
    wx.request({
      url: config.BASE_URL + '/wechat/getAllWechatItems.action',
      success: function (res) {
        if (res.data.success) {
          //TODO 获取列表成功
          var productList = res.data.rows;
          for (var key in productList) {
            var tmpProduct = productList[key];
            if (tmpProduct.itemId == id) {
              tmpProduct.itemImg = config.BASE_URL
                + '/wechat'
                + tmpProduct.itemImg.substr(1);
              that.setData({
                product: tmpProduct,
                imgs: imgs[id]
              })
              break;
            }
          }
        }
        wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
      }
    })
  },
  onShow: function(e) {
    if (app.isFromDetail) {
      app.isFromDetail = false;
      wx.navigateTo({
        url: '/pages/buy_success/buy_success?isFromDetail=true',
      })
    }
  },
  toCart: function () {
    wx.reLaunch({
      url: '/pages/shopping_cart/shopping_cart'
    })
  },
  onInput: function(res){
    var value = res.detail.value;
    value = parseInt(value);
    if (!value || isNaN(value) || typeof value !== 'number') {
        value = 1;
    }
    if ((value+"").length > 3) {
      value = parseInt((value + "").substring(0,3));
    }
    this.data.product.count = value;
    this.setData({
      product: this.data.product
    })
  },
  buy: function(){
    var carts = [];
    this.data.product.count = 1;
    carts.push(this.data.product);
    app.buyCarts = carts;
    wx.navigateTo({
      url: '/pages/confirm_order/confirm_order?isFromCart=false',
    })
  },
  onUnload: function(){
  },
  addToCart: function(options){
    //TODO 添加当前商品到购物车
    wx.showLoading({
      title: '正在加入购物车...',
    });
    app.addCart(this.data.product, function(result){
      wx.hideLoading();
      if (result) {
          wx.showToast({
            title: '已添加到购物车',
            icon: 'success',
          })
      }
    })
  }
})