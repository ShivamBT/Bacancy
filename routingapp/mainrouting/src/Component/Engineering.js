import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './main.css';
import routesEngineering from '../Routes/routesEngineering';

const Engineering = () => (
    <BrowserRouter>
        <div className="container-fluid">
            <div className="row">
                <div class="col-sm-6 border">
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Engineering/CE"><h3>Computer Engineering</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Engineering/IT"><h3>Information Technology</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Engineering/EC"><h3>ElectronicsCommunication</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Engineering/ME"><h3>Mechanical Engineering</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Engineering/AU"><h3>Automobile Engineering</h3></Link>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-6 border">
                    <div style={{ flex: 1, padding: "10px" }}>
                        {routesEngineering.map((route, index) => (
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
export default Engineering;