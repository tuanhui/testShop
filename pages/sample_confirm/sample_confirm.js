// sample_confirm.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sampleCode: '',//样品编号
    sampleDate: '',//采样日期
    username: '',//姓名
    gender: '',//性别
    birthDate: '',//出生日期
    age: '',//年龄
    nation: '',//民族
    nativePlace: '',//籍贯
    guardianship: '',//监护人,如果选择产品为SD0126，则为必填
    phone: '',//联系电话
    address: '',//收货地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.dir(options);
      this.setData({
        sampleCode: options.sampleCode,//样品编号
        sampleDate: options.sampleDate,//采样日期
        username: options.username,//姓名
        gender: options.gender,//性别
        birthDate: options.birthDate,//出生日期
        age: options.age,//年龄
        nation: options.nation,//民族
        nativePlace: options.nativePlace,//籍贯
        guardianship: options.guardianship,//监护人,如果选择产品为SD0126，则为必填
        phone: options.phone,//联系电话
        address: options.address,//收货地址
      })
  },
  confirm: function(e) {
    var obj = [
      {
        sampleNum: this.data.sampleCode,
        sampleDate: this.data.sampleDate,
        sampleName: this.data.username,
        gender: this.data.gender,
        birthDate: this.data.birthDate,
        sampleAge: this.data.age,
        nationaltily: this.data.nation,
        nativePlace: this.data.nativePlace,
        probandName: this.data.guardianship,
        samplePhoneNum: this.data.phone,
        address: this.data.address
      }
    ];
   var value = `<soap:Envelope xmlns: soap = "http://schemas.xmlsoap.org/soap/envelope/"> 
        <soap:Body>
            <ns2:FrontWSMethod xmlns: ns2 = "http://sample.ws.front.bgi.com/"> 
            <arg0>lyz</arg0>
            <arg1>123</arg1> 
            <arg2>saveSampleInfo</arg2>
            <arg3></arg3> 
            </ns2:FrontWSMethod>
        </soap:Body> 
    </soap:Envelope>`;
   console.log(value);
  }
})