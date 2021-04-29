import React from 'react';
import './App.css';
import MainScreen from "./screens/main-screen/main-screen";
import Details from './screens/details-screen/details';
import {
  BrowserRouter as Router, Route, Switch, HashRouter
} from "react-router-dom";


function App() {
  return (
    <HashRouter>
        <Switch>
          <Route exact path="/weather/:city">
            <Details />
          </Route>       
          <Route exact path="/weather/">
            <MainScreen /> 
          </Route> 
        </Switch>   
    </HashRouter>
  )
}

export default App;
