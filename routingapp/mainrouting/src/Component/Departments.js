import React from 'react';
import { BrowserRouter, Link,Route } from 'react-router-dom';
import './main.css';
import Engineering from './Engineering';
import PlacementCell from './Placement-Cell';
import Management from './Management';
import Academic from './Academic';

const routes = [

    {
        path: "/Departments/Engineering",
        exact: true,
        main: () => <Engineering/>
    },
    {
        path: "/Departments/Management",

        main: () => <Management/>
    },
    {
        path: "/Departments/Academic",

        main: () => <Academic/>
    },
    {
        path: "/Departments/PLacement-Cell",

        main: () => <PlacementCell/>
    }
];

const Router = () => (
    <BrowserRouter >
        <div class="container-fluid" >
           
            <ul class="nav nav-pills">
                <li class="nav-item col-sm-3 border">
                    <Link class="nav-link" to="/Departments/Engineering">Engineering</Link>
                </li>
                <li class="nav-item col-sm-3 border">
                    <Link class="nav-link" to="/Departments/Management">Management</Link>
                </li>
                <li class="nav-item col-sm-3 border">
                    <Link class="nav-link" to="/Departments/Academic">Academic</Link>
                </li>
                <li class="nav-item col-sm-3 border">
                    <Link class="nav-link" to="/Departments/Placement-Cell">Placement-Cell</Link>
                </li>
            </ul>
            <div class="row">
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
           
     
    </BrowserRouter>
);

export default Router;