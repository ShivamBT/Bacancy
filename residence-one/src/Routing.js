import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import App from "./App";
import { LoggedInPage } from "./components/LoggedInPage/LoggedInPage";
import { Application } from "./components/Applications/Application";
import { Council } from "./components/Council/Council";
import { Blogs } from "./components/Public/Blogs";
import { Website } from "./components/Public/Website";
import { Structure } from "./components/Administration/Structure";
import { Lots } from "./components/Administration/Lots";
import { Users } from "./components/Administration/Users";

const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/loggedin/" component={LoggedInPage} />
        <Route exact path="/administration/users" component={Users} />
        <Route path="/application" component={Application} />
        <Route path="/council" component={Council} />
        <Route path="/public/blogs" component={Blogs} />
        <Route path="/public/website" component={Website} />
        <Route path="/administration/structure" component={Structure} />
        <Route path="/administration/lots" component={Lots} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;