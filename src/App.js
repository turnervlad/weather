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
          <Route path="/weather/:city">
            <Details />
          </Route>       
          <Route path="/weather/">
            <MainScreen /> 
          </Route> 
        </Switch>   
    </Router>
  )
}

export default App;
