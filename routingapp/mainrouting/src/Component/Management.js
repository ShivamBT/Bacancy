import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './main.css';
import routesManagement from '../Routes/RoutsManagement';

const Managment = () => (
    <BrowserRouter>
        <div className="container-fluid">
            <div className="row">
                <div class="col-sm-6 border">
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Management/FeeStructure"><h3>Fee Structure</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Management/ExamStructure"><h3>Exam Structure</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Management/FinanceManagement"><h3>Finance Management</h3></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Departments/Management/RecordManagement"><h3>Record Management</h3></Link>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-6 border">
                    <div style={{ flex: 1, padding: "10px" }}>
                        {routesManagement.map((route, index) => (
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
export default Managment;