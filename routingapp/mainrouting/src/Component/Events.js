import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './main.css'
import routesEvents from '../Routes/RoutesEvents';

const Router = () => (
    <BrowserRouter>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4 border" >
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item">
                            <Link class="nav-link" to="/Events/Workshops"><h3>Workshops</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Events/Seminars"><h3>Seminars</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Events/SA"><h3>Social Activities</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Events/Sports"><h3>Sports</h3></Link>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-8 border">
                    <div style={{ flex: 1, padding: "10px" }}>
                        {routesEvents.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>


    </BrowserRouter>
);

export default Router;