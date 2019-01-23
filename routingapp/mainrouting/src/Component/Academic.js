import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './main.css';
import RoutesAcademic from '../Routes/RoutesAcademic';

const Academic = () => (
    <BrowserRouter>
        <div className="container-fluid">
            <div className="row">
                <div class="col-sm-6 border">
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Academic/StudentCorner"><h3>Student Corner</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Academic/Result"><h3>Result</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Academic/graduation"><h3>graduation</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Academic/postGraduation"><h3>Post Graduation</h3></Link>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-6 border">
                    <div style={{ flex: 1, padding: "10px" }}>
                        {RoutesAcademic.map((route, index) => (
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
export default Academic;