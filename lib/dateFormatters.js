import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
export const DATE_FORMAT_DD = 'DD-MM-YYYY'
export const DATE_TIME_FORMAT_DD = 'DD/MM/YYYY HH:mm'

export const DATE_FORMAT_SLASH = 'DD/MM/YYYY'
export const DATE_FORMAT_SLASH_Y = 'YYYY/MM/DD'
export const REGEX_DATE_FORMAT = /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/g

export const FULL_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ'

export function momentDateToString(date, format = DATE_FORMAT) {
  if (!date) return null
  return moment(date, format).format(format)
}

export function formatDate(date, format = DATE_FORMAT) {
  if (!date) return null
  return moment(date).format(format)
}

export function extractTime(endTime, startTime = null) {
  const start = startTime ? moment(startTime) : moment()
  const end = moment(endTime)

  let timeLeft = end.diff(start)

  if (timeLeft < 0) {
    timeLeft = 0
  }

  const seconds = moment.duration(timeLeft).seconds()
  const minutes = moment.duration(timeLeft).minutes()
  const hours = Math.trunc(moment.duration(timeLeft).asHours())
  const days = Math.trunc(moment.duration(timeLeft).asDays())
  const weeks = Math.trunc(moment.duration(timeLeft).asWeeks())
  const months = Math.trunc(moment.duration(timeLeft).asMonths())
  const years = Math.trunc(moment.duration(timeLeft).asYears())

  return { timeLeft, years, months, weeks, days, hours, minutes, seconds }
}

const parseWeek = (dt, diffDay) => {
  const dateNumber = getDayNumberByDate(dt)
  const x = diffDay % 7
  const y = Math.floor(diffDay / 7)
  const compareDate = x - (9 - dateNumber)
  if (compareDate > 0) return y + 1
  return y
}

const diffDateTime = (dt) => {
  const currentSecond = parseInt(momentDateToString(moment(), 'YYYYMMDDHHmmss'))
  const inputSecond = parseInt(momentDateToString(dt, 'YYYYMMDDHHmmss'))
  const currentMinute = parseInt(momentDateToString(moment(), 'YYYYMMDDHHmm'))
  const inputMinute = parseInt(momentDateToString(dt, 'YYYYMMDDHHmm'))
  const currentHour = parseInt(momentDateToString(moment(), 'YYYYMMDDHH'))
  const inputHour = parseInt(momentDateToString(dt, 'YYYYMMDDHH'))
  const currentDay = parseInt(momentDateToString(moment(), 'YYYYMMDD'))
  const inputDay = parseInt(momentDateToString(dt, 'YYYYMMDD'))
  const currentMonth = parseInt(momentDateToString(moment(), 'YYYYMM'))
  const inputMonth = parseInt(momentDateToString(moment(dt), 'YYYYMM'))
  const currentYear = parseInt(momentDateToString(moment(), 'YYYY'))
  const inputYear = parseInt(momentDateToString(moment(dt), 'YYYY'))
  const diffSecond = currentSecond - inputSecond
  const diffMinute = currentMinute - inputMinute
  const diffHour = currentHour - inputHour
  const diffDay = currentDay - inputDay
  const diffWeek = parseWeek(dt, diffDay)
  const diffMonth = currentMonth - inputMonth
  const diffYear = currentYear - inputYear

  return {
    diffSecond,
    diffMinute,
    diffHour,
    diffDay,
    diffWeek,
    diffMonth,
    diffYear,
  }
}

export function getDayNumberByDate(dt = 'now') {
  if (!dt) return null
  let arr = [2, 3, 4, 5, 6, 7, 8]
  if (dt == 'now') return arr[moment().format('d')]
  return arr[moment(dt).format('d')]
}

/** dtf = datetime format */
export function getDayNameByDate(dt = 'now') {
  if (!dt) return null
  let arr = ['Ch??? nh???t', 'Th??? 2', 'Th??? 3', 'Th??? 4', 'Th??? 5', 'Th??? 6', 'Th??? 7']
  if (dt == 'now') return arr[moment().format('d')]
  return arr[moment(dt).format('d')]
}

