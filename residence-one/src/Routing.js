import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import App from "./App";
import { Application } from "./components/Applications/Application";
import { Council } from "./components/Council/Council";
import { Blogs } from "./components/Public/Blogs";
import { Website } from "./components/Public/Website";
import { Structure } from "./components/Administration/Structure";
import { Users } from "./components/Administration/Users";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Units } from "./components/Administration/Units";

const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/administration/users" component={Users} />
        <Route path="/application" component={Application} />
        <Route path="/council" component={Council} />
        <Route path="/public/blogs" component={Blogs} />
        <Route path="/public/website" component={Website} />
        <Route path="/administration/structure" component={Structure} />
        <Route path="/administration/units" component={Units} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;
