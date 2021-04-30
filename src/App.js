import React from 'react';
import './App.css';
import MainScreen from "./screens/main-screen/MainScreen";
import Details from './screens/details-screen/Details';
import { Route, Switch, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter basename="/weather">
        <Switch>
          <Route exact path="/:city">
            <Details />
          </Route>       
          <Route exact path="/">
            <MainScreen /> 
          </Route> 
        </Switch>   
    </HashRouter>
  )
}

export default App;