export function dtf1(dt, format = 'HH[h]mm') {
  if (!dt) return null
  return moment(dt).format(format)
}

export function dtf2(dt, displayTime = false) {
  if (!dt) return null

  let date = moment(dt).format('DD/MM/YYYY')
  let time = displayTime ? '[' + moment(dt).format("HH[h]mm[']") + '] ' : ''
  let homnay = moment().format('DD/MM/YYYY')
  let ngaymai = moment().add(1, 'd').format('DD/MM/YYYY')
  let ngaykia = moment().add(2, 'd').format('DD/MM/YYYY')
  let homqua = moment().subtract(1, 'd').format('DD/MM/YYYY')
  let homkia = moment().subtract(2, 'd').format('DD/MM/YYYY')
  let tuannay = moment().format('WW')
  let namnay = moment().format('YYYY')

  if (date == homnay) return moment(dt).format(time + '[H??m nay (]DD/MM[)]')
  if (date == ngaymai) return moment(dt).format(time + '[Ng??y mai (]DD/MM[)]')
  if (date == ngaykia) return moment(dt).format(time + '[Ng??y kia (]DD/MM[)]')
  if (date == homqua) return moment(dt).format(time + '[H??m qua (]DD/MM[)]')
  if (date == homkia) return moment(dt).format(time + '[H??m kia (]DD/MM[)]')
  if (moment(dt).format('YYYY') == namnay) {
    if (moment(dt).format('WW') == tuannay && [homnay, ngaymai, ngaykia].indexOf(date) == -1)
      return moment(dt).format(time + '[' + getDayNameByDate(dt) + ']' + '[ Tu???n n??y (]DD/MM[)]')

    if (moment(dt).format('WW') == parseInt(tuannay) + 1) return moment(dt).format(time + '[' + getDayNameByDate(dt) + ']' + '[ Tu???n sau (]DD/MM[)]')

    if (moment(dt).format('WW') == parseInt(tuannay) + 2 || [homqua, homkia].indexOf(date) == -1)
      return moment(dt).format(time + '[' + getDayNameByDate(dt) + ']' + '[ (]DD/MM[)]')
  }

  return moment(dt).format(time + '[' + getDayNameByDate(dt) + ']' + '[ (]DD/MM/YYYY[)]')
}

export function dtf3(dt) {
  return dtf2(dt, true)
}

export function dtf4(dt) {
  if (!dt) return null

  let a = moment([moment().get('year'), moment().get('month'), moment().get('date')])

  let b = moment([moment(dt).get('year'), moment(dt).get('month'), moment(dt).get('date')])

  let c = a.diff(b, 'days')

  // cung ngay thi tinh phut
  if (c == 0) {
    let a = moment([moment().get('year'), moment().get('month'), moment().get('date'), moment().get('hour'), moment().get('minute')])

    let b = moment([moment(dt).get('year'), moment(dt).get('month'), moment(dt).get('date'), moment(dt).get('hour'), moment(dt).get('minute')])

    return Math.abs(a.diff(b, 'minutes')) + ' ph??t'
  }
  return Math.abs(c) + ' ng??y'
}

export function dtf5Prefix(num) {
  return num < 0 ? 'C??n l???i ' : 'Qu?? h???n '
}

