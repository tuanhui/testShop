var config = require('../../utils/config.js');
// sample_confirm.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    sampleCode: '',//样品编号
    sampleDate: '',//采样日期
    username: '',//姓名
    gender: '',//性别
    genderValue: '',//性别-对应的传递服务器得值
    birthDate: '',//出生日期
    age: '',//年龄
    nation: '',//民族
    nativePlace: '',//籍贯
    guardianship: '',//监护人,如果选择产品为SD0126，则为必填
    phone: '',//联系电话
    address: '',//收货地址
    productCode: '',//产品编号
    productName: '',//产品名称
    sampleType: '',//样本类型
    //安孕可===start
    pregnancyTime:'',//怀孕周期
    badPpregnancy: '',//不良怀孕历史描述
    familyProduce: '',//家族遗传病详情
    beGenetic: '',//疑似遗传病
    nearRelation: '',//近亲结婚，亲属关系
    //安孕可===end
  
    //遗传性肿瘤start
    patientName: '',//受检者类型
    email: '',//电子邮件
    onsetAge: '',//受检者癌症病史,发病年龄
    clinicalDiagnosis:'',//受检者癌症病史
    clinicalManifestation: '',//家族癌症病史，临床表现-详情
    familyRelation: '',//家族癌症病史，亲属关系
    cancerType: '',//家族癌症病史，亲属发病类型和年龄 
    //遗传性肿瘤end
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.dir(options);
      var produce = '';
      if (options.motherProduce || options.fatherProduce) {
          var motherProduce = '受检者母亲:' + (options.motherProduce || '') + ',';
          var fatherProduce = '受检者父亲:' + (options.fatherProduce || '');
          produce = motherProduce + fatherProduce;
      }
      this.setData({
        id: options.id,
        sampleType: options.sampleType,//样本类型
        sampleCode: options.sampleCode,//样品编号
        sampleDate: options.sampleDate,//采样日期
        username: options.username,//姓名
        gender: options.gender,//性别
        genderValue: options.genderValue,//性别-对应的传递服务器得值
        birthDate: options.birthDate,//出生日期
        age: options.age,//年龄
        nation: options.nation,//民族
        nativePlace: options.nativePlace,//籍贯
        guardianship: options.guardianship,//监护人,如果选择产品为SD0126，则为必填
        phone: options.phone,//联系电话
        address: options.address,//收货地址
        productCode: options.productCode,//产品编号
        productName: options.productName,//产品名称
        patientName: options.patientName,//受检者类型
        clinicalManifestation: options.clinicalManifestation,//临床表现
        email: options.email,
        motherName: options.motherName,
        motherAge: options.motherAge,
        dnaFatherName: options.dnaFatherName,
        fatherAge: options.fatherAge,
        produce: produce,//家族遗传病史
      });
      console.log('CODE = ' + this.data.productCode);
      console.log('DX1627' === this.data.productCode || 'DX1628' === this.data.productCode);
      if ('DX1413' === this.data.productCode) {
        //安孕可
        this.setData({
          pregnancyTime: options.pregnancyTime,//怀孕周期
          badPpregnancy: options.badPpregnancy,//不良怀孕历史描述
          familyProduce: options.familyProduce,//家族遗传病详情
          beGenetic: options.beGenetic,//疑似遗传病
          nearRelation: options.nearRelation,//近亲结婚，亲属关系
        })
      } else if ('DX0630' === this.data.productCode) {
        //安馨可
        this.setData({
          guardianship: options.guardianship,//监护人,如果选择产品为SD0126，则为必填
          patientName: options.patientName,//受检者类型
          clinicalManifestation: options.clinicalManifestation,//临床表现
          email: options.email,//电子邮件
          motherName: options.motherName,//母亲姓名
          motherAge: options.motherAge,//母亲年龄
          dnaFatherName: options.dnaFatherName,//父亲姓名
          fatherAge: options.fatherAge,//父亲年龄
          motherProduce: options.motherProduce, //母亲家族遗传病详情
          fatherProduce: options.fatherProduce,//父亲家族遗传病详情
        })
      } else if ('DX1627' === this.data.productCode || 'DX1628' === this.data.productCode) {
        //遗传性肿瘤
        this.setData({
          patientName: options.patientName,//受检者类型
          email: options.email,//电子邮件
          onsetAge: options.onsetAge,//受检者癌症病史,发病年龄
          clinicalDiagnosis: options.clinicalDiagnosis,//受检者癌症病史
          clinicalManifestation: options.clinicalManifestation,//家族癌症病史，临床表现-详情
          familyRelation: options.familyRelation,//家族癌症病史，亲属关系
          cancerType: options.cancerType,//家族癌症病史，亲属发病类型和年龄 
        })
      } else if ('DX1327' === this.data.productCode) {
        // 遗传性心律失常
        this.setData({
          patientName: options.patientName,//受检者类型
          email: options.email,//电子邮件
          personalHistory: options.personalHistory,//受检者心脏病史详情
          familyRelation: options.familyRelation,//受检者与家族心脏病者的关系'
          familyProduce: options.familyProduce,//家族心脏病史详情
        }) 
      }
  },
  arrayBufferToString: function (buffer) {
    var arr = new Uint8Array(buffer);
    var str = String.fromCharCode.apply(String, arr);
    if (/[\u0080 -\uffff] /.test(str)) {
      throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
  },
  toUTF8Array: function (str) {
      var utf8 = [];
      for(var i= 0; i<str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
          0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode = 0x10000 + (((charcode & 0x3ff) << 10)
          | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
},
confirm: function(e) {
    var obj = [
      {
        sampleNum: this.data.sampleCode,
        bloodDate: this.data.sampleDate,
        sampleName: this.data.username,
        sampleSex: this.data.genderValue,
        birthDate: this.data.birthDate,
        sampleAge: this.data.age,
        nationaltily: this.data.nation,
        nativePlace: this.data.nativePlace,
        samplePhoneNum: this.data.phone,
        address: this.data.address,
        customerCode: 'DXCN000465', //华大基因有限公司-大客户部
        sourceType: "02",
        "sampleInfos": [
            {
              productCode: this.data.productCode,
              productName: this.data.productName
           }
        ],
      }
    ];
    if ('SD0126' === this.data.productCode) {
        obj[0].guardianship = this.data.guardianship;//监护人,如果选择产品为SD0126，则为必填
    }
    if ('DX1413' === this.data.productCode){
        //安孕可start
        obj[0].gestationalWeeks = this.data.pregnancyTime;//怀孕周期
        obj[0].abnormalPregnancyHistory = this.data.badPpregnancy ? 1 : 0;
        obj[0].personalReproductiveHistory = this.data.badPpregnancy;//不良怀孕历史描述
        obj[0].familyProduce = this.data.familyProduce;//家族遗传病详情
        obj[0].clinicalManifestation = this.data.beGenetic;//疑似遗传病
        obj[0].familyRelation = this.data.nearRelation;//近亲结婚，亲属关系
        //安孕可end
    } else if ('DX0630' === this.data.productCode){
        //安馨可start
        obj[0].guardianship = this.data.guardianship;//监护人
        obj[0].personType = this.data.patientName;//受检者类型
        obj[0].clinicalManifestation = this.data.clinicalManifestation;//临床表现
        obj[0].sampleRecipientEmail = this.data.email;//电子邮件
        obj[0].motherName = this.data.motherName;//母亲姓名
        obj[0].motherAge = this.data.motherAge;//母亲年龄
        obj[0].dnaFatherName = this.data.dnaFatherName;//父亲姓名
        obj[0].fatherAge = this.data.fatherAge;//父亲年龄
        obj[0].familyProduce = (this.data.fatherProduce || this.data.motherProduce) ? ('父亲：' + this.data.fatherProduce + ',母亲：' + this.data.motherProduce) : ''; //家族遗传病详情
        //安馨可end
    } else if ('DX1267' === this.data.productCode){
        //遗传性肿瘤start
        obj[0].patientName = this.data.patientName;//受检者类型
        obj[0].email = this.data.email;//电子邮件
        obj[0].onsetAge = this.data.onsetAge;//受检者癌症病史,发病年龄
        obj[0].clinicalDiagnosis = this.data.clinicalDiagnosis;//受检者癌症病史
        obj[0].clinicalManifestation = this.data.clinicalManifestation;//家族癌症病史，临床表现-详情
        obj[0].familyRelation = this.data.familyRelation;//家族癌症病史，亲属关系
        obj[0].cancerType = this.data.cancerType;//家族癌症病史，亲属发病类型和年龄 
        //遗传性肿瘤end
    } else if ('DX1327' === this.data.productCode) {
        // 遗传性心律失常
        obj[0].patientName = this.data.patientName;//受检者类型
        obj[0].email = this.data.email;//电子邮件
        obj[0].personalHistory = this.data.personalHistory;//受检者心脏病史详情
        obj[0].familyRelation = this.data.familyRelation;//受检者与家族心脏病者的关系'
        obj[0].familyProduce = this.data.familyProduce;//家族心脏病史详情
    }
    console.dir(obj);
    /**
     [{"address":"address1","addressCity":"","addressCountry":"","addressCounty":"","addressProvince":"","addressStreet":"","addressTown":"","adosculation":"","affirmInfo":"","affirmTime":"","affirmUser":"","alow":"","antiInfection":"","antibioticsUse":"","areaName":"","bedNum":"","birthDate":"2017-11-12","bloodCode":"","bloodDate":"2016-11-12","bloodName":"","bodyHeight":"","bodyWeight":"","boneMarrow":"","cancerHistory":"","cancerType":"","caseNum":"","checkReason":"","checkStatus":"","checkTime":"","checkUser":"","checkUserName":"","chemoradiotherapyHistory":"","chemotherapyBloodDate":"","clinicalDiagnosis":"","clinicalManifestation":"","clinicalStages":"","consanguineousMarriage":"","convertType":"","createTime":"","createUser":"","crp":"","cultureResult":"","currPage":0,"customerCode":"","customerName":"","customerSimpleQuery":"","deleteSql":"","deliveryMode":"","departments":"","detectionProcess":"","differentiationGrade":"","dnaFatherIdCard":"","dnaFatherName":"","dnaMotherIdCard":"","dnaMotherName":"","doctorEmail":"","doctorName":"","doctorPhoneNum":"","draftId":"","draftIds":"","draftStatus":"","draftTime":"","draftType":"","draftUserName":"","earDeformity":"","email":"","endDraftTime":"","endQueryTime":"","endRow":0,"familyAddress":"","familyCancerHistory":"","familyDeafness":"","familyDeafnessCount":"","familyDeafnessRelationship":"","familyMetabolic":"","familyMetabolicCount":"","familyMetabolicName":"","familyMetabolicRelationship":"","familyProduce":"","familyRelation":"","fatherAge":"","filePath":"","fileVer":"","focusOnPathogen":"","gestationalWeeks":"","guardianShip":"guardianShip","historyNicu":"","hospitalCode":"","hosptialNum":"","husbandKaryotypes":"","hyperthyroidism":"","idCard":"","idCardType":"","identificationResults":"","individualTumorHistory":"","insertListSql":"","insertSql":"","iodineExposure":"","isCheck":"","isEdit":"0","isHeavyBlood":"","karyotype":"","knownMutantGene":"","lastModifiedTime":"","lastModifiedUser":"","lymphocyte":"","medicationHistory":"","mirrorTestResult":"","motherAge":"","motherMetabolicOther":"","motherName":"","motherPhoneNum":"","nationaltily":"nationaltily1","nativePlace":"nativePlace1","needPermission":false,"neutrophils":"","oldSampleNum":"","onsetAge":"","operatorSQLId":"","orderBy":"","otherDiseaseHistory":"","otherInfo":"","pageSize":0,"pct":"","personalHistory":"","personalReproductiveHistory":"","phenylketonuria":"","pregnancyInfection":"","pregnancySituation":"","previousGeneResults":"","previousHistory":"","primaryMetastatic":"","proband":"","probandName":"","probandRelation":"","productCode":"","productName":"","projectCode":"","projectName":"","queryOneSql":"","queryReason":"","queryReasonCache":"","querySql":"","queryTime":"","receiveBlood":"","recheckTime":"","recheckUser":"","reportAddress":"","reportReceive":"","sampleAge":"sampleAge1","sampleBaseId":"","sampleBaseId2":"","sampleFile":null,"sampleFileCode":"","sampleInfos":[],"sampleName":"sampleName1","sampleNum":"setSampleNum1","sampleNumShort":"","sampleNums":[],"samplePhoneNum":"samplePhoneNum1","sampleRecipientEmail":"","sampleRecipientName":"","sampleSendDate":"","sampleSendName":"","sampleSendPhoneNum":"","sampleSex":"1","sampleType":"","sampleTypeClassify":"","sampleTypeOther":"","sampleVolume":"","scopeUser":"","searchCreateTime":"","serology":"","serumTumorMarker":"","smokingHistory":"","sortOrder":"","sourceType":"0","spellName":"","startDraftTime":"","startQueryTime":"","startRow":0,"status":"","step":"","storageLife":"","strArr":[],"symptomsDescribed":"","targetDrugHistory":"","tnmStages":"","total":0,"toxicHazardousHistory":"","tpn":"","treatment":"","tumerType":"","tumorLocation":"","tumorType":"","ultrasonography":"","updateSql":"","viewProductCode":"","viewProductName":"","viewProjectCode":"","viewProjectName":"","visitScreen":"","wbc":"","zoneName":""}]
     */
    var that = this;
    var bytes = this.toUTF8Array(JSON.stringify(obj));
    var arg3 = wx.arrayBufferToBase64(bytes);
    var value = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' 
                + '<soap:Body>'
                + '<ns2:FrontWSMethod xmlns:ns2="http://sample.ws.front.bgi.com/">' 
                + '<arg0>chentuanhui</arg0>'
                + '<arg1>123</arg1>'
                + '<arg2>saveSampleInfo</arg2>'
                + '<arg3>'+arg3+'</arg3>' 
                + '</ns2:FrontWSMethod>'
                + '</soap:Body>' 
                + '</soap:Envelope>';
    console.log(value);
    wx.showLoading({
      title: '正在提交...',
      mask: true,
    })
    wx.request({
      url: config.BASE_URL +'/service/service?wsdl',
      method: 'post',
      data: value,
      success: function(e) {
        console.log("success!");
        console.dir(e);
        var str = e.data;
        var regex = new RegExp(/\<return\>.*\<\/return\>/gi);
        var matches = str.match(regex);
        var result = matches[0];
        result = result.substring(8, result.lastIndexOf('</'));
        console.log(result);
        var obj = wx.base64ToArrayBuffer(result);
        var rs = JSON.parse(that.arrayBufferToString(obj));
        if (rs.success) {
          wx.hideLoading();
          wx.reLaunch({
            url: '/pages/sample_success/sample_success',
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '提交失败，请稍后重试！',
          })
        }
      },
      fail: function(e){
        console.log('failed!')
        console.dir(e);
        wx.hideLoading();
        wx.showToast({
          title: '提交失败，请稍后重试！',
        })
      }
    })
  },
  /**
   * 监护人
   */
  onGuardianshipInput: function(e) {
    this.setData({
      guardianship: e.detail.value
    })
  }
})