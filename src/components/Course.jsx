import "./Course.css"

const Course = ({id, course, selected, toggleSelected}) => (
    <div className={`card m-1 p-2 ${selected.includes(id) ? 'selected' : ''}`} onClick={() => toggleSelected(id)}>
        <h5 className='card-title'>{course.term} CS {course.number}</h5>
        <p className='card-text'>{course.title}</p>
        <p className='card-footer mt-auto'>{course.meets}</p>
    </div>
);

export default Course;