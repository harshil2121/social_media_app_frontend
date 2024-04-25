// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import HomePage from './components/HomePage';
import LoginPage from "./Pages/Login/Login";
// import RegistrationPage from './components/RegistrationPage';
// import NewPostPage from './components/NewPostPage';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <PrivateRoute path="/new-post" component={NewPostPage} />
      </Switch>
    </Router>
  );
}

export default App;
