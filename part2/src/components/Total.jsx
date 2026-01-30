const Total = ({ parts }) => {
  // sum is the accumulator, part is the current item in the array
  const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <strong>total of {totalAmount} exercises</strong>
    </p>
  );
};

export default Total;
