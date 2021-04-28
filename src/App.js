import React from 'react';
// import {useSelector, useDispatch} from 'react-redux';
import './App.css';
import MainScreen from "./screens/main-screen/main-screen";
import Details from './screens/details-screen/details';
// import { store } from './app/store';
// import {ADD_CITY_DATA} from './app/store';
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
          <Route path="/">
            <MainScreen /> 
          </Route> 
        </Switch>   
    </Router>
  )
}

export default App;
