import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import NewUser from './Component/NewUser';
import EditUser from './Component/EditUser';
import DeleteUser from './Component/DeleteUser';

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/App" component={App}/>
        <Route exact path="/App/newUser" component={NewUser}/>
        <Route exact path="/App/EditUser/:id" component={EditUser}/>
        <Route exact path="/App/DeleteUser/:id" component={DeleteUser}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;
