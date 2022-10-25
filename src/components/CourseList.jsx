import { useState } from "react";
import "./CourseList.css";
import Course from "./Course";

const CourseList = ({ courses, selected, toggleSelected, isAdmin }) => {
  return (
    <div className="course-list">
      {Object.entries(courses).map(([id, course]) => (
        <Course
          id={id}
          course={course}
          courses={courses}
          selected={selected}
          toggleSelected={toggleSelected}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default CourseList;
