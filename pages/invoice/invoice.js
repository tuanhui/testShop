var app = getApp();
Page({
  data: {
    isCompany: false,
    isOwner: false,
    identify: null,
    company: null,
  },
  onLoad: function(){
    if (app.invoice) {
        var _type = app.invoice.type;
        console.dir(_type);
        if(typeof _type === 'number') {
          if(_type === 0) {
            var isOwner = true;
            this.setData({
              isOwner: isOwner
            })
          } else if(_type === 1) {
            var isCompany = true;
            this.setData({
              isCompany: isCompany,
              company: app.invoice.company,
              identify: app.invoice.registration_number
            })
          }
        }
    }
  },
  onIdentifyInput: function(e){
    this.setData({
      identify: e.detail.value
    });
  },
  onCompanyInput: function (e) {
    this.setData({
      company: e.detail.value
    });
  },
  changeCompany: function(){
      this.setData({
        isCompany: !this.data.isCompany,
        isOwner: false
      })
  },
  changeOwner: function(){
    this.setData({
      isCompany: false,
      isOwner: !this.data.isOwner
    })
  },
  confirm: function(e) {
    var _type = -1;
    if (this.data.isCompany) {
      _type = 1;
    } else if (this.data.isOwner) {
      _type = 0;
    }
    if (_type == 1) {
      if (!this.data.identify || !this.data.company) {
        if (!this.data.company) {
          wx.showToast({
            title: '请输入单位名称',
          })
        } else {
          wx.showToast({
            title: '请输入识别号',
          }) 
        }
        return; 
      }
    }
    app.invoice = {
      "type": _type,
    };
    app.invoice.registration_number = this.data.identify;
    app.invoice.company = this.data.company;
    wx.navigateBack();
  }
})