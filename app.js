//app.js
App({
  onLaunch: function(){
    this.init();
  },
  init: function(cb) {
    this.products = wx.getStorageSync('products') || null;
    this.carts = wx.getStorageSync('carts') || [];
    this.imgUrls = wx.getStorageSync('imgs') || null;
    this.introImgUrls = wx.getStorageSync('intro_imgs') || null;
    this.cities = require("/utils/cities.js").cities;
    if (!this.products) {
      this.products = require("/utils/products.js").products;
      wx.setStorageSync('products', this.products);
      console.dir(this.products);
    }
    if (!this.imgUrls) {
      this.imgUrls = require("/utils/products.js").imgUrls;
      wx.setStorageSync('imgs', this.imgUrls);
      console.dir(this.imgUrls);
    }
    if (!this.introImgUrls) {
      this.introImgUrls = require("/utils/products.js").introImgUrls;
      wx.setStorageSync('intro_imgs', this.introImgUrls);
      console.dir(this.introImgUrls);
    }
  },
  addCart: function(product, cb) {
    console.dir(product);
    if (!product) {
      typeof cb == "function" && cb();
      return;
    }
    var productId = product.productId;
    if (!productId) {
      typeof cb == "function" && cb();
      return;
    }
    var exists = false;
    for(var i=0; i<this.carts.length; i++) {
      if (this.carts[i].productId === productId) {
        this.carts[i].count += product.count;
        exists = true;
        break;
      }
    }
    if (!exists) {
      this.carts.push(product);
    }
    console.dir(this.carts);
    wx.setStorageSync('carts', this.carts);
    typeof cb == "function" && cb();
  },
  delCart: function(productId, cb) {
    console.dir(productId);
    var index = -1;
    for (var i = 0; i < this.carts.length; i++) {
      if (this.carts[i].productId === productId) {
        index = i;
        break;
      }
    }
    if(index >= 0) {
      this.carts.splice(index, 1);
    }
    wx.setStorageSync('carts', this.carts);
    typeof cb == "function" && cb();
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      // success: function(res) {
      //   that.globalData.userInfo = res.userInfo
      //   typeof cb == "function" && cb(that.globalData.userInfo)
      // }
        wx.checkSession({
          fail: function(e){
            console.log('checkSession failed!!!');
            console.dir(e);
            wx.login({
              success: function(e){
                console.log("login success!!");
                console.dir(e);
                wx.getUserInfo({
                  success: function(e){
                    console.log("getUserInfo Success@@2");
                    console.dir(e);
                  },
                  fail: function(e) {
                    console.log("getUserInfo Failed@@2");
                    console.dir(e);
                  }
                })
              },
              fail: function(e){
                console.log("login failed!!");
                console.dir(e);
              }
            })
          },
          success: function(e) {
            console.log("checkSession success!!");
            console.dir(e);
            wx.getUserInfo({
              withCredentials: true,
              success: function(e) {
                console.log("getUserInfo success");
                console.dir(e);
              },
              fail: function(e){
                console.log("getUserInfo fail");
                console.dir(e);
              }
            })
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
