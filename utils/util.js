const formatTime = (date, fmt) => {
  fmt || (fmt = 'yyyy-MM-dd HH:mm:ss')
  const weekDays = '一二三四五六日'
  const opt = {
    'y+': date.getFullYear().toString(),
    'M+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'm+': date.getMinutes().toString(),
    's+': date.getSeconds().toString(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  for (let k in opt) {
    const ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  if(/(E+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + weekDays[date.getDay() + ''])
  }
  return fmt
}

module.exports = {
  formatTime: formatTime
}
