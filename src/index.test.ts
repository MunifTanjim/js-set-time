import { setTime, timeStringRegex } from './index'

describe('timeStringRegex', () => {
  test.each([
    ['00', true],
    ['20', true],
    ['20Z', true],
    ['20+06', true],
    ['20:20', true],
    ['20:20+06:00', true],
    ['20:20:20', true],
    ['20:20:20-06:00', true],
    ['20:20:20.20-06:00', true],
  ])('  valid: %s', (timeString, result) => {
    expect(timeStringRegex.test(timeString)).toBe(result)
  })

  test.each([
    ['24', false],
    ['20:60', false],
    ['20:20:60', false],
    ['20:20:20.20-06:60', false],
  ])('invalid: %s', (timeString, result) => {
    expect(timeStringRegex.test(timeString)).toBe(result)
  })
})

describe('setTime', () => {
  test('accepts valid ISO 8601 string (with zero UTC offset) as date param', () => {
    const date = '2020-01-01T00:00:00Z'
    expect(() => setTime(date, '00')).not.toThrow()
  })

  test('rejects valid ISO 8601 string (with UTC time offset) as date param', () => {
    const dates = ['2020-01-01T00:00:00+06:00', '2020-01-01T00:00:00-06:00']

    for (const date of dates) {
      expect(() => setTime(date, '00')).toThrow()
    }
  })

  test('rejects invalid ISO 8601 string as date param', () => {
    const dates = [
      '2020-01-01T00:00:00+',
      '2020-01-01T00:00:00-',
      '2020-01-01T00:00:00#',
    ]

    for (const date of dates) {
      expect(() => setTime(date, '00')).toThrow()
    }
  })

  test('accepts valid instance of Date as date param', () => {
    const date = new Date('2020-01-01T00:00:00')

    expect(() => setTime(date, '00')).not.toThrow()
  })

  test('rejects invalid instance of Date as date param', () => {
    const date = new Date('2020-01-01T00:00:00+')

    expect(() => setTime(date, '00')).toThrow()
  })

  test('rejects invalid timeString pattern', () => {
    const date = '2020-01-01T00:00:00Z'

    expect(() => setTime(date, '00:00:00 UTC')).toThrow()
  })

  test.each([
    ['20', '2020-01-11T20:00:00Z'],
    ['20Z', '2020-01-11T20:00:00Z'],
    ['20+06', '2020-01-11T14:00:00Z'],
    ['20-06', '2020-01-12T02:00:00Z'],
    ['20:20', '2020-01-11T20:20:00Z'],
    ['20:20+06', '2020-01-11T14:20:00Z'],
    ['01:00+06:30', '2020-01-10T18:30:00Z'],
    ['01:00+06:30', '2020-01-10T18:30:00Z'],
    ['20:20+06:30', '2020-01-11T13:50:00Z'],
    ['20:20:20', '2020-01-11T20:20:20Z'],
    ['20:20:20-02:40', '2020-01-11T23:00:20Z'],
    ['00:00:00+06:00', '2020-01-10T18:00:00Z'],
    ['00:20:00+00:45', '2020-01-10T23:35:00Z'],
    ['01:30:00+03:00', '2020-01-10T22:30:00Z'],
  ])('%s -> %s', (timeString, resultDate) => {
    const date = '2020-01-11T00:00:00Z'

    expect(setTime(date, timeString)).toStrictEqual(new Date(resultDate))
  })
})
