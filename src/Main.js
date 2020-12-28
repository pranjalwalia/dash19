import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./App";
import About from "./components/layouts/About";
import NotFound from "./components/layouts/NotFound";

function Main() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/about" component={About} />
        <Route path="/" component={NotFound} />
        <Route />
      </Switch>
    </Router>
  );
}

export default Main;
