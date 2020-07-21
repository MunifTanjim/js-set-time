/**
 * Pattern for ISO 8601 compliant time string with optional UTC time offset
 */
export const timeStringRegex = /^(?:[0-1][0-9]|2[0-3])(?:(?::[0-5][0-9])(?::[0-5][0-9](?:\.[0-9]{1,3})?)?)?(?:Z|[+-](?:0[0-9]|1[0-2])(?::[0-5][0-9])?)?$/

/**
 * Returns an instance of `Date` with time set according to `timeString`
 *
 * @param date `Date` instance or string in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Times) format (with zero UTC offset), e.g. `2020-01-01T00:00:00Z`
 * @param timeString string representing time in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Times) format, e.g. `00:00:00+00:00`
 */
export const setTime = (date: Date | string, timeString: string): Date => {
  if (typeof date === 'string' && !/Z$/.test(date)) {
    throw new Error('invalid date string')
  }

  if (!timeStringRegex.test(timeString)) {
    throw new Error('invalid pattern for timeString')
  }

  const datetime = new Date(date)

  if (Number.isNaN(datetime.getTime())) {
    throw new Error('invalid date instance')
  }

  const [time, offsetSign = 'Z', offset = ''] = timeString.split(/([Z+-])/)

  const [offsetHour, offsetMinute = 0] = offset
    .split(':')
    .map((part) => Number(part))

  const offsetInMinute = offsetHour * 60 + offsetMinute

  const sign = offsetSign === 'Z' ? '+' : (offsetSign as '+' | '-')

  const [timeHour, timeMinute = 0, timeSecond = 0] = time
    .split(':')
    .map((part) => Number(part))

  let timeInMinute = timeHour * 60 + timeMinute

  if (sign === '+') {
    timeInMinute = timeInMinute - offsetInMinute
  }

  if (sign === '-') {
    timeInMinute = timeInMinute + offsetInMinute
  }

  const hour = Math.trunc(timeInMinute / 60)
  const minute = timeInMinute % 60
  const second = Math.trunc(timeSecond)
  const millisecond = timeSecond * 1000 - second * 1000

  datetime.setUTCHours(0, 0, 0, 0)
  datetime.setTime(
    datetime.getTime() +
      hour * 1000 * 60 * 60 +
      minute * 1000 * 60 +
      second * 1000 +
      millisecond
  )

  return datetime
}
