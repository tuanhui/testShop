//获取应用实例
var app = getApp()
Page({
  data: {
    product: {},
    imgs:[]
  },
  onLoad: function (options) {
    console.dir(options);
    wx.showLoading({
      title: '载入中...',
    });
    app.getDetail(options.id, function(detail){
        console.dir(detail);
        if(detail) {
            this.setData({
              product: detail.product,
              imgs: detail.imgs
            });
        }
        wx.hideLoading();
    }.bind(this));
  },
  toCart: function () {
    console.log("toCart");
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
    console.log("onUpload");
  },
  addToCart: function(options){
    //TODO 添加当前商品到购物车
    wx.showLoading({
      title: '',
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