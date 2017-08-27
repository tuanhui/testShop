//app.js
App({
  getProducts: function(cb){
    if (this.globalData.products) {
      typeof cb == "function" && cb(this.globalData.products);
    } else {
      this.globalData.products = require("/utils/products.js").products;
      typeof cb == "function" && cb(this.globalData.products);
    }
  },
  getDetail: function(id, cb) {
    if (!this.globalData.imgUrls) {
      this.globalData.imgUrls = require("/utils/products.js").imgUrls;
    }
    if (!this.globalData.products) {
      this.globalData.products = require("/utils/products.js").products;
    }
    var product;
    for (var i = 0; i < this.globalData.products.length; i++) {
      var tmpProduct = this.globalData.products[i];
      if (tmpProduct.id === id) {
        product = tmpProduct;
        break;
      }
    }
    if (! product) {
      typeof cb == "function" && cb(null);
      return;
    }
    var imgs = this.globalData.imgUrls[id];
    this.globalData.detail = {
      product: product,
      imgs: imgs
    };
    typeof cb == "function" && cb(this.globalData.detail);
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
    var id = product.id;
    if (!id) {
      typeof cb == "function" && cb(false);
      return;
    }
    var exists = false;
    for (var i = 0; i < this.globalData.carts.length; i++) {
      if (this.globalData.carts[i].id === id) {
        console.log(typeof this.globalData.carts[i].count);
        console.log(typeof product.count);
        this.globalData.carts[i].count += product.count;
        this.globalData.carts[i].checked = true;
        exists = true;
        break;
      }
    }
    if (!exists) {
      product.count = 1;
      this.globalData.carts.push(product);
    }
    console.dir(this.globalData.carts);
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
    console.dir(this.globalData.carts);
    console.log('del start');
    for (var i = 0; i < this.globalData.carts.length; i++) {
      for(var j=0; j < carts.length; j++) {
        if (carts[j].id === this.globalData.carts[i].id) {
          this.globalData.carts.splice(i, 1);
        }
      }
    }
    console.log('del end');
    console.dir(this.globalData.carts);
    wx.setStorageSync('carts', this.globalData.carts);
    typeof cb == "function" && cb();
  },
  //弹出框让用户授权访问用户信息
  showSetting: function(openid) {
    var that = this;
    wx.getSetting({
      success: function (e) {
        console.log("getSetting!");
        console.dir(e);
        if (e.authSetting && !e.authSetting['scope.userInfo']) {
          console.log("用户拒绝访问用户权限");
          wx.showModal({
            title: '未授权访问用户信息',
            showCancel: false,
            confirmText: '去设置',
            success: function (e) {
              if (e.confirm) {
                wx.openSetting({
                  success: function (e) {
                    console.log("opensetting! success");
                    console.dir(e);
                    if (e.authSetting && !e.authSetting['scope.userInfo']) {
                      that.showSetting(openid);
                    } else if (e.authSetting && e.authSetting['scope.userInfo']) {
                        //允许访问用户信息
                        wx.getUserInfo({
                          success: function(e){
                            console.log('允许访问用户信息');
                            console.dir(e);
                            that.globalData.userInfo = e.userInfo;
                            that.globalData.userInfo.openid = openid;
                            console.dir(that.globalData.userInfo);
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
            console.log("login success!!");
            console.dir(e);
            var code = e.code;
            console.log('code = ' + code);
            //TODO 传递code请求服务器获取openid
            //...
            var appid = 'wxae6424dbbecd71b7'
            var secret = '0120613a469156615ce1bd8d5e1e116d';
            var openid = ""; //oi5cP0SRuLmFBbprjJ8ZLtYqQlal
            // wx.getUserInfo({
            //       withCredentials: false,
            //       success: function (e) {
            //         console.log("getUserInfo success!!");
            //         var userInfo = e.userInfo;
            //         userInfo.openid = openid;
            //         that.globalData.userInfo = userInfo;
            //         typeof cb == "function" && cb(that.globalData.userInfo);
            //       },
            //       fail: function (e) {
            //         console.log("getUserInfo fail!!");
            //         that.globalData = {};
            //         that.globalData.userInfo = {};
            //         that.globalData.userInfo.openid = openid;
            //         that.showSetting(openid);
            //       }
            //     })
            var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
            console.log('url = ' + url);
            wx.request({
              url: url,
              success: function(e) {
                console.log(JSON.stringify(e));
                openid = e.data.openid;
                console.log("openid = " + openid)
                wx.getUserInfo({
                  withCredentials: false,
                  success: function (e) {
                    console.log("getUserInfo success!!");
                    var userInfo = e.userInfo;
                    userInfo.openid = openid;
                    that.globalData.userInfo = userInfo;
                    typeof cb == "function" && cb(that.globalData.userInfo);
                  },
                  fail: function (e) {
                    console.log("getUserInfo fail!!");
                    that.globalData = {};
                    that.globalData.userInfo = {};
                    that.globalData.userInfo.openid = openid;
                    that.showSetting(openid);
                  }
                })
              },
              fail: function(e) {

              }
            })
            
            
        },
        fail: function (e) {
          console.log("login failed!!");
          console.dir(e);
        }
      })
    }
  },
  addAddress: function(address, cb) {
    console.dir(address);
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
