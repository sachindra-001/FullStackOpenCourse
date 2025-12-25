import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const App = () => {
  const course = "Half Stack application development";
  const Part = [
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
  ];
  return (
    <div>
      <Header course={course} />
      <Content part1={Part[0]} part2={Part[1]} part3={Part[2]} />
      <Total
        exercises1={Part[0].exercises1}
        exercises2={Part[1].exercises2}
        exercises3={Part[2].exercises3}
      />
    </div>
  );
};

export default App;
