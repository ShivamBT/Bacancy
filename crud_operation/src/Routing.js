import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
//import Header from './component/Header';
import Adduser from './component/Adduser';
import Recordlist from './component/Recordlist';
import Edituser from './component/Edituser';
import Deleteuser from './component/Deleteuser';
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
              <Route exact path='/list/new' component={Adduser} />
              <Route exact path='/edit/:id' component={Edituser} />
              <Route exact path='/delete/:id' component={Deleteuser} />
            </Switch>
          </div>
        </div>
      </Router>
    );  
  }
}

export default Routing;