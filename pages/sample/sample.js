Page({
  data: {
    array: ['男', '女'],
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
    birthDay: '2008-8-8',
    protocol_1: false,
    protocol_2: false,
    screenH: 0,
    value: [0, 0],
    provinces: ["北京", "天津", "河北", "山西", "内蒙古自治区", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西壮族自治区", "海南", "重庆", "四川", "贵州", "云南", "西藏自治区", "陕西", "甘肃", "青海", "宁夏回族自治区", "新疆维吾尔自治区"],
    cities: ["市区"],
    addressList: { "北京": ["市区"], "天津": ["市区"], "河北": ["石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水"], "山西": ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"], "内蒙古自治区": ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安盟", "锡林郭勒盟", "阿拉善盟"], "辽宁": ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"], "吉林": ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边朝鲜族自治州"], "黑龙江": ["哈尔滨", "齐齐哈尔", "鸡西", "鹤岗", "双鸭山", "大庆", "伊春", "佳木斯", "七台河", "牡丹江", "黑河", "绥化", "大兴安岭地区"], "上海": ["上海"], "江苏": ["南京", "无锡", "徐州", "常州", "苏州", "南通", "连云港", "淮安", "盐城", "扬州", "镇江", "泰州", "宿迁"], "浙江": ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"], "安徽": ["合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "滁州", "阜阳", "宿州", "六安", "亳州", "池州", "宣城"], "福建": ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"], "江西": ["南昌", "景德镇", "萍乡", "九江", "新余", "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶"], "山东": ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "莱芜", "临沂", "德州", "聊城", "滨州", "菏泽"], "河南": ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "南阳", "商丘", "信阳", "周口", "驻马店"], "湖北": ["武汉", "黄石", "十堰", "宜昌", "襄阳", "鄂州", "荆门", "孝感", "荆州", "黄冈", "咸宁", "随州", "恩施土家族苗族自治州"], "湖南": ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西土家族苗族自治州"], "广东": ["广州", "韶关", "深圳", "珠海", "汕头", "佛山", "江门", "湛江", "茂名", "肇庆", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳", "云浮"], "广西壮族自治区": ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "来宾", "崇左"], "海南": ["海口", "三亚", "三沙", "儋州"], "重庆": ["重庆"], "四川": ["成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "南充", "眉山", "宜宾", "广安", "达州", "雅安", "巴中", "资阳", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"], "贵州": ["贵阳", "六盘水", "遵义", "安顺", "毕节", "铜仁", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"], "云南": ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"], "西藏自治区": ["拉萨", "日喀则", "昌都", "林芝", "山南", "那曲地区", "阿里地区"], "陕西": ["西安", "铜川", "宝鸡", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛"], "甘肃": ["兰州", "嘉峪关", "金昌", "白银", "天水", "武威", "张掖", "平凉", "酒泉", "庆阳", "定西", "陇南", "临夏回族自治州", "甘南藏族自治州"], "青海": ["西宁", "海东", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"], "宁夏回族自治区": ["银川", "石嘴山", "吴忠", "固原", "中卫"], "新疆维吾尔自治区": ["乌鲁木齐", "克拉玛依", "吐鲁番", "哈密", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区"]},
    chooseNativePlace: false,
  },
  onLoad: function(options){
    var date = new Date();
    var sampleDate = date.getFullYear() + '-' + (date.getMonth() + 1)+'-'+date.getDate();
    this.setData({
      sampleDate: sampleDate,
      screenH: wx.getSystemInfoSync().screenHeight
    })
  },
  selectNativePlace: function() {
    this.setData({
      chooseNativePlace: !this.data.chooseNativePlace
    })
  },
  hideDialog: function(){
    this.setData({
      chooseNativePlace: false
    })
  },
  confirmVal: function(){
    var mProvincesIndex = this.data.value[0];
    var mCitiesIndex = this.data.value[1];
    var nativePlace = this.data.provinces[mProvincesIndex]
      + this.data.cities[mCitiesIndex];
    this.setData({
      nativePlace: nativePlace,
      chooseNativePlace: false
    })
  },
  bindChange: function(e){
    console.dir(e);
    var provincesIndex = this.data.value[0];
    var citiesIndex = this.data.value[1];
    var mProvincesIndex = e.detail.value[0];
    var mCitiesIndex = e.detail.value[1];
    if (mProvincesIndex != provincesIndex) {
      var province = this.data.provinces[mProvincesIndex];
      var cities = this.data.addressList[province];
      this.setData({
        value: [mProvincesIndex, mCitiesIndex],
        cities: cities
      })
    }
    if (citiesIndex != mCitiesIndex) {
      this.setData({
        value: [mProvincesIndex, mCitiesIndex]
      })
    }
  }, 
  bindPickerChange: function(e){
    this.setData({
      gender: this.data.array[e.detail.value]
    })
  },
  chooseAddress: function(e) {
    var that = this;
    console.dir(e);
    wx.chooseAddress({
      success(e) {
        console.dir(e);
        var address = e.provinceName+e.cityName+e.countyName+e.detailInfo;
        console.log(address);
        that.setData({
            address: address
        });
      }
    })
  },
  getSampleCode: function(){
    wx.scanCode({
      success: function(e) {
        var result = e.result;
        this.setData({
          sampleCode: result
        })
      }.bind(this)
    })
  },
  onSampleCodeInput: function(e) {
    this.setData({
      sampleCode: e.detail.value
    })
  },
  // 采样日期
  onSampleDateChange: function(e) {
    this.setData({
      sampleDate: e.detail.value
    })
  },
  // 出生日期
  onBirthDayChange: function(e) {
    var birthDate = e.detail.value;
    var mYear = new Date().getFullYear();
    var year = parseInt(birthDate.split('-')[0]);
    var age = (mYear - year) + '岁';
    this.setData({
      birthDate: birthDate,
      age: age
    })
  },
  //姓名
  onNameInput: function(e){
      this.setData({
        username: e.detail.value
      })
  },
  //手机号
  onPhoneInput: function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  checkProtocol_1: function(e) {
      this.setData({
        protocol_1: !this.data.protocol_1
      })
  },
  checkProtocol_2: function(e){
    this.setData({
      protocol_2: !this.data.protocol_2
    })
  },
  checkInput: function(){
    var notice;
    if (!this.data.sampleCode) {
      notice = '请输入样本编号';
    } else if (!this.data.username) {
      notice = '请输入检测者姓名';
    } else if (!this.data.gender) {
      notice = '请输入检测者性别';
    } else if (!this.data.birthDate) {
      notice = '请输入检测者出生日期';
    } else if (!this.data.phone) {
      notice = '请输入手机号';
    } else if (! /^1[34578]{1}\d{9}$/.test(this.data.phone)){
      notice = '手机号格式错误';
    } else if (!this.data.address) {
      notice = '请输入接收报告的地址';
    }
    if(notice) {
        wx.showToast({
          title: notice,
          icon: 'wran'
        })
        return;
    }
    wx.navigateTo({
      // sampleCode: '',//样品编号
      // sampleDate: '',//采样日期
      // username: '',//姓名
      // gender: '',//性别
      // birthDate: '',//出生日期
      // age: '',//年龄
      // nation: '',//民族
      // nativePlace: '',//籍贯
      // guardianship: '',//监护人,如果选择产品为SD0126，则为必填
      // phone: '',//联系电话
      // address: '',//收货地址
      url: '/pages/sample_confirm/sample_confirm?sampleCode=' + this.data.sampleCode
      + '&sampleDate=' + this.data.sampleDate
      + '&username=' + this.data.username
      + '&gender=' + this.data.gender
      + '&birthDate=' + this.data.birthDate
      + '&age=' + this.data.age
      + '&nation=' + this.data.nation
      + '&nativePlace=' + this.data.nativePlace
      + '&guardianship=' + this.data.guardianship
      + '&phone=' + this.data.phone
      + '&address=' + this.data.address
      ,
    })
  }
})