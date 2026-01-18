import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const App = () => {
  const course = {
    name: "Half Stack application development",
    Part: [
      {
        part1: "Fundamentals of React",
        exercises1: 10,
      },
      {
        part2: "Using props to pass data",
        exercises2: 7,
      },
      {
        part3: "State of a component",
        exercises3: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      <Content
        part1={course.Part[0]}
        part2={course.Part[1]}
        part3={course.Part[2]}
      />
      <Total
        exercises1={course.Part[0].exercises1}
        exercises2={course.Part[1].exercises2}
        exercises3={course.Part[2].exercises3}
      />
    </div>
  );
  const { counter } = props;
  return <div>{counter}</div>;
};
export default App;