export function dtf5(dt) {
  if (!dt) return null
  // dt = '2020-11-20T04:31:46.683'
  let curDt = moment([moment().get('year'), moment().get('month'), moment().get('date'), moment().get('hour'), moment().get('minute')])

  let inputDt = moment([moment(dt).get('year'), moment(dt).get('month'), moment(dt).get('date'), moment(dt).get('hour'), moment(dt).get('minute')])

  let diffMonth = curDt.diff(inputDt, 'months')
  let diffWeek = curDt.diff(inputDt, 'weeks')
  let diffDay = curDt.diff(inputDt, 'days')
  let diffHour = curDt.diff(inputDt, 'hours')
  let diffMin = curDt.diff(inputDt, 'minutes')

  if (Math.abs(diffMin) >= 0 && Math.abs(diffMin) < 60) return dtf5Prefix(diffMin) + Math.abs(diffMin) + ' ph??t'

  if (Math.abs(diffHour) >= 1 && Math.abs(diffHour) < 24)
    return dtf5Prefix(diffHour) + Math.abs(diffHour) + ' gi??? ' + Math.abs(diffMin - diffHour * 60) + ' ph??t'

  if (Math.abs(diffDay) >= 1 && Math.abs(diffDay) < 7) {
    // lam tron neu so phut > 30
    let gio =
      Math.abs(diffMin - diffDay * 24 * 60 - Math.abs(diffHour - diffDay * 24) * 60) >= 30
        ? Math.abs(diffHour - diffDay * 24) + 1
        : Math.abs(diffHour - diffDay * 24)

    if (gio == 0) return dtf5Prefix(diffDay) + Math.abs(diffDay) + ' ng??y'
    if (gio == 24) return dtf5Prefix(diffDay) + (Math.abs(diffDay) + 1) + ' ng??y'
    return dtf5Prefix(diffDay) + Math.abs(diffDay) + ' ng??y ' + gio + ' gi??? '
  }

  if (Math.abs(diffDay) >= 7 && Math.abs(diffMonth) == 0) {
    let ngay = Math.abs(diffDay - diffWeek * 7)
    return dtf5Prefix(diffDay) + Math.abs(diffWeek) + ' tu???n ' + (ngay > 0 ? ngay + ' ng??y ' : '')
  }

  let dateDL = moment(dt).get('date')
  let dateTD = moment().get('date')
  // qua han
  if (diffMonth > 0) {
    if (dateDL > dateTD) {
      let daysInMonthDL = moment(dt).daysInMonth()
      let songay = daysInMonthDL - dateDL + dateTD
      if (songay < 30) return dtf5Prefix(diffMonth) + Math.abs(diffMonth) + ' th??ng ' + songay + ' ng??y'
      return dtf5Prefix(diffMonth) + Math.abs(diffMonth) + ' th??ng'
    }
    if (dateDL == dateTD) {
      return dtf5Prefix(diffMonth) + Math.abs(diffMonth) + ' th??ng'
    }
    if (dateDL < dateTD) {
      let songay = dateTD - dateDL
      return dtf5Prefix(diffMonth) + Math.abs(diffMonth) + ' th??ng ' + songay + ' ng??y'
    }
  }
  // con han
  if (dateDL > dateTD) {
    let songay = dateDL - dateTD
    return dtf5Prefix(diffMonth) + Math.abs(diffMonth) + ' th??ng ' + songay + ' ng??y'
  }
  if (dateDL == dateTD) {
    return dtf5Prefix(diffMonth) + Math.abs(diffMonth) + ' th??ng'
  }
  let daysInMonthTD = moment().daysInMonth()
  let songay = daysInMonthTD - dateTD + dateDL
  if (songay < 30) return dtf5Prefix(diffMonth) + Math.abs(diffMonth) + ' th??ng ' + songay + ' ng??y'
  return dtf5Prefix(diffMonth) + (Math.abs(diffMonth) + 1) + ' th??ng'
}

export function dtf6Suffix(num) {
  return num > 0 ? ' tr?????c' : ' sau'
}

