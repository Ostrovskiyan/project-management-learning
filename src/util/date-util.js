export function getThreeLetterMonth(date) {
    let locale = navigator.language;
    let shortMonthName = date.toLocaleString(locale, { month: "short"});
    shortMonthName = shortMonthName.charAt(0).toUpperCase() + shortMonthName.slice(1, 3);
    return shortMonthName;
}

export function getTwoDigitDay(date) {
    let locale = navigator.language;
    return date.toLocaleString(locale, { day: "2-digit"});
}