Page({
  data: {
  },
  toOrderList: function(e) {
    wx.reLaunch({
      url: '/pages/order/order',
    })
  }
})