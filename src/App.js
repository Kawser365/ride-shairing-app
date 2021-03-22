import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Destination from "./components/Destination/Destination";
import Home from "./components/Home/Home";
import LogIn from "./components/LogIn/LogIn";
import NotMatch from "./components/NotMatch/NotMatch";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext()
function App() {
 const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">City Riders</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav justify-content-end">
          <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/destination/1">Destination</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/login">LogIn</Link>
              </li>
              <li className="nav-item">
              <p className="nav-link" style={{color:'red'}}>{loggedInUser.email}</p>
              </li>
          </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <PrivateRoute path="/destination/:name">
            <Destination />
          </PrivateRoute>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="*">
            <NotMatch/>
          </Route>
        </Switch>
      
    </Router>
    </UserContext.Provider>
  );
}

export default App;
