const Total = ({ parts }) => {
  // Debug: Check the console to see if data arrives here
  console.log("Total component received these parts:", parts);

  const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <strong>total of {totalAmount} exercises</strong>
    </p>
  );
};
export default Total;
