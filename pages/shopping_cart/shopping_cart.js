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
  },
  onLoad: function (options) {
    console.log('onload');
    var list = app.carts;
    console.dir(list);
    var totalPrice = 0;
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (item.checked) {
        totalPrice += item.price;
      }
    }
    this.setData({
      cartList: list,
      totalPrice: totalPrice.toFixed(2)
    })
  },
  onShow: function () {
    console.log('onshow');
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
      checkAll: totalCount > 0,
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
  delItem: function(e) {
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
          var position = e.currentTarget.dataset.position;
          console.log('del item ' + position);
          if (typeof position === 'number' && position < that.data.cartList.length) {
            var delArrays = that.data.cartList.splice(position, 1);
            if (!delArrays || delArrays.length === 0) {
              wx.hideLoading();
              return;
            }
            var item = delArrays[0];
            console.dir(item);
            var totalCount = parseInt(that.data.totalCount);
            var totalPrice = parseFloat(that.data.totalPrice);
            if(item.checked) {
              totalCount -= 1;
              totalPrice -= parseFloat(item.price) * parseInt(item.count);
            }
            app.delCart(item.productId,function(){
              wx.hideLoading();
              that.setData({
                cartList: that.data.cartList,
                totalPrice: totalPrice.toFixed(2),
                totalCount: totalCount,
                checkAll: (that.data.cartList == null || that.data.cartList.length == 0) ? false : that.data.checkAll
              })
            })
          }
        }
      }
    });
  },
  settlement: function(){
    //结算
    console.log("结算");
    var carts = [];
    for (var i = 0; i < this.data.cartList.length; i++){
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