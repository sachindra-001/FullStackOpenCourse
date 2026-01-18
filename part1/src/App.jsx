import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Calculate values for statistics
  const total = good + neutral + bad;

  // To avoid division by zero when the app starts, we can use a conditional
  const average = total === 0 ? 0 : (good - bad) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

      {/* New statistics below */}
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positivePercentage} %</p>
    </div>
  );
};

export default App;
