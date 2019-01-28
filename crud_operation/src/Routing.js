import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './component/Header';
import Adduser from './component/Adduser';
import Recordlist from './component/Recordlist';
import Edit from './component/Edit';
import Delete from './component/Delete';

class Routing extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={Recordlist} />
              <Route exact path='/list/new' component={Adduser} />
              <Route exact path='/edit/:id' component={Edit} />
              <Route exact path='/delete/:id' component={Delete} />
            </Switch>
          </div>
        </div>
      </Router>
    );  
  }
}

export default Routing;