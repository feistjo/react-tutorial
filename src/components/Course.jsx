import "./Course.css"
import { GetTimeConflictWithList } from "../utilities/TimeConflicts";

const Course = ({id, course, courses, selected, toggleSelected}) => (
    <div className={`card m-1 p-2 ${selected.includes(id) ? 'selected' : GetTimeConflictWithList(course, courses, selected) ? 'conflicts' : ''}`} 
    onClick={() => !selected.includes(id) && GetTimeConflictWithList(course, courses, selected) ? '' : toggleSelected(id)}>
        <h5 className='card-title'>{course.term} CS {course.number}</h5>
        <p className='card-text'>{course.title}</p>
        <p className='card-footer mt-auto'>{course.meets}</p>
    </div>
);

export default Course;