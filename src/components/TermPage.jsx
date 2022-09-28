import { useState } from 'react';
import CourseList from './CourseList';

const terms = {
  Fall: "Fall",
  Winter: 'Winter',
  Spring: 'Spring'
};

const TermButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off" onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
      { term }
    </label>
  </div>
);

const TermSelector = ({selection, setSelection}) => (
  <div className="btn-group">
    {
      Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const TermPage = ({courses}) => {
    const [termSelection, setTermSelection] = useState(() => Object.keys(terms)[0]);
    const [selectedCourses, setCourseSelected] = useState([]);

    const toggleCourseSelected = (item) => setCourseSelected(
        selectedCourses.includes(item) ? selectedCourses.filter(x => x !== item) : [...selectedCourses, item]
    );

    return (
        <div>
            <TermSelector selection={termSelection} setSelection={setTermSelection} />
            <CourseList 
                courses={Object.fromEntries(Object.entries(courses).filter(course => course[1].term === terms[termSelection]))}
                selected={selectedCourses}
                toggleSelected={toggleCourseSelected} />
        </div>
    )
}

export default TermPage;