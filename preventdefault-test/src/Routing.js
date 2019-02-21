import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from "./App";
import { Navigation } from "./Components/Navigation/Navigation";
import { Aboutus } from "./Components/Navigation/ExtraComponents/Aboutus";
import { Contactus } from "./Components/Navigation/ExtraComponents/Contactus";



export const Routing = () =>
{
    return (
        <BrowserRouter>
            <div>
                <Navigation />
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/aboutus" component={Aboutus} />
                    <Route path="/contactus" component={Contactus} />
                </Switch>

            </div>
        </BrowserRouter>
    );
}