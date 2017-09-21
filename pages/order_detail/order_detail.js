var config = require('../../utils/config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    discountsPrice: 0,
    order: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
    })
    wx.startPullDownRefresh();
  }, 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
      wx.request({
        url: config.BASE_URL + '/wechat/getWechatOrderDetail.action?orderId='
        + this.data.orderId,
        success: function(e) {
          console.dir(e);
          console.log(JSON.stringify(e.data.rows));
          var order = e.data.rows[0];
          var products = order.items || [];
          var price1 = 0;
          var price2 = 0;
          for(var i in products) {
            var product = products[i];
            price1 += parseFloat(product.itemPrice) * parseInt(product.count);
            price2 += parseFloat(product.itemOriginalPrice) * parseInt(product.count);
          }
          var discountsPrice = price2 - price1;
          if (discountsPrice < 0) {
            discountsPrice  = 0;
          }
          that.setData({
            discountsPrice: discountsPrice,
            order: order
          })
        },
        complete: function(e){
          wx.stopPullDownRefresh();
        }
      })
  }
})