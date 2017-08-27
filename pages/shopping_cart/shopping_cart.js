var app = getApp();
Page({
  data: {
    cartList: [],
    screenWidth: null,
    checkPositions: null,
    delIndex: -1,
    animationData: {},
    checkAll: false,
    totalCount: 0,
    totalPrice: 0,
    totalFreight: 0
  },
  
  onLoad: function (options) {
    console.log('onload');
    
  },
  onInput: function (e) {
    var value = e.detail.value;
    value = parseInt(value);
    var index = e.currentTarget.dataset.position;
    index = parseInt(index);
    if (!value || isNaN(value) || typeof value !== 'number') {
      value = 1;
    }
    if ((value + "").length > 3) {
      value = parseInt((value + "").substring(0, 3));
    }
    var cart = this.data.cartList[index];
    if (!cart) {
      return;
    }
    cart.count = value;
    var cartsPrice = 0;
    var datas = this.data.cartList;
    if (datas) {
      for (var i = 0; i < datas.length; i++) {
        var item = datas[i];
        if (item.checked) {
          cartsPrice += parseFloat(item.price) * parseInt(item.count);
        }
      }
    }
    var totalPrice = cartsPrice + this.data.totalFreight;
    this.setData({
      cartList: this.data.cartList,
      cartsPrice: cartsPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    })
  },
  onShow: function () {
    console.log('onshow');
    app.getCarts(function (carts) {
      var totalPrice = 0;
      var totalCount = 0;
      for (var i = 0; i < carts.length; i++) {
        var item = carts[i];
        if (item.checked) {
          totalPrice += parseFloat(item.price) * parseInt(item.count);
          totalCount += 1;
        }
      }
      this.setData({
        cartList: carts,
        totalPrice: totalPrice.toFixed(2),
        totalCount: totalCount,
        checkAll: totalCount > 0 && totalCount === carts.length
      })
    }.bind(this));
  },
  changeCheck: function(e){
    var position = e.currentTarget.dataset.position;
    var totalCount = this.data.totalCount;
    if(typeof position !== 'number') {
      return;
    }
    var item = this.data.cartList[position];
    if (!item) {
      return;
    }
    var checked = !item.checked;
    this.data.cartList[position].checked = checked;
    var totalPrice = parseFloat(this.data.totalPrice);
    if (checked) {
      totalPrice += parseFloat(item.price) * parseInt(item.count);
      totalCount += 1;
    } else {
      totalPrice -= parseFloat(item.price) * parseInt(item.count);
      totalCount -= 1;
    }
    this.setData({
      cartList: this.data.cartList,
      totalPrice: totalPrice.toFixed(2),
      totalCount: totalCount,
      checkAll: totalCount > 0 && totalCount === this.data.cartList.length,
    })
  },
  minus: function(e){
    var position = e && e.currentTarget && e.currentTarget.dataset.position;
    if (typeof position === 'number' && position < this.data.cartList.length) {
      var count = parseInt(this.data.cartList[position].count) - 1;
      if(count > 0) {
        var item = this.data.cartList[position];
        item.count = count;
        var totalPrice = parseFloat(this.data.totalPrice);
        if (item.checked) {
          totalPrice -= parseFloat(item.price);
        }
        this.setData({
          cartList: this.data.cartList,
          totalPrice: totalPrice.toFixed(2)
        });
      }
    }
  },
  plus: function(e){
    var position = e && e.currentTarget && e.currentTarget.dataset.position;
    if (typeof position === 'number' && position < this.data.cartList.length) {
      var count = parseInt(this.data.cartList[position].count) + 1;
      if (count > 0) {
        var item = this.data.cartList[position];
        item.count = count;
        var totalPrice = parseFloat(this.data.totalPrice);
        if (item.checked) {
          totalPrice += parseFloat(item.price);
        }
        this.setData({
          cartList: this.data.cartList,
          totalPrice: totalPrice.toFixed(2)
        });
      }
    }
  },
  doCheckAll: function(){
      var totalPrice = 0;
      var totalCount = 0;
      var checkAll = ! this.data.checkAll;
      var datas = this.data.cartList;
      if (datas) {
          for (var i = 0; i < datas.length; i++) {
            var item = datas[i];
            item.checked = checkAll;
            if (checkAll) {
              totalCount += 1;
              console.log('count = ' + item.count, 'price = ' + item.price);
              totalPrice += parseFloat(item.price) * parseInt(item.count);
            }
          }
       }
      this.setData({
        checkAll: checkAll,
        cartList: datas,
        totalPrice: totalPrice.toFixed(2),
        totalCount: totalCount
      })
  },
  onTouchStart: function(e){
    console.dir(e);
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  },
  onTouchEnd: function (e) {
    console.dir(e);
    if (this.data.delIndex != -1) {
      var animation = wx.createAnimation();
      animation.translateX(0).step();
      this.setData({
        animationData: animation.export(),
      });
      this.setData({
        delIndex: -1
      });
      return;
    }
    var changeX = e.changedTouches[0].clientX - this.startX;
    var changeY = e.changedTouches[0].clientY - this.startY;
   
    if(typeof changeX === 'number' && typeof changeY === 'number') {
      var position = e.currentTarget.dataset.position;
      if (changeX < -10 && Math.abs(changeX - changeY) > 10 && Math.abs(changeY) < 100) {
        console.log(changeY);
        this.setData({
          delIndex: position,
        });
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        });
        animation.translateX(-54).step();
        this.setData({
          animationData: animation.export(),
        });
      }
    }
    this.startX = undefined;
    this.startY = undefined;
    this.target = null;
  },
  delCarts: function(e) {
    if (this.data.totalCount === 0) {
      wx.showToast({
        title: '未选中要删除的产品',
      })
      return
    }
    var that = this;
    wx.showModal({
      content: '是否确认删除此商品？',
      cancelText: '取消',
      confirmText: '确定',
      success: function(res){
        if(res.confirm) {
          wx.showLoading({
            title: '正在删除...',
          });
          var carts = [];
          if(that.data.checkAll) {
            carts = that.data.cartList;
          } else {
              for (var i = 0; i < that.data.cartList.length; i++) {
                var tmpCart = that.data.cartList[i];
                if (tmpCart.checked) {
                  carts.push(tmpCart);
                }
              }
          }
          app.delCarts(that.data.cartList, function () {
            app.getCarts(function(carts){
              console.dir(carts);
              wx.hideLoading();
              if (carts) {
                  var totalCount = 0;
                  var totalPrice = 0;
                  var totalFreight = 0;
                  for(var i=0; i<carts.length; i++) {
                    var cart = carts[i];
                    if(cart.checked) {
                      totalCount += 1;
                      totalPrice += parseInt(cart.count) * parseFloat(cart.price);
                    }
                  }
                  that.setData({
                    cartList: carts,
                    totalPrice: totalPrice,
                    totalCount: totalCount,
                    checkAll: totalCount > 0 && totalCount === carts.length
                  })
              }
            })
          })
        }
      }
    });
  },
  /**
   * 提交
   */
  toPay: function(){
    var carts = [];
    for (var i = 0; i < this.data.cartList.length; i++) {
      var tmpCart = this.data.cartList[i];
      if (tmpCart.checked) {
        carts.push(tmpCart);
      }
    }
    app.buyCarts = carts;
    console.dir(app.buyCarts);
    wx.navigateTo({
      url: '/pages/confirm_order/confirm_order?isFromCart=true',
    })
  }
})