import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import App from './App';
import Events from './Component/Events';
import Departments from './Component/Departments';

const Router = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/home" component={App}/>
                <Route path="/Events" component={Events}/>
                <Route path="/Departments" component={Departments}/>
               
            </Switch>
        </div>
    </BrowserRouter>
);

export default Router;