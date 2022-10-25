import "./Course.css";
import { GetTimeConflictWithList } from "../utilities/TimeConflicts";
import { Link } from "react-router-dom";
import { Pencil } from "react-bootstrap-icons";
import { useAuthState } from "../utilities/firebase";

const Course = ({ id, course, courses, selected, toggleSelected }) => {
  const [user] = useAuthState();
  return (
    <div
      className={`card m-1 p-2 ${
        selected.includes(id)
          ? "selected"
          : GetTimeConflictWithList(course, courses, selected)
          ? "conflicts"
          : ""
      }`}
      onClick={() =>
        !selected.includes(id) &&
        GetTimeConflictWithList(course, courses, selected)
          ? ""
          : toggleSelected(id)
      }
    >
      <h5 className="card-title">
        {course.term} CS {course.number}
      </h5>
      <p className="card-text">{course.title}</p>
      {user ? (
        <p>
          <Link to={`/course/${id}/edit`}>
            <Pencil />
          </Link>
        </p>
      ) : (
        ""
      )}
      <p className="card-footer mt-auto">{course.meets}</p>
    </div>
  );
};

export default Course;
