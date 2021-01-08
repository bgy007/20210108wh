const userUrl = require('../../config.js').userUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currencyIndex: -1,
        idTypeIndex: -1,
        
      //   reCurrencycode:'',//币种
      //   reMoneyAmount: '',//汇款金额
      //   reAccountno: '',//汇款人账号
      //   reName: '',//汇款人名称
      //   reAddress: '',//汇款人地址
      //   reIdtypecode: '',//汇款人证件类型
      //   coDepositbankNo: '',//收款人开户银行在其代理行账号
      //   coDepositbankName: '',//收款人开户银行名称
      //   coDepositbankAddress: '',//收款人开户银行地址
      //   coAccountno: '',//收款人账号
      //   coName: '',//收款人名称
      //   coAddress: '',//收款人地址
      //   reRemark: '',//汇款附言
  
        formData: {
  
        },
        rules: [{
          name: 'reMoneyAmount',
          rules: {required: true, message: '汇款金额必填'}
      }
      // ,{
      //     name: 'reAccountno',
      //     rules: {required: true, message: '汇款人账号必填'}
      // },{
      //     name: 'reName',
      //     rules: {required: true, message: '汇款人名称必填'}
      // },{
      //     name: 'reAddress',
      //     rules: {required: true, message: '汇款人地址必填'}
      // },{
      //     name: 'reIdtypecode',
      //     rules: {required: true, message: '汇款人证件类型必填'}
      // },{
      //     name: 'coDepositbankNo',
      //     rules: {required: true, message: '收款人开户银行在其代理行账号必填'}
      // },{
      //     name: 'coDepositbankName',
      //     rules: {required: true, message: '收款人开户银行名称必填'}
      // },{
      //     name: 'coDepositbankAddress',
      //     rules: {required: true, message: '收款人开户银行地址必填'}
      // },{
      //     name: 'coAccountno',
      //     rules: {required: true, message: '收款人账号必填'}
      // },{
      //     name: 'coName',
      //     rules: {required: true, message: '收款人名称必填'}
      // },{
      //     name: 'coAddress',
      //     rules: {required: true, message: '收款人地址必填'}
      // },{
      //     name: 'reRemark',
      //     rules: {required: true, message: '汇款附言必填'}
      // }
  ]
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取币种字典数据
        this.selectDictDataList('currency');
        //获取证件类型字典数据
        this.selectDictDataList('idType');
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
    //之前的方法
    loginHandle:function(){
        console.log(this.data);
        console.log(this.data.reMoneyAmount);
    },
    //输入框改变事件
    inputChangeHandle:function(e){
        var prop = e.target.dataset['prop'];
        var changed = {};
        changed['formData.'+prop] = e.detail.value;
        this.setData(changed)
    },
//保存表单数据
addHandle:function(){
    var obj = this.data.formData;
    wx.request({
      url: userUrl+'/overseasRemittance/remittance/add',
      data: obj,
      method:'POST',
      header:{
          'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
          //保存成功 清空表单数据 调整页面
        console.log('保存成功');
        console.log(res.data);
      },
      fail:function(res){
        console.log("--------fail--------");
      }
    })
},
    //证件类型改变事件
    bindIdTypeChange: function(e) {
        var itCode = this.data.it[e.detail.value].dictValue;
        var itName = this.data.it[e.detail.value].dictLabel;
        var changed = {};
        changed['idTypeIndex'] = e.detail.value;
        changed['formData.reIdtypecode'] = itCode;
        changed['formData.reIdtypename'] = itName;
        this.setData(changed)
    },
    //币种类型改变事件
    bindCurrencyChange: function(e) {
        var rcCode = this.data.rc[e.detail.value].dictValue;
        var rcName = this.data.rc[e.detail.value].dictLabel;
        var changed = {};
        changed['currencyIndex'] = e.detail.value;
        changed['formData.reCurrencycode'] = rcCode;
        changed['formData.reCurrencyname'] = rcName;
        this.setData(changed)
    },

      submitForm() {
            //校验币种和证件类型是否选择
            if(this.data.currencyIndex == -1){
                this.setData({
                    error: '币种必选'
                })
            }
            if(this.data.idTypeIndex == -1){
                this.setData({
                    error: '汇款人证件类型必选'
                })
            }
          this.selectComponent('#form').validate((valid, errors) => {
              console.log('valid', valid, errors)
              if (!valid) {
                  const firstError = Object.keys(errors)
                  if (firstError.length) {
                      this.setData({
                          error: errors[firstError[0]].message
                      })
  
                  }
              } else {
                //保存表单
                this.addHandle();
              }
          })
      },
      //打印
      dyHandle:function(){
          console.log(this.data.formData);
      },
      //查询字典数据
      selectDictDataList:function(dicType){
        if(dicType == '' || dicType == undefined){
            this.setData({
                error: '字典获取异常'
            })
        }
        wx.request({
          url: userUrl+'/overseasRemittance/remittance/dictDataList',
          data: {
            dictType:dicType
          },
          method:'POST',
          header:{
              'content-type': 'application/x-www-form-urlencoded'
          },
          success:(res)=>{
            if(dicType == 'currency'){
                this.setData({
                    rc: res.data.data
                })
            }else{
                this.setData({
                    it: res.data.data
                })
            }
          },
          fail:function(res){
            this.setData({
                error: '字典获取异常'
            })
          }
        })
      }
  })