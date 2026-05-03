/**
 * Asia/Seoul 달력·시각 (분 단위까지) — `new Date(toLocaleString(...))` 파싱에 의존하지 않음.
 * 일부 WebView에서 Invalid Date → 전체 트리 비정상이 되는 것을 막기 위함.
 */
export function getSeoulCalendarParts(now = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const parts = fmt.formatToParts(now)
  const n = (type) => {
    const p = parts.find((x) => x.type === type)
    return p ? Number(p.value) : NaN
  }
  const hour = n('hour')
  const minute = n('minute')
  return {
    year: n('year'),
    month: n('month'),
    day: n('day'),
    hour,
    minute,
    minutesFromMidnight: hour * 60 + minute,
  }
}
