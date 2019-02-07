import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import EditUser from './Component/EditUser';

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/App" component={App}/>
        <Route exact path="/App/New"  component={EditUser}/>
        <Route exact path="/App/Edit/:id" component={EditUser}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;
