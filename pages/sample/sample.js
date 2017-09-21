var config = require('../../utils/config.js');
Page({
  data: {
    loadSuccess: false,
    product: null,
    _type: '',
    sampleType: '',
    productNames: [],
    products: [],
    mProductCode: '',
    index: 0,
    mProductName: '',
    genderNames: ['男', '女'],
    genderIndex: 0,
    genderValue: -1,
    genders: [
      {
        name: '男',
        value: 1
      }, {
        name: '女',
        value: 2
      }
    ],
    sampleCode: '',//样品编号
    sampleDate: '',//采样日期
    username: '',//姓名
    gender: '',//性别
    birthDate: '',//出生日期
    age: '',//年龄
    nation: '',//民族
    nativePlace: '',//籍贯
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
    patientArray: ['确认患者','疑似患者','患者亲属','表现型正常人群'],//患者类型
    patientValue: 0,
    //安馨可start
    guardianship: '',//监护人,如果选择产品为SD0126，则为必填
    patientName: '',//受检者类型
    clinicalManifestation: '',//临床表现
    clinicalManifestationFlag: -1,
    email: '',//电子邮件
    motherName: '',//母亲姓名
    motherAge: '',//母亲年龄
    dnaFatherName: '',//父亲姓名
    fatherAge: '',//父亲年龄
    motherProduce: '', //母亲家族遗传病详情
    fatherProduce: '',//父亲家族遗传病详情
    motherProduceFlag: -1,
    fatherProduceFlag: -1,
    //安馨可end

    //安孕可start
    pregnancyFlag: -1,//是否怀孕,1.是，2.否
    pregnancyTime:'',//怀孕周期

    badPregnancyFlag: -1,//不良怀孕历史,1.是，2.否
    badPpregnancy: '',//不良怀孕历史描述

    familyProduceFlag: -1, //有无家族遗传病
    familyProduce: '',//家族遗传病详情

    beGeneticFlag: -1,//疑似遗传病 是、否
    beGenetic: '',//疑似遗传病描述

    nearRelationFlag: -1,//近亲结婚
    nearRelation: '',//近亲结婚，亲属关系
    //安孕可start

    //遗传性肿瘤start
    patientName: '',//受检者类型
    // email: '',//电子邮件
    clinicalDiagnosisFlag: -1,//受检者癌症病史,有、无
    onsetAge: '',//受检者癌症病史,发病年龄
    clinicalDiagnosis:'',//受检者癌症病史
    familyCancerHistoryFlag: -1,//家族癌症病史，有、无
    clinicalManifestation: '',//家族癌症病史，临床表现-详情
    familyRelation: '',//家族癌症病史，亲属关系
    cancerType: '',//家族癌症病史，亲属发病类型和年龄
    cancer_type: '',//家族癌症病史，亲属发病类型
    cancer_age: '',//家族癌症病史，亲属发病年龄
    //遗传性肿瘤end

    //遗传性心律失常start
    patientName: '',//受检者类型
    email: '',//电子邮件
    personalHistoryFlag: -1, //受检者是否有心脏类疾病史,有、无
    personalHistory: '',//如有心脏类疾病，请详述疾病名称和临床症状
    familyProduceFlag: -1,//家族是否有心脏类疾病史,有、无
    familyProduce: '',//家族心脏类疾病史临床症状描述
    familyRelation: '',//受检者与患病亲属关系
    //遗传性心律失常end
  },
  //受检者是否有心脏类疾病史,有、无
  changePersonalHistoryFlag: function(e) {
    this.setData({
      personalHistoryFlag: e.currentTarget.dataset.flag
    })
  },
 //如有心脏类疾病，请详述疾病名称和临床症状
  onPersonalHistoryInput: function (e) {
    this.setData({
      personalHistory: e.detail.value
    })
  },
  //家族癌症病史
  changeFamilyCancerHistoryFlag: function(e) {
    this.setData({
      familyCancerHistoryFlag: e.currentTarget.dataset.flag
    })
  },
  //家族癌症病史，临床表现-详情
  onClinicalManifestationInput: function(e) {
    this.setData({
      clinicalManifestation: e.detail.value
    })
  },
  //家族癌症病史，亲属关系
  onfamilyRelationInput: function(e) {
    this.setData({
      familyRelation: e.detail.value
    })
  },
  //家族癌症病史，亲属发病类型
  onCancer_typeInput: function(e) {
    this.setData({
      cancer_type: e.detail.value
    })
  },
  //家族癌症病史，亲属发病年龄
  onCancer_ageInput: function (e) {
    this.setData({
      cancer_age: e.detail.value
    })
  },
  onfamilyRelationInput: function (e) {
    this.setData({
      familyRelation: e.detail.value
    })
  },
  onClinicalDiagnosisInput: function(e) {
      this.setData({
        clinicalDiagnosis: e.detail.value
      })
  },
  changeClinicalDiagnosisFlag: function (e) {
    this.setData({
      clinicalDiagnosisFlag: e.currentTarget.dataset.flag
    })
  },
  onSetAgeInput: function(e){
    this.setData({
      onsetAge: e.detail.value
    })
  },
  //疑似遗传病
  changeBeGeneticFlag: function (e) {
    this.setData({
      beGeneticFlag: e.currentTarget.dataset.flag
    })
  },
  onBeGeneticInput: function (e) {
    this.setData({
      beGenetic: e.detail.value
    })
  },
  //近亲结婚
  changeNearRelationFlag: function(e) {
      this.setData({
        nearRelationFlag: e.currentTarget.dataset.flag
      })
  },
  onNearRelationInput: function(e) {
    this.setData({
      nearRelation: e.detail.value
    })
  },
  /**
   * 家族遗传病
   */
  onFamilyProduceInput: function(e) {
    this.setData({
      familyProduce: e.detail.value
    })
  },
  changeFamilyProduceFlag: function(e) {
    this.setData({
      familyProduceFlag: e.currentTarget.dataset.flag
    })
  },
  /**
   * 不良孕史
   */
  changeBadPregnancyFlag: function(e) {
    this.setData({
      badPregnancyFlag: e.currentTarget.dataset.flag
    })
  },
  onBadPpregnancyInput: function(e){
    this.setData({
      badPpregnancy: e.detail.value
    })
  },
  /**
   * 怀孕周期
   */
  onPregnancyTimeInput: function(e) {
      this.setData({
        pregnancyTime: e.detail.value
      })
  },
  changePregnancyFlag: function(e) {
      this.setData({
        pregnancyFlag: e.currentTarget.dataset.flag
      })
  },
  onLoad: function(options){
    console.dir(options);
    if (!! options.success){
      wx.navigateTo({
        url: '/pages/sample_success/sample_success',
      })
      return;
    }
    this.reloadData(options);
  },
  reloadData: function(options) {
    var that = this;
    var productCode = options.id;
    wx.showLoading({
      title: '载入中...',
      mask: true
    })
    wx.request({
      url: config.BASE_URL + '/wechat/getAllWechatItems.action',
      success: function (res) {
        var success = !!res.data.success;
        wx.hideLoading();
        if (!success) {
          wx.showToast({
            title: '加载失败!',
          })
          return;
        }
        var productList = res.data.rows;
        for (var key in productList) {
          productList[key].count = 1;
        }
        var tmpProducts = res.data.rows;
        console.dir(tmpProducts);
        if (tmpProducts) {
          wx.hideLoading();
          that.setData({
            loadSuccess: true
          })
          var product = null;
          var sampleType = null;
          var productNames = null;
          var productName = null;
          var index = 0;
          var products = null;
          var _type = '';
          for (var i = 0; i < tmpProducts.length; i++) {
            var tmpProduct = tmpProducts[i];
            if ('SD0126' === productCode && 'SD0126' == tmpProduct.itemCode) {
              //安全用药基因检测
              _type = 'SD0126';
              product = tmpProduct;
              sampleType = '口腔拭子';
              productNames = ['儿童安全用药基因检测', '成人安全用药基因检测'];
              products = [
                { code: 'SD0126', name: '儿童安全用药基因检测' },
                { code: 'SD0127', name: '成人安全用药基因检测' }
              ]
              break;
            } else if ('DX0630' === productCode && 'DX0630' == tmpProduct.itemCode) {
              //安馨可-新生儿及儿童基因检测
              _type = 'DX0630';
              product = tmpProduct;
              sampleType = '口腔拭子';
              productName = tmpProduct.name;
              productCode = tmpProduct.code;
              break;
            } else if ('DX1413' === productCode && 'DX1413' == tmpProduct.itemCode) {
              //安孕可-单基因遗传病携带者筛查
              _type = 'DX1413';
              product = tmpProduct;
              sampleType = '唾液';
              productName = tmpProduct.name;
              productCode = tmpProduct.code;
              break;
            } else if ('DX1267' === productCode && 'DX1267' == tmpProduct.itemCode) {
              //遗传性肿瘤基因检测
              _type = 'DX1267';
              product = tmpProduct;
              sampleType = '唾液';
              productNames = ['遗传性肿瘤基因检测(男性15种)', '遗传性肿瘤基因检测(女性16种)'];
              products = [
                { code: 'DX1267', name: '遗传性肿瘤基因检测(男性15种)' },
                { code: 'DX1268', name: '遗传性肿瘤基因检测(女性16种)' }
              ]
              break;
            } else if ('DX1327' === productCode && 'DX1327' == tmpProduct.itemCode) {
              //遗传性心律失常基因检测
              _type = 'DX1327';
              product = tmpProduct;
              productName = tmpProduct.name;
              productCode = tmpProduct.code;
              sampleType = '唾液';
              break;
            }
          }
          console.dir(product);
          if (product) {
            that.setData({
              product: product,
              sampleType: sampleType,
              productNames: productNames,
              products: products,
              _type: _type,
              mProductCode: productCode,
              mProductName: productName
            })
          }
          console.log(that.data._type);
        }

        var date = new Date();
        var sampleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        that.setData({
          sampleDate: sampleDate,
          screenH: wx.getSystemInfoSync().screenHeight,
        })
      }
    })
  },
  selectNativePlace: function () {
    this.setData({
      chooseNativePlace: !this.data.chooseNativePlace
    })
  },
  hideDialog: function () {
    this.setData({
      chooseNativePlace: false
    })
  },
  confirmVal: function () {
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
  onGenderChange: function(e){
    var gender = this.data.genders[e.detail.value];
    var name = gender.name;
    var value = gender.value;
    this.setData({
      gender: name,
      genderValue: value
    })
  },
  /**
   * 民族
   */
  onNationInput: function(e) {
    this.setData({
      nation: e.detail.value
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
            address: address,
            phone: e.telNumber
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
  //监护人
  onGuardianshipInput: function(e){
    this.setData({
      guardianship: e.detail.value
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
    } else if (this.data._type === 'SD0126') {
        if (!this.data.mProductName) {
          notice = '请选择产品';
        } else if (this.data.mProductCode === 'SD0126' && !this.data.guardianship) {
          notice = '请输入监护人姓名';
        }
    } else if (this.data._type === 'DX0630') {
      //安馨可
      if (!this.data.patientName) {
        notice = '请选择受检者类型';
      } else if (this.data.clinicalManifestationFlag == 1 && !this.data.clinicalManifestation) {
        notice = '请输入临床表现及诊断结果';
      } else if (!this.data.guardianship) {
        notice = '请输入监护人姓名';
      } else if (!this.data.email) {
        notice = '请输入邮件';
      } else if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.data.email)) {
        notice = '邮件格式不正确';
      } else if (!this.data.motherName) {
        notice = '请输入受检者母亲姓名';
      } else if (!this.data.motherAge) {
        notice = '请输入受检者母亲年龄';
      } else if (this.data.motherProduceFlag == 1 && !this.data.motherProduce){
        notice = '请输入受检者母亲遗传病史详情';
      } else if (!this.data.dnaFatherName) {
        notice = '请输入受检者父亲姓名';
      } else if (!this.data.fatherAge) {
        notice = '请输入受检者父亲年龄';
      } else if (this.data.fatherProduceFlag == 1 && !this.data.fatherProduce) {
        notice = '请输入受检者父亲遗传病史详情';
      }
    } else if (this.data._type === 'DX1413') {
      //安孕可
      if (this.data.pregnancyFlag == 1 && !this.data.pregnancyTime) {
        notice = '请输入孕周';
      } else if (this.data.pregnancyFlag == 1 && !/^\d+周\d+天$/.test(this.data.pregnancyTime)) {
        notice = '孕周格式不正确';
      } else if (this.data.badPregnancyFlag == 1 && !this.data.badPpregnancy) {
        notice = '请输入不良孕产史详情';
      } else if (this.data.familyProduceFlag == 1 && !this.data.familyProduce) {
        notice = '请输入家族遗传病史详情';
      } else if (this.data.nearRelationFlag == 1 && !this.data.nearRelation) {
        notice = '请输入婚姻双方亲属关系';
      } else if (this.data.beGeneticFlag == 1 && !this.data.beGenetic) {
        notice = '请输入疾病及临床症状';
      }
    } else if (this.data._type === 'DX1267') {
      //遗传性肿瘤
      if (!this.data.mProductName) {
        notice = '请选择产品';
      } else if (!this.data.patientName) {
        notice = '请选择受检者类型';
      } else if (!this.data.email) {
        notice = '请输入邮件';
      } else if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.data.email)) {
        notice = '邮件格式不正确';
      } else if (this.data.clinicalDiagnosisFlag == 1 && !this.data.clinicalDiagnosis) {
        notice = '请输入受检者癌症病史详情';
      } else if (this.data.clinicalDiagnosisFlag == 1 && !this.data.onsetAge) {
        notice = '请输入受检者癌症发病年龄';
      } else if (this.data.familyCancerHistoryFlag == 1 && !this.data.clinicalManifestation) {
        notice = '请输入家族癌症病史详情';
      } else if (this.data.familyCancerHistoryFlag == 1 && !this.data.familyRelation) {
        notice = '请输入与家族癌症病人的亲属关系';
      } else if (this.data.familyCancerHistoryFlag == 1 && !this.data.cancer_type) {
        notice = '请输入癌症病亲属的癌症类型';
      } else if (this.data.familyCancerHistoryFlag == 1 && !this.data.cancer_age) {
        notice = '请输入癌症病亲属的癌症发病年龄';
      }
    } else if (this.data._type === 'DX1327'){
      // 遗传性心律失常
      if (!this.data.email) {
        notice = '请输入邮件';
      } else if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.data.email)) {
        notice = '邮件格式不正确';
      } else  if (!this.data.patientName) {
        notice = '请选择受检者类型';
      }  else if (this.data.personalHistoryFlag == 1 && !this.data.personalHistory) {
        notice = '请输入心脏病史详情';
      } else if (this.data.familyProduceFlag == 1 && !this.data.familyRelation) {
        notice = '请输入与家族心脏病者的关系';
      } else if (this.data.familyProduceFlag == 1 && !this.data.familyProduce) {
        notice = '请输入家族心脏病史详情';
      } 
    }
    if(! notice) {
        if (!this.data.address) {
          notice = '请输入接收报告的地址';
        } else if (!this.data.phone) {
          notice = '请输入手机号';
        } else if (! /^1[34578]{1}\d{9}$/.test(this.data.phone)) {
          notice = '手机号格式错误';
        }
    }
    if(notice) {
        wx.showToast({
          title: notice,
          image: '/imgs/ic_wron.png'
        })
        return;
    }
    var url = '/pages/sample_confirm/sample_confirm';
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
    var params = '?sampleCode=' + this.data.sampleCode
      + '&sampleDate=' + this.data.sampleDate
      + '&username=' + this.data.username
      + '&gender=' + this.data.gender
      + '&genderValue=' + this.data.genderValue
      + '&birthDate=' + this.data.birthDate
      + '&age=' + this.data.age
      + '&nation=' + this.data.nation
      + '&nativePlace=' + this.data.nativePlace
      + '&phone=' + this.data.phone
      + '&address=' + this.data.address
      + '&productCode=' + this.data.mProductCode
      + '&productName=' + this.data.mProductName
    if (this.data._type === 'SD0126') {
      //TODO 安全用药
      console.log('安全用药');
      params = params
        + '&sampleType=08'//口腔拭子
        + '&guardianship=' + this.data.guardianship
    } else if (this.data._type === 'DX0630') {
      //TODO 安馨可
      console.log('安馨可');
      //patientName 受检者类型
      //clinicalManifestation临床表现
      params = params
        + '&sampleType=08'//口腔拭子
        + '&patientName=' + this.data.patientName
        + '&clinicalManifestation=' + this.data.clinicalManifestation
        + '&email=' + this.data.email
        + '&motherName=' + this.data.motherName
        + '&motherAge=' + this.data.motherAge
        + '&motherProduce=' + this.data.motherProduce
        + '&dnaFatherName=' + this.data.dnaFatherName
        + '&fatherAge=' + this.data.fatherAge
        + '&fatherProduce=' + this.data.fatherProduce
    } else if (this.data._type === 'DX1413') {
      //TODO 安孕可
      console.log('安孕可');
      params = params 
        + '&sampleType=18'//唾液
        + '&pregnancyTime=' + this.data.pregnancyTime//怀孕周期
        + '&badPpregnancy=' + this.data.badPpregnancy//不良怀孕历史描述
        + '&familyProduce=' + this.data.familyProduce//家族遗传病详情
        + '&beGenetic=' + this.data.beGenetic//疑似遗传病
        + '&nearRelation=' + this.data.nearRelation//近亲结婚，亲属关系
    } else if (this.data._type === 'DX1327') {
      //TODO 遗传性心律失常
      console.log('遗传性心律失常');
      params = params
        + '&sampleType=18'//唾液
        + '&patientName=' + this.data.patientName//受检者类型
        + '&email=' + this.data.email;//电子邮件
      if (this.data.personalHistoryFlag == 1) {
        params = params
          + '&personalHistory=' + this.data.personalHistory
      }
      if (this.data.familyProduceFlag == 1) {
        params = params
          + '&familyProduce=' + this.data.familyProduce
          + '&familyRelation=' + this.data.familyRelation
      } 
    } else if (this.data._type === 'DX1267') {
      //TODO 遗传性肿瘤基因检测
      console.log('遗传性肿瘤基因检测');
      params = params
        + '&sampleType=18'//唾液
        + '&patientName=' + this.data.patientName//受检者类型
        + '&email=' + this.data.email;//电子邮件
      if (this.data.clinicalDiagnosisFlag == 1 ) {
        params = params
        + '&clinicalDiagnosis=' + this.data.clinicalDiagnosis//受检者癌症病史
        + '&onsetAge=' + this.data.onsetAge;//受检者癌症病史,发病年龄
      }
      if (this.data.familyCancerHistoryFlag == 1) {
        params = params
          + '&clinicalManifestation=' + this.data.clinicalManifestation//家族癌症病史，临床表现-详情
          + '&familyRelation=' + this.data.familyRelation//家族癌症病史，亲属关系
          + '&cancerType=类型:' + this.data.cancer_type + ',年龄:' + this.data.cancer_age;//家族癌症病史，亲属发病类型和年龄
      }
    }
    wx.navigateTo({
      url: url + params + '&id='+this.data._type
    })
    // <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ns2:FrontWSMethod xmlns:ns2="http://sample.ws.front.bgi.com/"><arg0>lyz</arg0><arg1>123</arg1><arg2>saveSampleInfo</arg2><arg3>W3siYWRkcmVzcyI6ImFkZHJlc3MxIiwiYWRkcmVzc0NpdHkiOiIiLCJhZGRyZXNzQ291bnRyeSI6IiIsImFkZHJlc3NDb3VudHkiOiIiLCJhZGRyZXNzUHJvdmluY2UiOiIiLCJhZGRyZXNzU3RyZWV0IjoiIiwiYWRkcmVzc1Rvd24iOiIiLCJhZG9zY3VsYXRpb24iOiIiLCJhZmZpcm1JbmZvIjoiIiwiYWZmaXJtVGltZSI6IiIsImFmZmlybVVzZXIiOiIiLCJhbG93IjoiIiwiYW50aUluZmVjdGlvbiI6IiIsImFudGliaW90aWNzVXNlIjoiIiwiYXJlYU5hbWUiOiIiLCJiZWROdW0iOiIiLCJiaXJ0aERhdGUiOiIyMDE3LTExLTEyIiwiYmxvb2RDb2RlIjoiIiwiYmxvb2REYXRlIjoiMjAxNi0xMS0xMiIsImJsb29kTmFtZSI6IiIsImJvZHlIZWlnaHQiOiIiLCJib2R5V2VpZ2h0IjoiIiwiYm9uZU1hcnJvdyI6IiIsImNhbmNlckhpc3RvcnkiOiIiLCJjYW5jZXJUeXBlIjoiIiwiY2FzZU51bSI6IiIsImNoZWNrUmVhc29uIjoiIiwiY2hlY2tTdGF0dXMiOiIiLCJjaGVja1RpbWUiOiIiLCJjaGVja1VzZXIiOiIiLCJjaGVja1VzZXJOYW1lIjoiIiwiY2hlbW9yYWRpb3RoZXJhcHlIaXN0b3J5IjoiIiwiY2hlbW90aGVyYXB5Qmxvb2REYXRlIjoiIiwiY2xpbmljYWxEaWFnbm9zaXMiOiIiLCJjbGluaWNhbE1hbmlmZXN0YXRpb24iOiIiLCJjbGluaWNhbFN0YWdlcyI6IiIsImNvbnNhbmd1aW5lb3VzTWFycmlhZ2UiOiIiLCJjb252ZXJ0VHlwZSI6IiIsImNyZWF0ZVRpbWUiOiIiLCJjcmVhdGVVc2VyIjoiIiwiY3JwIjoiIiwiY3VsdHVyZVJlc3VsdCI6IiIsImN1cnJQYWdlIjowLCJjdXN0b21lckNvZGUiOiIiLCJjdXN0b21lck5hbWUiOiIiLCJjdXN0b21lclNpbXBsZVF1ZXJ5IjoiIiwiZGVsZXRlU3FsIjoiIiwiZGVsaXZlcnlNb2RlIjoiIiwiZGVwYXJ0bWVudHMiOiIiLCJkZXRlY3Rpb25Qcm9jZXNzIjoiIiwiZGlmZmVyZW50aWF0aW9uR3JhZGUiOiIiLCJkbmFGYXRoZXJJZENhcmQiOiIiLCJkbmFGYXRoZXJOYW1lIjoiIiwiZG5hTW90aGVySWRDYXJkIjoiIiwiZG5hTW90aGVyTmFtZSI6IiIsImRvY3RvckVtYWlsIjoiIiwiZG9jdG9yTmFtZSI6IiIsImRvY3RvclBob25lTnVtIjoiIiwiZHJhZnRJZCI6IiIsImRyYWZ0SWRzIjoiIiwiZHJhZnRTdGF0dXMiOiIiLCJkcmFmdFRpbWUiOiIiLCJkcmFmdFR5cGUiOiIiLCJkcmFmdFVzZXJOYW1lIjoiIiwiZWFyRGVmb3JtaXR5IjoiIiwiZW1haWwiOiIiLCJlbmREcmFmdFRpbWUiOiIiLCJlbmRRdWVyeVRpbWUiOiIiLCJlbmRSb3ciOjAsImZhbWlseUFkZHJlc3MiOiIiLCJmYW1pbHlDYW5jZXJIaXN0b3J5IjoiIiwiZmFtaWx5RGVhZm5lc3MiOiIiLCJmYW1pbHlEZWFmbmVzc0NvdW50IjoiIiwiZmFtaWx5RGVhZm5lc3NSZWxhdGlvbnNoaXAiOiIiLCJmYW1pbHlNZXRhYm9saWMiOiIiLCJmYW1pbHlNZXRhYm9saWNDb3VudCI6IiIsImZhbWlseU1ldGFib2xpY05hbWUiOiIiLCJmYW1pbHlNZXRhYm9saWNSZWxhdGlvbnNoaXAiOiIiLCJmYW1pbHlQcm9kdWNlIjoiIiwiZmFtaWx5UmVsYXRpb24iOiIiLCJmYXRoZXJBZ2UiOiIiLCJmaWxlUGF0aCI6IiIsImZpbGVWZXIiOiIiLCJmb2N1c09uUGF0aG9nZW4iOiIiLCJnZXN0YXRpb25hbFdlZWtzIjoiIiwiZ3VhcmRpYW5TaGlwIjoiZ3VhcmRpYW5TaGlwIiwiaGlzdG9yeU5pY3UiOiIiLCJob3NwaXRhbENvZGUiOiIiLCJob3NwdGlhbE51bSI6IiIsImh1c2JhbmRLYXJ5b3R5cGVzIjoiIiwiaHlwZXJ0aHlyb2lkaXNtIjoiIiwiaWRDYXJkIjoiIiwiaWRDYXJkVHlwZSI6IiIsImlkZW50aWZpY2F0aW9uUmVzdWx0cyI6IiIsImluZGl2aWR1YWxUdW1vckhpc3RvcnkiOiIiLCJpbnNlcnRMaXN0U3FsIjoiIiwiaW5zZXJ0U3FsIjoiIiwiaW9kaW5lRXhwb3N1cmUiOiIiLCJpc0NoZWNrIjoiIiwiaXNFZGl0IjoiMCIsImlzSGVhdnlCbG9vZCI6IiIsImthcnlvdHlwZSI6IiIsImtub3duTXV0YW50R2VuZSI6IiIsImxhc3RNb2RpZmllZFRpbWUiOiIiLCJsYXN0TW9kaWZpZWRVc2VyIjoiIiwibHltcGhvY3l0ZSI6IiIsIm1lZGljYXRpb25IaXN0b3J5IjoiIiwibWlycm9yVGVzdFJlc3VsdCI6IiIsIm1vdGhlckFnZSI6IiIsIm1vdGhlck1ldGFib2xpY090aGVyIjoiIiwibW90aGVyTmFtZSI6IiIsIm1vdGhlclBob25lTnVtIjoiIiwibmF0aW9uYWx0aWx5IjoibmF0aW9uYWx0aWx5MSIsIm5hdGl2ZVBsYWNlIjoibmF0aXZlUGxhY2UxIiwibmVlZFBlcm1pc3Npb24iOmZhbHNlLCJuZXV0cm9waGlscyI6IiIsIm9sZFNhbXBsZU51bSI6IiIsIm9uc2V0QWdlIjoiIiwib3BlcmF0b3JTUUxJZCI6IiIsIm9yZGVyQnkiOiIiLCJvdGhlckRpc2Vhc2VIaXN0b3J5IjoiIiwib3RoZXJJbmZvIjoiIiwicGFnZVNpemUiOjAsInBjdCI6IiIsInBlcnNvbmFsSGlzdG9yeSI6IiIsInBlcnNvbmFsUmVwcm9kdWN0aXZlSGlzdG9yeSI6IiIsInBoZW55bGtldG9udXJpYSI6IiIsInByZWduYW5jeUluZmVjdGlvbiI6IiIsInByZWduYW5jeVNpdHVhdGlvbiI6IiIsInByZXZpb3VzR2VuZVJlc3VsdHMiOiIiLCJwcmV2aW91c0hpc3RvcnkiOiIiLCJwcmltYXJ5TWV0YXN0YXRpYyI6IiIsInByb2JhbmQiOiIiLCJwcm9iYW5kTmFtZSI6IiIsInByb2JhbmRSZWxhdGlvbiI6IiIsInByb2R1Y3RDb2RlIjoiIiwicHJvZHVjdE5hbWUiOiIiLCJwcm9qZWN0Q29kZSI6IiIsInByb2plY3ROYW1lIjoiIiwicXVlcnlPbmVTcWwiOiIiLCJxdWVyeVJlYXNvbiI6IiIsInF1ZXJ5UmVhc29uQ2FjaGUiOiIiLCJxdWVyeVNxbCI6IiIsInF1ZXJ5VGltZSI6IiIsInJlY2VpdmVCbG9vZCI6IiIsInJlY2hlY2tUaW1lIjoiIiwicmVjaGVja1VzZXIiOiIiLCJyZXBvcnRBZGRyZXNzIjoiIiwicmVwb3J0UmVjZWl2ZSI6IiIsInNhbXBsZUFnZSI6InNhbXBsZUFnZTEiLCJzYW1wbGVCYXNlSWQiOiIiLCJzYW1wbGVCYXNlSWQyIjoiIiwic2FtcGxlRmlsZSI6bnVsbCwic2FtcGxlRmlsZUNvZGUiOiIiLCJzYW1wbGVJbmZvcyI6W10sInNhbXBsZU5hbWUiOiJzYW1wbGVOYW1lMSIsInNhbXBsZU51bSI6InNldFNhbXBsZU51bTEiLCJzYW1wbGVOdW1TaG9ydCI6IiIsInNhbXBsZU51bXMiOltdLCJzYW1wbGVQaG9uZU51bSI6InNhbXBsZVBob25lTnVtMSIsInNhbXBsZVJlY2lwaWVudEVtYWlsIjoiIiwic2FtcGxlUmVjaXBpZW50TmFtZSI6IiIsInNhbXBsZVNlbmREYXRlIjoiIiwic2FtcGxlU2VuZE5hbWUiOiIiLCJzYW1wbGVTZW5kUGhvbmVOdW0iOiIiLCJzYW1wbGVTZXgiOiIxIiwic2FtcGxlVHlwZSI6IiIsInNhbXBsZVR5cGVDbGFzc2lmeSI6IiIsInNhbXBsZVR5cGVPdGhlciI6IiIsInNhbXBsZVZvbHVtZSI6IiIsInNjb3BlVXNlciI6IiIsInNlYXJjaENyZWF0ZVRpbWUiOiIiLCJzZXJvbG9neSI6IiIsInNlcnVtVHVtb3JNYXJrZXIiOiIiLCJzbW9raW5nSGlzdG9yeSI6IiIsInNvcnRPcmRlciI6IiIsInNvdXJjZVR5cGUiOiIwIiwic3BlbGxOYW1lIjoiIiwic3RhcnREcmFmdFRpbWUiOiIiLCJzdGFydFF1ZXJ5VGltZSI6IiIsInN0YXJ0Um93IjowLCJzdGF0dXMiOiIiLCJzdGVwIjoiIiwic3RvcmFnZUxpZmUiOiIiLCJzdHJBcnIiOltdLCJzeW1wdG9tc0Rlc2NyaWJlZCI6IiIsInRhcmdldERydWdIaXN0b3J5IjoiIiwidG5tU3RhZ2VzIjoiIiwidG90YWwiOjAsInRveGljSGF6YXJkb3VzSGlzdG9yeSI6IiIsInRwbiI6IiIsInRyZWF0bWVudCI6IiIsInR1bWVyVHlwZSI6IiIsInR1bW9yTG9jYXRpb24iOiIiLCJ0dW1vclR5cGUiOiIiLCJ1bHRyYXNvbm9ncmFwaHkiOiIiLCJ1cGRhdGVTcWwiOiIiLCJ2aWV3UHJvZHVjdENvZGUiOiIiLCJ2aWV3UHJvZHVjdE5hbWUiOiIiLCJ2aWV3UHJvamVjdENvZGUiOiIiLCJ2aWV3UHJvamVjdE5hbWUiOiIiLCJ2aXNpdFNjcmVlbiI6IiIsIndiYyI6IiIsInpvbmVOYW1lIjoiIn1d</arg3></ns2:FrontWSMethod></soap:Body></soap:Envelope>
  },
  onProductChange: function(e){
    var product = this.data.products[e.detail.value];
    this.setData({
      mProductName: product.name,
      mProductCode: product.code,
      guardianship: ''
    })
  },
  /**
   * 受检者类型变化事件
   */
  onPatientChange: function(e) {
      var index = e.detail.value;
      this.setData({
        patientName: this.data.patientArray[index]
      })
  },
  /**
   * 临床表现
   */
  changeClinicalManifestationFlag: function(e){
    this.setData({
      clinicalManifestationFlag: e.currentTarget.dataset.flag
    })
  },
  /**
   * 电子邮件
   */
  onEmailInput: function(e) {
    this.setData({
      email: e.detail.value
    })
  },
  //母亲家族遗传史
  changeMotherProduceFlag: function(e) {
    this.setData({
      motherProduceFlag: e.currentTarget.dataset.flag
    })
  },
  //父亲家族遗传史
  changeFatherProduceFlag: function (e) {
    this.setData({
      fatherProduceFlag: e.currentTarget.dataset.flag
    })
  },
  onMotherNameInput: function (e) {
    this.setData({
      motherName: e.detail.value
    })
  },
  onMotherAgeInput: function (e) {
    this.setData({
      motherAge: e.detail.value
    })
  },
  onFatherNameInput: function (e) {
    this.setData({
      dnaFatherName: e.detail.value
    })
  },
  onFatherAgeInput: function (e) {
    this.setData({
      fatherAge: e.detail.value
    })
  },
  onClinicalManifestationChange: function(e) {
    this.setData({
      clinicalManifestation: e.detail.value
    })
  },
  onMotherProduceChange: function(e) {
    this.setData({
      motherProduce: e.detail.value
    })
  },
  onFatherProduceChange: function(e) {
    this.setData({
      fatherProduce: e.detail.value
    })
  },
  //不良孕史
  onPregnancyInput: function(e){
    this.setData({
      pregnancy: e.detail.value
    })
  }
})