import Vue from 'vue'

Vue.filter('time', function (value) {
  if (!value) return ''
  const date = new Date(value * 1000)
  const Y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let H = date.getHours()
  let i = date.getMinutes()
  let s = date.getSeconds()
  const z = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
  const diffs = z - value
  const remainingtime = Math.abs(Math.floor(diffs / (24 * 3600 * 1000)))
  if (remainingtime < 1) {
    return '今天'
  } else if (remainingtime < 2) {
    return '昨天'
  }
  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  if (H < 10) {
    H = '0' + H
  }
  if (i < 10) {
    i = '0' + i
  }
  if (s < 10) {
    s = '0' + s
  }
  const t = Y + '-' + m + '-' + d
  return t
})