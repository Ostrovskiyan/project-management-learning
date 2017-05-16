import moment from "moment";

export function forToday(issues) {
    let now = moment().startOf("day");
    return issues.filter(issue => now.isSame(issue.startDate, "day"));
}

export function forThisWeek(issues) {
    let now = moment().startOf("day");
    let nextWeekStart = moment().startOf("day").add(7, "day");
    return issues.filter(issue => issue.startDate.isAfter(now, "day") && issue.startDate.isBefore(nextWeekStart, "day"));
}

export function forNextWeek(issues) {
    let nextWeekStart = moment().startOf("day").add(7, "day");
    let nextWeekEnd = moment().startOf("day").add(13, "day");
    return issues.filter(issue => issue.startDate.isSameOrAfter(nextWeekStart, "day") && issue.startDate.isSameOrBefore(nextWeekEnd, "day"));
}

export function forLater(issues) {
    let nextWeekEnd = moment().startOf("day").add(13, "day");
    return issues.filter(issue => issue.startDate.isAfter(nextWeekEnd, "day"));
}

export function byId(items, id) {
    return items.filter(issue => issue.id.toString() === id.toString())[0];
}
