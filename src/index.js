import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LocationContextProvider } from "./context";

ReactDOM.render(
  <LocationContextProvider>
    <App />
  </LocationContextProvider>,
  document.getElementById("root")
);
