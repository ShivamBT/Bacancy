import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './main.css';
import routes from './Routes';

const PlacementCell = () => (
    <BrowserRouter>
        <div className="container-fluid">
            <div className="row">
                <div class="col-sm-6 border">
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
                <div class="col-sm-6 border">
                    <div style={{ flex: 1, padding: "10px" }}>
                        {routes.map((route, index) => (
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
export default PlacementCell;