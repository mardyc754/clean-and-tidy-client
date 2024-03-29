import dayjs from 'dayjs';
// useful to convert units from minutes to hours, days to years, etc.
import duration from 'dayjs/plugin/duration';
// humanizes input given by duration - can be useful in generating
// how long ago particular comment was added (e.g. 4 years ago, 5 minutes ago)
import relativeTime from 'dayjs/plugin/relativeTime';
// most important dayjs plugins
// most of them are likely to be removed
// plugin to change dayjs object into normal js object:
// dayjs().toObject();
// {
//    "date":21,
//    "hours":10,
//    "milliseconds":521,
//    "minutes":53,
//    "months":11,
//    "seconds":13,
//    "years":2021
// }
import toObject from 'dayjs/plugin/toObject';
import updateLocale from 'dayjs/plugin/updateLocale';
// // plugin to enable custom formats.
// // it can be used, for example, to extract hour from the date
// // example - current hour: dayjs(new Date()).format('HH:mm').toString()
// // format date: dayjs(new Date()).format('DD.MM.YYYY').toString()
// // list of available formats without plugin:
// // https://day.js.org/docs/en/display/format
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// // date based on the locale
// // e.g. for pl it will be: 21 gru 2021
// import localizedFormat from 'dayjs/plugin/localizedFormat';
// // to display weekdays, month names in locale language
// import localeData from 'dayjs/plugin/localeData';
// // check if the year is leap or not (that means February has 29 days instead of 28)
// import isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
// //to check the day of the year
// import dayOfYear from 'dayjs/plugin/dayOfYear';
// // to check the week number
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { dayjsLocalizer } from 'react-big-calendar';

// // to check the quarten
// import quarterOfYear from 'dayjs/plugin/quarterOfYear';
// // to measure the duration of the time
// for optional timezones
// import timezone from 'dayjs/plugin/timezone'

// import 'dayjs/locale/pl'; // import locale

dayjs.extend(toObject);
// dayjs.extend(isLeapYear);
// dayjs.extend(localizedFormat);
// dayjs.extend(localeData);
// dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);
// dayjs.extend(quarterOfYear);
// dayjs.extend(customParseFormat);
// dayjs.extend(timezone);

dayjs.extend(duration);
dayjs.extend(relativeTime);

dayjs.extend(updateLocale);

// Note that the dayjsLocalizer extends Day.js with the following plugins:
// - IsBetween
// - IsSameOrAfter
// - IsSameOrBefore
// - LocaleData
// - LocalizedFormat
// - MinMax
// - UTC
export const localizer = dayjsLocalizer(dayjs);

// dayjs.locale('pl');

// for update locale options see:
// https://day.js.org/docs/en/customization/customization
dayjs.updateLocale('en', {
  weekStart: 1,
  formats: {
    // abbreviated format options allowing localization
    LTS: 'HH:mm:ss',
    LT: 'HH:mm',
    // L: 'MM/DD/YYYY',
    L: 'DD.MM.YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY HH:mm',
    LLLL: 'dddd, MMMM D, YYYY HH:mm',
    // lowercase/short, optional formats for localization
    l: 'D/M/YYYY',
    ll: 'D MMM, YYYY',
    lll: 'D MMM, YYYY HH:mm',
    llll: 'ddd, MMM D, YYYY HH:mm'
  }
});

export default dayjs;