export function dtf6(dt) {
  if (!dt) return null

  let time = '[' + moment(dt).format("HH[h]mm[']") + '] '

  let curDt = moment([moment().get('year'), moment().get('month'), moment().get('date'), moment().get('hour'), moment().get('minute'), moment().get('second')])

  let inputDt = moment([
    moment(dt).get('year'),
    moment(dt).get('month'),
    moment(dt).get('date'),
    moment(dt).get('hour'),
    moment(dt).get('minute'),
    moment(dt).get('second'),
  ])

  let diffDay = curDt.diff(inputDt, 'days')
  let diffHour = curDt.diff(inputDt, 'hours')
  let diffMin = curDt.diff(inputDt, 'minutes')
  let diffSec = curDt.diff(inputDt, 'seconds')

  if (Math.abs(diffSec) >= 0 && Math.abs(diffSec) < 60) return Math.abs(diffSec) + ' gi??y' + dtf6Suffix(diffSec)

  if (Math.abs(diffSec) >= 60 && Math.abs(diffSec) < 60 * 60) return Math.abs(diffMin) + ' ph??t' + dtf6Suffix(diffSec)

  if (Math.abs(diffHour) >= 1 && Math.abs(diffHour) < 24) return Math.abs(diffHour) + ' gi???' + dtf6Suffix(diffHour)

  if (Math.abs(diffDay) >= 1 && Math.abs(diffDay) < 30) return Math.abs(diffDay) + ' ng??y' + dtf6Suffix(diffDay)

  return moment(dt).format(time + '[' + getDayNameByDate(dt) + ']' + '[ (]DD/MM[)]')
}

export function dtf7(dt) {
  if (!dt) return null

  const timeDetail = extractTime(moment(), dt)
  const datetimeFormat = moment(dt).format(`[(l??c] H[h]mm['] [ng??y] DD/MM[)]`)

  const { diffDay, diffWeek, diffMonth, diffYear } = diffDateTime(dt)

  const formattedTime = timeDetail.seconds < 10 ? `0${timeDetail.seconds}` : timeDetail.seconds

  if (timeDetail.timeLeft < 5 * 1000) return `v???a xong`
  if (timeDetail.timeLeft < 60 * 1000) return `${formattedTime} gi??y tr?????c`
  if (timeDetail.hours === 0) return `${timeDetail.minutes} ph??t tr?????c ${moment(dt).format(`[(l??c ]H[h]mm['] [h??m nay)]`)}`

  if (diffDay === 0) return `${timeDetail.hours} gi??? tr?????c ${moment(dt).format(`[(l??c ]H[h]mm['] [h??m nay)]`)}`
  if (diffDay === 1) return `Ng??y h??m qua ${datetimeFormat}`
  if (diffDay === 2) return `Ng??y h??m kia ${datetimeFormat}`

  if (diffWeek === 0) return `${timeDetail.days} ng??y tr?????c ${datetimeFormat}`
  if (diffWeek === 1) return `Tu???n tr?????c ${datetimeFormat}`

  if (diffMonth === 0) return `${diffWeek} tu???n tr?????c ${datetimeFormat}`
  if (diffMonth === 1) return `Th??ng tr?????c ${datetimeFormat}`

  if (diffYear === 0) return `${diffMonth} th??ng tr?????c ${datetimeFormat}`

  if (diffYear === 1) return `N??m ngo??i ${datetimeFormat}`

  return `${diffYear} n??m tr?????c ${datetimeFormat}`
}

export function dtf8(dt) {
  if (!dt) return null

  let time = '[' + moment(dt).format("HH[h]mm[']") + '] '
  let namnay = moment().format('YYYY')

  if (moment(dt).format('YYYY') == namnay) {
    return moment(dt).format(time + 'DD/MM')
  }

  return moment(dt).format(time + 'DD/MM/YYYY')
}

export function durationDate(startDate, endDate) {
  const thisYear = moment().format('YYYY')
  if (!startDate || !endDate) return null
  if (moment(startDate).format('YYYY') == thisYear && moment(endDate).format('YYYY') == thisYear) {
    return formatDate(startDate, 'DD/MM') + ' - ' + formatDate(endDate, 'DD/MM')
  }
  return formatDate(startDate, DATE_FORMAT_SLASH) + ' - ' + formatDate(endDate, DATE_FORMAT_SLASH)
}
