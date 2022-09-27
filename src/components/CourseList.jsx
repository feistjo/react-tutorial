import './CourseList.css'

const CourseList = ({courses}) => (
    <div className="course-list">
        {Object.entries(courses).map(([_,course]) => 
        <div className="card m-1 p-2">
            <h5 className='card-title'>{course.term} CS {course.number}</h5>
            <p className='card-text'>{course.title}</p>
            <p className='card-footer mt-auto'>{course.meets}</p>
        </div>)}
    </div>
);

export default CourseList;