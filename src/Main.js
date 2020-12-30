import React from "react";
import App from "./App";
import About from "./components/layouts/About/About";
import { BrowserRouter, Route } from "react-router-dom";

export default function Main() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={App} />
      <Route exact path="/about" component={About} />
    </BrowserRouter>
  );
}
