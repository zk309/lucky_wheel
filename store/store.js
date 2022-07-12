// 在这个 JS 文件夹中, 专门来创建 Store 的实例对象. 
import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  // 数据字段
  active: 0, // 选中
  // 奖品列表
  prize: [
    {
      'name': '谢谢参与', // 奖品名字
      'winnning': 100, // 自定义的区间, 例如 "谢谢参与" 的区间是100-50
      'count': 50 // 在 100 中, 出现的次数, 实际为概率.
    }, 
    {
      'name': '一元',
      'winnning': 50,
      'count': 40
    },
    {
      'name': '三元',
      'winnning': 10,
      'count': 7
    }, 
    {
      'name': '五元',
      'winnning': 3,
      'count': 1
    },
    {
      'name': '六元',
      'winnning': 2,
      'count': 1
    }, {
      'name': '十元',
      'winnning': 1,
      'count': 1
    }, 
  ],
  // 奖品记录
  record: [],
  // 计算属性
  // actions 函数, 专门来修改 Store 中数据的值
  updateActive: action(function (step) {
    this.active = step
  }),
  // 添加 record 中获得的奖品列表
  updateRecord: action(function(step) {
      this.record = [...this.record, step]
  }),
  // 重新开始, 清空抽奖记录函数
  updateRestart: action(function(step) {
      this.record = []
  })
})