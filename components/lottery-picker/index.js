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
    lottery: String,
    /**
     * 是否显示选号面板
     */
    show: Boolean,
  },

  data: {
    /**
     * 选号方式，目前支持两类
     * 1: 分区选号，分区内无先后顺序。如大乐透、双色球、七乐彩
     * 2: 指定位数选号，每位可选值0-9，位数有先后顺序。如福彩3D、排列3、排列5、七星彩
     */
    category: 0,
    params: [],
    confirmable: false,
    height: 0,
    top: 2000,
  },

  methods: {
    _init(lottery) {
      const config = lotterys[lottery]
      if (config) {
        config.params.forEach((e, i) => {
          e.numbers = new Array(config.params[i].total).fill('').map((n, j) => {
            return {
              value: config.category === 1 ? (j >= 9 ? '' : '0') + (j + 1) : '' + j,
              selected: false
            }
          })
          e.selected = new Array(config.params[i].chance).fill('')
        })
        this.setData({
          category: config.category,
          params: config.params,
          confirmable: false
        })
      } else {
        console.warn('不支持的彩种:', this.data.lottery)
      }
    },
    _toggleVisible(visible) {
      this.setData({
        top: visible ? 0 : this.data.height
      })
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

      const selected = this.data.params[group].numbers.filter(e => e.selected).map(e => e.value)
      const pathSelected = `params[${group}].selected`
      // 更新选择结果区状态
      this.setData({
        [pathSelected]: selected.concat(new Array(this.data.params[group].chance - selected.length).fill(''))
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
    }
  },

  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync()
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
      // 状态栏高度
      const statusBarHeight = systemInfo.statusBarHeight
      // 导航栏高度 = 胶囊高度 + 胶囊上下的 margin
      const navBarHeight = menuButtonInfo.height + (menuButtonInfo.top - systemInfo.statusBarHeight) * 2
      // 选号面板高度 = 可用窗口高度 - 状态栏高度 - 导航栏高度
      const height = systemInfo.windowHeight - statusBarHeight - navBarHeight
      this.setData({
        height: height,
        top: height,
      })
    },
  },

  observers: {
    'lottery': function (lottery) {
      this._init(lottery)
    },
    'show': function (show) {
      this._toggleVisible(show)
    },
  }
})
