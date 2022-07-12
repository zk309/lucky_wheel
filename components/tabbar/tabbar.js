// components/tabbar/tabbar.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Component({
   // 将 Store 中的成员绑定到组件中
   behaviors: [storeBindingsBehavior], // 通过 storeBindingsBehavior 来实现自我绑定
  
   storeBindings: {
     store, // 指定要绑定的 Store
     fields: {  // 指定绑定的字段数据
      active: 'active', // 绑定数据的第 3 种方式
      prize: 'prize',
      record: 'record'
     },
     actions: { // 指定要绑定的方法
      updateActive: 'updateActive'
     }
   },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  observers: {
    'record': function() {
        console.log(this.data.record)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // Vant Weapp 默认的方法
    onChange(event) {
      console.log(event.detail)
      // event.detail 的值为当前选中项的索引
      this.updateActive(event.detail)
      // 跳转页面
      if (event.detail === 1) {
        wx.navigateTo({
          url: '/pages/record/record'
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    },

    // 获得奖品数量的方法
    getCount() {
      console.log(count)
    }
  }
})
