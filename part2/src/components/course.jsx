import Header from "./Header"; // Matches Header.jsx
import Content from "./Content"; // Matches Content.jsx
import Total from "./Total"; // Matches Total.jsx

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
