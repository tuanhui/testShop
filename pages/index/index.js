//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    productList: [],
  },
  onLoad: function (options) {
    // wx.downloadFile({
    //   url: 'https://www.cca.edu/sites/default/files/pdf/08/word-to-pdf.pdf',
    //   success: function (res) {
    //     var filePath = res.tempFilePath
    //     wx.openDocument({
    //       filePath: filePath,
    //       success: function (res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   }
    // })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
    });
    app.getProducts(function(products) {
      this.setData({
        productList: products
      });
    }.bind(this));
  }, 
  toDetail: function(options) {
    var id = options.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  }
})
