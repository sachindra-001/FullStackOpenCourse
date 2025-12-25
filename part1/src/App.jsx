import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const App = () => {
  const course = "Half Stack application development";
  const object1 = {
    part1: "Fundamentals of React",
    exercises1: 10,
  };
  const object2 = {
    part2: "Using props to pass data",
    exercises2: 7,
  };
  const object3 = {
    part3: "State of a component",
    exercises3: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={object1} part2={object2} part3={object3} />
      <Total
        exercises1={object1.exercises1}
        exercises2={object2.exercises2}
        exercises3={object3.exercises3}
      />
    </div>
  );
};

export default App;
