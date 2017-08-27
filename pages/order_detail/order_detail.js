Page({
  /**
   * 页面的初始数据
   */
  data: {
    order: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order: {
        "order_number": "DD3291839321",
        "order_type": 1,
        "invoice": {
          "type": 0,//0个人，1企业
          "username": "张三",
          "company": "单位名称",
          "registration_number": "DXDADFA22332424"//纳税人识别号
        },//发票信息，可能为null
        "owner": "林戏雨",
        "phone": "13242403775",
        "address": "广东省深圳市盐田区洪安三街华大公寓7栋9",
        "remark": "我是备注",
        "distribution": "顺丰快递",//配送方式
        "total_freight": 0,//邮费
        "cart_price": 23000,//订单总价
        "total_preferential": 0,//优惠价格
        "total_price": 23000,//支付价格
        "products": [
          {
            "id": "0X01",
            "name": "安孕可-单基因遗传病携带者筛查",
            "intro": "新生儿及儿童基因检测",
            "code": "SOX001",
            "price": 3200,
            "original_price": 6666,
            "img": "/imgs/pic2.jpg",
            "count": 5
          },
          {
            "id": "0X02",
            "name": "安馨可-新生儿及儿童基因检测",
            "intro": "新生儿及儿童基因检测",
            "code": "SOX002",
            "price": 3500,
            "original_price": 6666,
            "img": "/imgs/pic2.jpg",
            "count": 2
          }
        ]
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 订单详情
   */
  toOrderDetail: function (e) {
    var orderNumber = e.currentTarget.dataset.number;
    wx.navigateTo({
      url: '/pages/order_detail/order_detail?number=' + orderNumber
    })
  }
})