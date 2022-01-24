const formatTime = (date, fmt) => {
  fmt || (fmt = 'yyyy-MM-dd HH:mm:ss')
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
  let ret
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

module.exports = {
  formatTime: formatTime
}
