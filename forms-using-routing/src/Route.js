import React from 'react';
import App from './App'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Parent from './components/Parent';
import NotFound from './components/NotFound';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';

const createRoutes = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/home" component={App} />
                <Route path="/SignUp" component={SignUpPage} />
                <Route path="/SignIn" component={SignInPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default createRoutes;