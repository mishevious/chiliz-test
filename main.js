/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 * 
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

function convertStringToDate(date) {
    date = date.split('.')
    return new Date( date[2], date[1] - 1, date[0]);
}
function getElapsedSeconds(olderDate, recentDate) {
    return (recentDate.getTime() - olderDate.getTime()) / 1000
}

function getDaysFromDate(olderDate, recentDate) {
    const seconds = getElapsedSeconds(olderDate, recentDate)
    return Math.ceil(seconds / 86400)
}

function getYearsAndMonthsFromSeconds(olderDate, recentDate) {
    let months = (recentDate.getFullYear() - olderDate.getFullYear()) * 12
    months += recentDate.getMonth()
    months -= olderDate.getMonth()
    if (months > 0 && recentDate.getDate() < olderDate.getDate()) {
        months--
    }
    const years = Math.floor(months / 12)
    months = Math.floor(months % 12)
    return { months, years }
}

function convertElapsedTimeToString(days, years, months) {
    let string = ''
    if (years > 0) {
        string += `${years} ${years > 1 ? 'years' : 'year'}, `
    }
    if (months > 0) {
        string += `${months} ${months > 1 ? 'months' : 'month'}, `
    }
    string += `total ${days} ${days != 1 ? 'days' : 'days'}`
    return string
}

function getElapsedTime(olderDate, recentDate) {
    const days = getDaysFromDate(olderDate, recentDate)
    const { years, months } = getYearsAndMonthsFromSeconds(olderDate, recentDate)
    return convertElapsedTimeToString(days, years, months)
}

function formatDates(dates) {
    dates = [...dates]
    dates = dates.map(convertStringToDate)
    const olderDate = dates[0] > dates[1] ? dates[1] : dates[0]
    const recentDate = dates[0] > dates[1] ? dates[0] : dates[1]
    return { olderDate, recentDate }
}
// Receive string of dates one after each other
function outputDate(dates) {
    const { olderDate, recentDate } = formatDates(dates)
    if (olderDate === recentDate) return 'total 0 days'
    return getElapsedTime(olderDate, recentDate)
}
