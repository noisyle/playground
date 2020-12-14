// components/lottery-picker/config.js
/**
 * @author York Wang <https://github.com/noisyle>
 */
const configs = {
  dlt: {
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
  configs: configs
}