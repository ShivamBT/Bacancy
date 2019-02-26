import React from 'react';
import { BrowserRouter, Route, Switch ,NavLink} from 'react-router-dom';
import App  from './App';
import Userlist from './components/UserList/UserList';
import EditUser from './components/EditUser/EditUser';

const NotFound = () =>
{
    return (
        <div>
            Invalid path
            <br/>
            <NavLink to="/">Go Back to Home Page</NavLink>
        </div>
    );
    }

export const Routing = () =>
{
    return (
        <BrowserRouter>
            <div>
                <App />
                <Switch>
                    <Route exact path="/" component={Userlist} />
                    <Route path="/edit/:id/:flag" component={EditUser} />
                    <Route path="/notfound" component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}