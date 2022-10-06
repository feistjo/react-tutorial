const ParseMeetingTime = (meeting_time) => (
    {
        "days": meeting_time.substring(0, meeting_time.search(' ')),
        "start": meeting_time.substring(meeting_time.search(' ') + 1, meeting_time.search('-')),
        "end" : meeting_time.substring(meeting_time.search('-') + 1, meeting_time.length)
    }
);

const DetectDayOverlap = (meeting_time, other_meeting_time) => (
    ['M', 'Tu', 'W', 'Th', 'F'].reduce((previousValue, currentValue) => previousValue || (meeting_time.days.search(currentValue) > -1 && other_meeting_time.days.search(currentValue) > -1), false)
);

const GetTimeGreaterThanOrEqual = (time1, time2) => (
    time1.substring(0, time1.search(':')) > time2.substring(0, time2.search(':')) ||
    (time1.substring(0, time1.search(':')) >= time2.substring(0, time2.search(':')) &&
    time1.substring(time1.search(':') + 1, time1.length) >= time2.substring(time2.search(':') + 1, time2.length))
);

const DetectTimeOverlap = (meeting_time, other_meeting_time) => (
    GetTimeGreaterThanOrEqual(meeting_time.end, other_meeting_time.start) && GetTimeGreaterThanOrEqual(other_meeting_time.end, meeting_time.start)
);

const GetTimeConflict = (meeting_time, other_meeting_time) => (
    DetectDayOverlap(meeting_time, other_meeting_time) && DetectTimeOverlap(meeting_time, other_meeting_time)
);

export const GetTimeConflictWithList = (course, courses, selected) => (
    selected.reduce((previousValue, currentValue) => previousValue || GetTimeConflict(ParseMeetingTime(course.meets), ParseMeetingTime(courses[currentValue].meets)), false)
);