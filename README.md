[![GitHub Workflow Status: CI](https://img.shields.io/github/workflow/status/MunifTanjim/js-set-time/CI?label=CI&style=for-the-badge)](https://github.com/MunifTanjim/js-set-time/actions?query=workflow%3ACI)
[![Version](https://img.shields.io/npm/v/set-time?style=for-the-badge)](https://npmjs.org/package/set-time)
[![Coverage](https://img.shields.io/codecov/c/gh/MunifTanjim/js-set-time?style=for-the-badge)](https://codecov.io/gh/MunifTanjim/js-set-time)
[![License](https://img.shields.io/github/license/MunifTanjim/js-set-time?style=for-the-badge)](https://github.com/MunifTanjim/js-set-time/blob/main/LICENSE)

# Set Time

Sets time to Date instance.

## Installation

```sh
# using yarn:
yarn add set-time

# using npm:
npm install --save set-time
```

## Usage

```js
import { setTime } from 'set-time'

let date

const timeString = '12:00:00+06:00'

date = setTime(new Date(), timeString)

date = setTime('2020-01-01T00:00:00Z', timeString)
```

## F.A.Q.

**How can I validate the `timeString` pattern acceptable to `setTime`?**

```js
import { timeStringRegex } from 'set-time'

timeStringRegex.test(timeString)
```

**Why doesn't `setTime` accept date string with UTC time offset _(e.g. `2020-01-01T00:00:00+06:00`)_?**

Because, that would create confusion.

If it was allowed, one would expect the output of `setTime('2020-01-01T00:00:00+06:00', '12:00:00+06:00')` to be `2020-01-01T12:00:00+06:00` (i.e. `2020-01-01T06:00:00Z`).

But the actual output would be `2019-12-31T06:00:00Z` (i.e. `2019-12-31T12:00:00+06:00`).

It's because, `new Date('2020-01-01T00:00:00+06:00')` would always result in `2020-12-31T18:00:00Z` as JavaScript `Date` is actually a specific moment in time.

## License

Licensed under the MIT License. Check the [LICENSE](./LICENSE) file for details.
