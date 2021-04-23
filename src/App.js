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
      {cities.map((x,index) => <Card city={x} cityGet={cityGet} key={index+x} />)}
    </div>
  );
}

function Card({city, cityGet}) {
  const data = useSelector(state => state.citiesData[city])
  console.log(data);  

  return data ? (
    <div className="card">
      <div>{city}</div>
      <div>Daily temperature:
        <span className="temperature">
          {data.main.temp}
        </span>
      </div>
      <div>feels like:
        <span className="feels__like">
        {data.main.feels_like}
        </span>
      </div>
      <div>
        <button onClick={() => cityGet(city)}>
          Update
        </button>
      </div>
    </div>
  ) : null
}

export default App;
