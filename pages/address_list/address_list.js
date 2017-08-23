var app = getApp();
Page({
  data: {
    addressList: null
  },
  onLoad: function (options) {
    app.getAddressList(function(addressList) {
        this.setData({
          addressList: addressList
        });
    }.bind(this))
  },
  onItemClick: function(e){
    console.dir(e);
    var dataset = e.currentTarget.dataset;
    if (dataset) {
      var index = parseInt(dataset.index);
      this.data.addressList.index = index;
      app.setAddressList(this.data.addressList);
    }
    this.setData({
      addressList: this.data.addressList
    });
    setTimeout(function(){
      wx.navigateBack();
    }.bind(this),300);
  },
  delAddress: function(e){
    var that = this;
    wx.showModal({
      content: '确定删除地址?',
      success: function(result){
        if (result.confirm) {
          var dataset = e.currentTarget.dataset;
          if (dataset) {
            var index = parseInt(dataset.index);
            app.delAddress(index, function (e) {
              app.getAddressList(function (addressList){
                that.setData({
                  addressList: addressList
                })
              });
            })
          }
        }
      }
    });
  },
  addAddress: function(){
    wx.redirectTo({
      url: '/pages/add_address/add_address',
    })
  }
})