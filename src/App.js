import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './App.css';
// import { store } from './app/store';
// import {ADD_CITY_DATA} from './app/store';

function App() {
  const cities = useSelector(state => state.cities);
  console.log(cities);
  const dispatch = useDispatch();


  function cityGet (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=b1ef2fb4dfe2ab9c8640525cfc37cf19`)
        .then(response => response.json())
        .then(data => dispatch({type: 'ADD_CITY_DATA', city: city, payload: data}))           
  }

  useEffect(() => cities.forEach(city => cityGet(city)), []);

  return (
    <div className="App">
      {cities.map((x,index) => <Card city={x} key={index} />)}
    </div>
  );
}

function Card({city}) {
  const data = useSelector(state => state[city])
  console.log(data);  

  return (
    <div className="card">
      <div>{city}</div>
      <div>Daily temperature:
        <span className="temperature">
          17
        </span>
      </div>
      <div>feels like:
        <span className="feels__like">
        16.3
        </span>
      </div>
      <div>
        <button>Update</button>
      </div>
    </div>
  )
}

export default App;
