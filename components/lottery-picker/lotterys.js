// components/lottery-picker/lotterys.js
/**
 * @author York Wang <https://github.com/noisyle>
 */
const lotterys = {
  dlt: {
    name: '超级大乐透',
    category: 1,
    params: [{
      name: '前区',
      total: 35,
      chance: 5,
      color: '#4596E2'
    }, {
      name: '后区',
      total: 12,
      chance: 2,
      color: '#F5A60A'
    }]
  },
  ssq: {
    name: '双色球',
    category: 1,
    params: [{
      name: '红球',
      total: 33,
      chance: 6,
      color: '#F04848'
    }, {
      name: '蓝球',
      total: 16,
      chance: 1,
      color: '#4596E2'
    }]
  },
  fc3d: {
    name: '福彩3D',
    category: 2,
    params: [{
      name: '第一位',
      total: 10,
      chance: 1,
      color: '#549FE0'
    }, {
      name: '第二位',
      total: 10,
      chance: 1,
      color: '#549FE0'
    }, {
      name: '第三位',
      total: 10,
      chance: 1,
      color: '#549FE0'
    }]
  },
  pl3: {
    name: '排列三',
    category: 2,
    params: [{
      name: '第一位',
      total: 10,
      chance: 1,
      color: '#CB72B6'
    }, {
      name: '第二位',
      total: 10,
      chance: 1,
      color: '#CB72B6'
    }, {
      name: '第三位',
      total: 10,
      chance: 1,
      color: '#CB72B6'
    }]
  },
  pl5: {
    name: '排列五',
    category: 2,
    params: [{
      name: '第一位',
      total: 10,
      chance: 1,
      color: '#CB72B6'
    }, {
      name: '第二位',
      total: 10,
      chance: 1,
      color: '#CB72B6'
    }, {
      name: '第三位',
      total: 10,
      chance: 1,
      color: '#CB72B6'
    }, {
      name: '第四位',
      total: 10,
      chance: 1,
      color: '#CB72B6'
    }, {
      name: '第五位',
      total: 10,
      chance: 1,
      color: '#CB72B6'
    }]
  },
  qxc: {
    name: '七星彩',
    category: 2,
    params: [{
      name: '第一位',
      total: 10,
      chance: 1,
      color: '#6269CC'
    }, {
      name: '第二位',
      total: 10,
      chance: 1,
      color: '#6269CC'
    }, {
      name: '第三位',
      total: 10,
      chance: 1,
      color: '#6269CC'
    }, {
      name: '第四位',
      total: 10,
      chance: 1,
      color: '#6269CC'
    }, {
      name: '第五位',
      total: 10,
      chance: 1,
      color: '#6269CC'
    }, {
      name: '第六位',
      total: 10,
      chance: 1,
      color: '#6269CC'
    }, {
      name: '第七位',
      total: 15,
      chance: 1,
      color: '#F5A631'
    }]
  },
  qlc: {
    name: '七乐彩',
    category: 1,
    params: [{
      name: '号码',
      total: 30,
      chance: 7,
      color: '#F04848'
    }]
  },
}

module.exports = {
  lotterys: lotterys
}