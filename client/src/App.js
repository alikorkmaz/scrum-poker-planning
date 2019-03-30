import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DeveloperVote from "./pages/DeveloperVote";
import MasterVote from "./pages/MasterVote";
import SessionCreate from "./pages/SessionCreate";

const App = () => {
  //Give browser an Id to track it later on
  if (!localStorage.getItem("browserId"))
    localStorage.setItem(
      "browserId",
      Math.random()
        .toString(36)
        .slice(-8)
    );

  return (
    <div className="mt-3 ui container">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={SessionCreate} />
            <Route path="/developerVote/:id" exact component={DeveloperVote} />
            <Route path="/masterVote/:id" exact component={MasterVote} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
