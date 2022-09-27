const CourseList = ({courses}) => (
    <div>
        {Object.entries(courses).map(([_,course]) => <div>{course.term} CS {course.number}: {course.title}</div>)}
    </div>
);

export default CourseList;