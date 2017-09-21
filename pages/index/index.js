var config = require('../../utils/config.js');
var app = getApp();
Page({
  data: {
    loadingSuccess: false,
    isActive: false,
    finishedTime: 0,
    values: [],
    productList: [],
    duration: 500,
    autoplay: true,
    hours: 0,
    minutes: 0,
    seconds: 0,
    indicatorDots: true,
    banners: ['/imgs/bg_banner.jpg'],
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh();
    this.loadData();
  },
  onShow: function(){
    var date = new Date();
    var mTime = date.valueOf();
    var date1 = new Date(mTime - 86400000);
    var date2 = new Date(mTime + 86400000);
    var date3 = new Date(mTime + 172800000);
    var values = [
      (date1.getMonth() + 1) + '月' + date1.getDate() + '日',
      (date.getMonth() + 1) + '月' + date.getDate() + '日',
      (date2.getMonth() + 1) + '月' + date2.getDate()+'日',
      (date3.getMonth() + 1) + '月' + date3.getDate() + '日',
    ]
    this.setData({
      values: values
    });
    if (this.data.isActive) {
      this.refreshTime();
    }
  },
  loadData: function() {
    var that = this;
    app.getUserInfo(function (userInfo) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      wx.request({
        url: config.BASE_URL + '/wechat/getAllWechatItems.action',
        success: function (res) {
          console.dir(res);
          if (res.data.success) {
            //TODO 获取列表成功
            var isActive = "20170909" === res.data.object;
            var productList = res.data.rows;
            for(var key in productList) {
              productList[key].itemImg = config.BASE_URL
                              + '/wechat' 
                              + productList[key].itemImg.substr(1);
            }
            for (var key in productList) {
              productList[key].count = 1;
            }
            var banners = res.data.msgStr || that.data.banners;
            for(var i=0; i<banners.length; i++) {
              banners[i] = banners[i].replaceAll('./assets', '');
            }
            console.dir(banners);
            that.setData({
              banners: banners,
              loadingSuccess: true, 
              isActive: isActive,
              productList: productList
            });
            if (isActive) {
              var time = new Date();
              var year = res.data.object.substring(0, 4);
              var month = res.data.object.substring(4, 6);
              var day = res.data.object.substring(6, 8);
              var timeStr = year + "/" + month + "/" + day + " 00:00:00";
              var finishTime = new Date(timeStr).getTime() + 86400000;
              var delay = finishTime - time.getTime();
              setTimeout(function () {
                that.setData({
                  isActive: false
                })
              }, delay);
              that.setData({
                hours: time.getHours(),
                minutes: time.getMinutes(),
                seconds: time.getSeconds()
              })
              that.refreshTime();
            }
          } else {
            wx.showToast({
              title: '数据请求失败，可以下拉刷新重试',
              duration: 3000
            })
          }
          wx.hideLoading();
        }, 
        fail: function(error) {
          console.dor(error);
          wx.hideLoading();
          wx.showToast({
            title: '数据请求失败，可以下拉刷新重试',
            duration: 3000
          })
        }
      })
    });
  },
  onLoad: function (options) {
    this.loadData();
  }, 
  refreshTime: function(e) {
    var that = this;
    this.timer && clearInterval(this.timer);
    this.timer = setInterval(function(){
      var time = new Date();

      that.setData({
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds()
      })
    }, 1000);
  },
  toDetail: function(options) {
    var id = options.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  // 联系客服
  callUs: function(e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    });
  }
})
