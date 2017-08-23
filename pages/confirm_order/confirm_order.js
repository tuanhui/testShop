// confirm_order.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carts: null,
    isFromCart: false,
    address: null,
    addressInfo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getAddress(function(address){
     this.setData({
       address: address
     })
    }.bind(this));
    var isFromCart = !!options.isFromCart;
    console.log(isFromCart);
    var carts = app.buyCarts;
    console.dir(carts);
    var totalFreight = 0;
    var cartsPrice = 0;
    var totalPrice = 0;
    for (var i = 0; i < carts.length; i++) {
        var cart = carts[i];
        cartsPrice += parseFloat(cart.price) * parseInt(cart.count);
     }
    totalPrice = cartsPrice + totalFreight;

    this.setData({
      isFromCart: isFromCart,
      carts: carts,
      totalFreight: totalFreight,
      cartsPrice: cartsPrice,
      totalPrice: totalPrice,
    })
  },
  minus: function(){
    var cart = this.data.carts[0];
    if(!cart) {
      return;
    }
    cart.count -= 1;
    var cartsPrice = this.data.cartsPrice;
    cartsPrice -= cart.price;
    var totalPrice = cartsPrice + this.data.totalFreight;

    this.setData({
      carts: this.data.carts,
      cartsPrice: cartsPrice,
      totalPrice: totalPrice,
    })
  },
  plus: function(){
    var cart = this.data.carts[0];
    if (!cart) {
      return;
    }
    cart.count += 1;
    var cartsPrice = this.data.cartsPrice;
    cartsPrice += parseFloat(cart.price);
    var totalPrice = cartsPrice + this.data.totalFreight;

    this.setData({
      carts: this.data.carts,
      cartsPrice: cartsPrice,
      totalPrice: totalPrice,
    })
  },
  onInput: function(e){
    var value = e.detail.value;
    value = parseInt(value);
    if (!value || isNaN(value) || typeof value !== 'number') {
      value = 1;
    }
    if ((value + "").length > 3) {
      value = parseInt((value + "").substring(0, 3));
    }
    var cart = this.data.carts[0];
    if (!cart) {
      return;
    }
    cart.count = value;
    var cartsPrice = value * cart.price;
    var totalPrice = cartsPrice + this.data.totalFreight;

    this.setData({
      carts: this.data.carts,
      cartsPrice: cartsPrice,
      totalPrice: totalPrice,
    })
  },
  toAddAddress: function(){
    //TODO 添加购物地址
    wx.navigateTo({
      url: '/pages/add_address/add_address?isEdit=false',
    })
  },
  toAddressList: function(){
    wx.navigateTo({
      url: '/pages/address_list/address_list',
    })
  },
  onShow: function(e) {
    app.getAddress(function(address) {
      if(address) {
        var addressInfo = 
          address.provinces[address.indexs[0]]
          + address.cities[address.indexs[1]]
          + address.areas[address.indexs[2]]
          + address.streets[address.indexs[3]]
          + address.inputAddress;
          this.setData({
            address: address,
            addressInfo: addressInfo,
          })
      }
    }.bind(this));
  }
})