var config = require('./utils/config.js');
App({
  onLaunch: function(e) {
    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };
    // 关闭调试
    wx.setEnableDebug({
      enableDebug: false
    })
  },
  getCarts: function(cb) {
    if(!this.globalData.carts) {
      this.globalData.carts = wx.getStorageSync('carts') || [];
    }
    typeof cb == "function" && cb(this.globalData.carts);
  },
  addCart: function(product, cb) {
    if (!this.globalData.carts) {
      this.globalData.carts = wx.getStorageSync('carts') || [];
    }
    if (!product) {
      typeof cb == "function" && cb(false);
      return;
    }
    var id = product.itemId;
    if (!id) {
      typeof cb == "function" && cb(false);
      return;
    }
    var exists = false;
    for (var i = 0; i < this.globalData.carts.length; i++) {
      if (this.globalData.carts[i].itemId === id) {
        this.globalData.carts[i].count += 1;
        this.globalData.carts[i].checked = true;
        exists = true;
        break;
      }
    }
    if (!exists) {
      product.count = 1;
      this.globalData.carts.push(product);
    }
    wx.setStorageSync('carts', this.globalData.carts);
    typeof cb == "function" && cb(true);
  },
  delCarts: function(carts, cb) {
    if (!carts) {
      typeof cb == "function" && cb();
      return;
    }
    if (!this.globalData.carts) {
      this.globalData.carts = wx.getStorageSync('carts') || [];
    }
    for (var i = 0; i < this.globalData.carts.length; i++) {
      for(var j=0; j < carts.length; j++) {
        if (carts[j].itemId == this.globalData.carts[i].itemId) {
          this.globalData.carts.splice(i, 1);
        }
      }
    }
    wx.setStorageSync('carts', this.globalData.carts);
    typeof cb == "function" && cb();
  },
  //弹出框让用户授权访问用户信息
  showSetting: function(openid) {
    var that = this;
    wx.getSetting({
      success: function (e) {
        if (e.authSetting && !e.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '未授权访问用户信息',
            showCancel: false,
            confirmText: '去设置',
            success: function (e) {
              if (e.confirm) {
                wx.openSetting({
                  success: function (e) {
                    if (e.authSetting && !e.authSetting['scope.userInfo']) {
                      that.showSetting(openid);
                    } else if (e.authSetting && e.authSetting['scope.userInfo']) {
                        //允许访问用户信息
                        wx.getUserInfo({
                          success: function(e){
                            that.globalData.userInfo = e.userInfo;
                            that.globalData.userInfo.openid = openid;
                            typeof cb == "function" && cb(that.globalData.userInfo);
                          }
                        })
                    } 
                  }
                })
              }
            }
          });
        }
      }
    })
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      var that = this;
       wx.login({
        success: function (e) {
            var code = e.code;
            console.log(code);
            //TODO 传递code请求服务器获取openid
            wx.request({
              url: config.BASE_URL + '/wechat/wechatLogin.action?wechatLoginRequest.jscode=' + code,
              success: function(e) {
                console.log(e);
                var openid = e.data.rows[0];
                console.log('openid = ' + openid);
                wx.getUserInfo({
                  withCredentials: false,
                  success: function (e) {
                    var userInfo = e.userInfo;
                    userInfo.openid = openid;
                    that.globalData.userInfo = userInfo;
                    typeof cb == "function" && cb(that.globalData.userInfo);
                  },
                  fail: function (e) {
                    that.globalData = {};
                    that.globalData.userInfo = {};
                    that.globalData.userInfo.openid = openid;
                    that.showSetting(openid);
                  }
                })
              },
              fail: function(e) {
                console.log(e);
              }
            });
        },
        fail: function (e) {
        }
      })
    }
  },
  addAddress: function(address, cb) {
    if (address) {
      this.address = this.address || {};
      this.address.data = this.address.data || [];
      this.address.data.push(address);
      this.address.index = this.address.data.length - 1;
      wx.setStorageSync('address', this.address);
      typeof cb == "function" && cb();
    }
  },
  getAddress: function(cb){
    var address = null;
    if(!this.address) {
      this.address = wx.getStorageSync('address') || {};
    }
    if (this.address.data && this.address.data.length > 0) {
      address = this.address.data[this.address.index];
    }
    typeof cb == "function" && cb(address);
  },
  delAddress: function (index, cb) {
    if (!this.address) {
      this.address = wx.getStorageSync('address') || {};
    }
    if (this.address.data && this.address.data.length > index) {
      this.address.data.splice(index, 1);
      this.address.index -= 1;
      wx.setStorageSync('address', this.address);
    }
    typeof cb == "function" && cb();
  },
  getAddressList: function (cb) {
    if (!this.address) {
      this.address = wx.getStorageSync('address') || {};
    }
    typeof cb == "function" && cb(this.address);
  },
  setAddressList: function(addressList){
    if (addressList) {
      this.address = addressList;
      wx.setStorageSync('address', this.address);
    }
  },
  globalData: {
    userInfo: null
  }
})
