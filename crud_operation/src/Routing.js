import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Recordlist from './component/Recordlist';
import Edituser from './component/Edituser';
import App from './App';

class Routing extends Component {

  render() {
    return (
      <Router>
        <div>
          <App />
          <div>
            <Switch>
              <Route exact path="/" component={Recordlist} />
              <Route exact path="/edit/:id/:flag" component={Edituser} />
            </Switch>
          </div>
        </div>
      </Router>
    );  
  }
}

export default Routing;