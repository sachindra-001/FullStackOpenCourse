const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};
const Content = (props) => {
  return (
    <div>
      <Part part={props.part1.part1} exercises={props.part1.exercises1} />
      <Part part={props.part2.part2} exercises={props.part2.exercises2} />
      <Part part={props.part3.part3} exercises={props.part3.exercises3} />
    </div>
  );
};
export default Content;
