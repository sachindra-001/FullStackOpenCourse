import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import { createRoot } from "react-dom/client";

import App from "./App.jsx";
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

let counter = 1;

const root = ReactDOM.createRoot(document.getElementById("root"));
const refresh = () => {
  root.render(<App counter={counter} />);
};
refresh();
counter += 1;
refresh();
counter += 1;
refresh();
