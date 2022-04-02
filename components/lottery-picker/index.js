// components/lottery-picker/index.js
/**
 * @author York Wang <https://github.com/noisyle>
 */
const { lotterys } = require('./lotterys.js')
Component({
  properties: {
    /**
     * 彩种代码: dlt,ssq,fc3d,pl3,pl5,qxc,qlc
     */
    lottery: {
      type: String,
      value: 'dlt'
    },
    /**
     * 确认按钮文字
     */
    btnConfirm: {
      type: String,
      value: '确定'
    },
    /**
     * 是否显示选号面板
     */
    show: {
      type: Boolean,
      value: false
    },
  },

  data: {
    /**
     * 选号方式，目前分为两类
     * 1: 分区选号，分区内无先后顺序。如大乐透、双色球、七乐彩
     * 2: 指定位数选号，每位可选值0-9，位数有先后顺序。如福彩3D、排列3、排列5、七星彩
     */
    category: 0,
    params: [],
    confirmable: false,
    visible: false,
  },

  methods: {
    _init(lottery) {
      if (lotterys[lottery]) {
        const { category, params } = lotterys[lottery]
        params.forEach((e, i) => {
          e.numbers = new Array(params[i].total).fill('').map((n, j) => {
            return { value: category === 1 ? (j >= 9 ? '' : '0') + (j + 1) : '' + j, selected: false }
          })
          e.selected = new Array(params[i].chance).fill('')
        })
        this.setData({ category, params, confirmable: false })
      } else {
        console.warn('不支持的彩种: ', this.data.lottery)
      }
    },
    _setVisible(visible) {
      this.setData({ visible: visible })
    },
    toggleSelect(e) {
      const { group, index, value } = e.currentTarget.dataset
      const pathNumber = `params[${group}].numbers[${index}].selected`
      const flag = this.data.params[group].numbers[index].selected

      // 已经达到该区可选上限，跳过选中操作
      if (!flag && this.data.params[group].numbers.filter(e => e.selected).length === this.data.params[group].chance) return

      // 更新点选区状态
      this.setData({
        [pathNumber]: !flag
      })

      // 更新选择结果区状态
      const selected = this.data.params[group].numbers.filter(e => e.selected).map(e => e.value)
      this.setData({
        [`params[${group}].selected`]: selected.concat(new Array(this.data.params[group].chance - selected.length).fill(''))
      })

      // 判断是否可以提交
      this.setData({
        confirmable: (this.data.params.filter(g => g.numbers.filter(e => e.selected).length < g.chance).length === 0)
      })
    },
    submit() {
      if (!this.data.confirmable) return
      this.triggerEvent('submit', {
        value: this.data.category === 1 ? this.data.params.map(g => g.selected.join()) : [this.data.params.map(g => g.selected[0]).join()]
      }, {})
      this._setVisible(false)
    },
    cancel() {
      this.triggerEvent('cancel', {}, {})
      this._setVisible(false)
    },
  },

  observers: {
    'lottery': function (lottery) {
      this._init(lottery)
    },
    'show': function (show) {
      this._setVisible(show)
    },
  }
})