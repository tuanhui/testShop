//获取应用实例
var app = getApp()
Page({
  data: {
    product: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  onLoad: function (options) {
    this.data.product.price = options.price;
    this.data.product.productCode = options.productCode;
    this.data.product.productName = options.productName;
    this.data.product.productId = options.productId;
    this.data.product.productImg = options.productImg;
    this.data.product.imgUrls = app.imgUrls[options.productId];
    this.data.product.introImgUrls = app.introImgUrls[options.productId];
    this.data.product.freight = 0;
    this.data.product.count = 1;
    this.setData({
      product: this.data.product
    })
  },
  toHome: function(){
    console.log("toHome");
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  toCart: function () {
    console.log("toCart");
    wx.reLaunch({
      url: '/pages/shopping_cart/shopping_cart'
    })
  },
  minus: function(){
    this.data.product.count -= 1; 
    this.setData({
      product: this.data.product
    })
  },
  plus: function(){
    this.data.product.count += 1; 
    this.setData({
      product: this.data.product
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
    carts.push(this.data.product);
    app.buyCarts = carts;
    wx.navigateTo({
      url: '/pages/confirm_order/confirm_order?isFromCart=false',
    })
  },
  addToCart: function(options){
    //TODO 添加当前商品到购物车
    wx.showLoading({
      title: '',
    });
    app.addCart(this.data.product, function(){
      wx.hideLoading();
      wx.showToast({
        title: '添加成功',
        icon: 'success',
      })
    })
  }
})