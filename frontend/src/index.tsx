import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextWrapper } from "./context";
import axios from "axios";
// axios.defaults.baseURL = "http://192.168.50.74:8000";
axios.defaults.baseURL =
  "http://ec2-13-215-228-145.ap-southeast-1.compute.amazonaws.com";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Router>
    <AppContextWrapper>
      <App />
    </AppContextWrapper>
  </Router>
  // </React.StrictMode>
);
