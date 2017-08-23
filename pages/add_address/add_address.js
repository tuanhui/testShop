var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [],
    cities: [],
    areas: [],
    streets: [],
    willChooseIndex: 0,
    values: ['', '', '', ''],
    indexs: [0, 0, 0, 0],
    inputAddress: '',
    phone: '',
    owner: '',
    showToast: false,
    toastText: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var provinces = [];
    for(var i=0; i<app.cities.length; i++) {
      provinces.push(app.cities[i].name);
    }
    console.dir(provinces);
    this.setData({
      provinces: provinces
    })
  }, 
  provincesChange: function(e){
    var index = parseInt(e.detail.value);
    var values = this.data.values;
    values[0] = this.data.provinces[index];
    values[1] = values[2] = values[3] = '';

    var indexs = this.data.indexs;
    indexs[0] = index;
    indexs[1] = indexs[2] = indexs[3] = 0;

    var cities = [];
    for (var i = 0; i < app.cities[index].subs.length; i++) {
      cities.push(app.cities[index].subs[i].name);
    }
    console.dir(cities);
    this.setData({
      values: values,
      cities: cities,
      willChooseIndex: 1,
      indexs: indexs
    })
  },
  citiesChange: function(e) {
    var index = parseInt(e.detail.value);
    var values = this.data.values;
    values[1] = this.data.cities[index];
    values[2] = '';
    values[3] = '';

    var indexs = this.data.indexs;
    indexs[1] = index;
    indexs[2] = indexs[3] = 0;

    var areas = [];
    for (var i = 0; i < app.cities[indexs[0]].subs[index].subs.length; i++) {
      areas.push(app.cities[indexs[0]].subs[index].subs[i].name);
    }
    console.dir(areas);
    this.setData({
      values: values,
      areas: areas,
      willChooseIndex: 2,
      indexs: indexs
    })
  },
  areasChange: function(e){
    var index = parseInt(e.detail.value);
    var values = this.data.values;
    values[2] = this.data.areas[index];
    values[3] = '';

    var indexs = this.data.indexs;
    indexs[2] = index;

    var streets = [];
    console.dir(app.cities[indexs[0]].subs[indexs[1]].subs);
    for (var i = 0; i < app.cities[indexs[0]].subs[indexs[1]].subs[index].subs.length; i++) {
      streets.push(app.cities[indexs[0]].subs[indexs[1]].subs[index].subs[i].name);
    }
    console.dir(streets);
    this.setData({
      values: values,
      streets: streets,
      willChooseIndex: 3,
      indexs: indexs
    })
  },
  streetsChange: function(e){
    var index = parseInt(e.detail.value);
    this.data.values[3] = this.data.streets[index];
    this.data.indexs[3] = index;
    this.setData({
      values: this.data.values,
      indexs: this.data.indexs
    })
  },
  onOwnerInput: function(e){
    var value = e.detail.value;
    this.setData({
      owner: value
    });
  },
  onPhoneInput: function (e) {
    var value = e.detail.value;
    this.setData({
      phone: value
    });
  },
  onInputAddress: function(e){
    var value = e.detail.value;
    this.setData({
      inputAddress: value
    });
  },
  commitAddress: function(){
    var toastText = '';
    if (!this.data.owner) {
      toastText = '请填写收货人姓名。';
    } else if (!this.data.phone) {
      toastText = '请填写手机号码。';
    } else if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      toastText = '手机号码格式不正确。';
    } else if (!this.data.phone) {
      toastText = '请填写手机号码。';
    } else if (!this.data.values[3]) {
      toastText = '需要选择一个地址。';
    }else if (!this.data.inputAddress) {
      toastText = '详细地址不能为空。';
    } 
    if(toastText) {
      this.setData({
        showToast: true,
        toastText: toastText
      })
      setTimeout(function(){
        this.setData({
          showToast: false,
          toastText: ''
        })
      }.bind(this), 1500);
      return;
    }

    //TODO 添加购物地址
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    app.addAddress({
      provinces: this.data.provinces,
      cities: this.data.cities,
      areas: this.data.areas,
      streets: this.data.streets,
      willChooseIndex: this.data.willChooseIndex,
      values: this.data.values,
      indexs: this.data.indexs,
      inputAddress: this.data.inputAddress,
      phone: this.data.phone,
      owner: this.data.owner,
    }, function(){
      wx.hideLoading();
      wx.navigateBack({
        url: '/pages/confirm_order/confirm_order?chooseAddress=true'
      });
    })
  }
})