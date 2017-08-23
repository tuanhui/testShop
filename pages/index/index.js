//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    productList: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      productList: app.products
    });
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
    });
  }, 
  toDetail: function(options) {
    var productId = options.currentTarget.dataset.productId;
    var productCode = options.currentTarget.dataset.productCode;
    var productName = options.currentTarget.dataset.productName;
    var productImg = options.currentTarget.dataset.productImg;
    var price = options.currentTarget.dataset.price;
    wx.navigateTo({
      url: '/pages/detail/detail?productId=' + productId
           + '&productCode=' + productCode
           + '&productName=' + productName
           + '&productImg=' + productImg
           + '&price=' + price,
    })
  }
})
