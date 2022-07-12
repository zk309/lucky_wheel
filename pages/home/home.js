import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFlag: false, // 节流, 防止多次点击, 出发多次事件.
    list: null, // 列表
    weight: null // 权重
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMobx() // 配置 Mobx
  },
  
  // MobX 全局数据共享
  getMobx() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['prize', 'record'],
      actions: ['updateRecord', 'updateRestart']
    })
  },

  // 点击 重新开始按钮
  getRestart() {
    this.updateRestart()
    wx.showToast({
        title: '游戏已经重新开始!-_-!',
        icon: 'none',
        duration: 2000,
        mask: true
    })
  },

  // 点击 开始抽奖
  rotate() {
    // 没有抽奖机会时
    if (this.data.record.length === 3) {
        wx.showToast({
            title: '很可惜, 你已经抽完奖了!',
            icon: 'none',
            duration: 2000,
            mask: true
        })
        return
    }
    // 节流处理
    if (this.data.isFlag) return
    this.setData({
        isFlag: true
    })

    // 生成随机数
    let num = Math.floor(Math.random() * (100-0+1))
    // 概率问题 - 权重法
    let randomWeight = [...this.data.weight, num] // 随机数添加到数组中
    let aa = randomWeight.sort(function(a, b) {return b-a}) // 新得到的数组排序
    let numIndex = aa.indexOf(num) - 1 // 获得的奖项在 list 中的下标
    if (numIndex < 0) { // 如果 numIndex < 0, 则下标设为 0
        numIndex = 0
    } 
    console.log(aa)
    console.log(this.data.list[numIndex])

    // 旋转的角度
    let angle = null;
    switch(this.data.list[numIndex]) {
        case '谢谢参与':
            angle = Math.floor(Math.random()*(29-1+1))+1
            break;
        case '一元':
            angle = -(Math.floor(Math.random()*(89-31+1))+31)
            break;
        case '三元':
            angle = -(Math.floor(Math.random()*(149-91+1))+91)
            break;
        case '五元':
            angle = -(Math.floor(Math.random()*(209-151+1))+151)
            break;
        case '六元':
            angle = -(Math.floor(Math.random()*(269-211+1))+211)
            break;
        case '十元':
            angle = -(Math.floor(Math.random()*(329-271+1))+271)
            break;
    }
    console.log(angle)
    
    // 转盘旋转效果
    // 关键帧动画
    this.animate('#zhuan', [{
        rotate: 0,
        ease: 'ease-in-out'
      },
      {
        rotate: 360*6 + angle,
        ease: 'ease-in-out'
      }
    ], 5000, function () {
        this.setData({
            isFlag: false
        })
        let info = this.data.list[numIndex]
        // 发送自己的抽奖信息
        wx.showToast({
            title: info,
            icon: 'none',
            duration: 2000,
            mask: true
        })
        // 将获得的奖品添加到 Mobx 中的 record
        this.updateRecord(info)
      }.bind(this))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 给 list 数组赋值
    let list = this.data.prize.map(item => item.name)
    let weight = this.data.prize.map(item => item.winnning)
    this.setData({
        list: list,
        weight: weight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // MobX 全局数据共享:
    this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})