import React from 'react';
import './App.css';
import MainScreen from "./screens/main-screen/main-screen";
import Details from './screens/details-screen/details';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/:city">
            <Details />
          </Route>       
          <Route path="/main">
            <MainScreen /> 
          </Route> 
        </Switch>   
    </Router>
  )
}

export default App;
