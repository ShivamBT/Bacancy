import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import App from "./App";
import { Reception } from "./components/Applications/Reception/Reception";
import { Council } from "./components/Council/Council";
import { Blogs } from "./components/Public/Blogs";
import { Website } from "./components/Public/Website";
import { Structure } from "./components/Administration/Structure";
import { Users } from "./components/Administration/Users";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Units } from "./components/Administration/Units";
import { Families } from "./components/Administration/Families";
import { UserDetails } from "./components/Administration/UserDetails/UserDetails";
import { FamilyDetails } from "./components/Administration/FamilyDetails/FamilyDetails";
import { UserNotFound } from "./components/Administration/UserDetails/UserNotFound";
import { Owners } from "./components/Administration/Owners";
import { OwnersProfile } from "./components/Administration/OwnersProfile/OwnersProfile";
import { UnitProfile } from "./components/Administration/UnitProfile/UnitProfile";
import { Pool } from "./components/Administration/Pool";
import { Vehicle } from "./components/Administration/Vehicle";
import { Events } from "./components/Administration/Events";

const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/administration/users" component={Users} />
        <Route exact path="/administration/users/:id" component={UserDetails} />
        <Route path="/application/reception" component={Reception} />
        <Route path="/council" component={Council} />
        <Route path="/public/blogs" component={Blogs} />
        <Route path="/public/website" component={Website} />
        <Route path="/administration/structure" component={Structure} />
        <Route path="/administration/units" component={Units} />
        <Route path="/administration/families" component={Families} />
        <Route path="/administration/family/:id" component={FamilyDetails} />
        <Route path="/userNotFound" component={UserNotFound} />
        <Route path="/administration/owners" component={Owners} />
        <Route
          path="/administration/owners-profile/:id"
          component={OwnersProfile}
        />
        <Route
          path="/administration/units-profile/:id"
          component={UnitProfile}
        />
        <Route path="/administration/pool" component={Pool} />
        <Route path="/administration/vehicles" component={Vehicle} />
        <Route path="/administration/events" component={Events}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;
