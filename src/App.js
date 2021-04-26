import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './App.css';
// import { store } from './app/store';
// import {ADD_CITY_DATA} from './app/store';

function App() {
  const cities = useSelector(state => state.cities);
  const dispatch = useDispatch();  

  const localStorageCities = localStorage.getItem('cities');
  console.log(Boolean(localStorageCities));

  function cityGet (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=b1ef2fb4dfe2ab9c8640525cfc37cf19`)
        .then(response => response.json())
        .then(data => dispatch({type: 'ADD_CITY_DATA', city: city, data: data}))           
  }

  useEffect(() => {
    if (localStorage.getItem('cities')) {
      // localStorage.getItem('cities').split(',').forEach(city => cityGet(city));
      
      localStorage.getItem('cities').split(',').forEach(city => {
        console.log('city', city);
        cityGet(city);
      });
      // console.log('array',ff);
    
    } else {
      cities.forEach(city => cityGet(city))
    }
  }, []);

  return (
    <div className="App">
      {/* {cities.map((city,index) => <Card city={city} cityGet={cityGet} key={index+city} />)} */}
      {localStorageCities ? 
        localStorageCities.split(',').map((city,index) => <Card city={city} cityGet={cityGet} key={index+city} />) : null
        // cities.map((city,index) => <Card city={city} cityGet={cityGet} key={index+city} />)
      
      }
      <NewCityAdd />
    </div>
  );
}

function NewCityAdd () {
  const [newCity, setNewCity] = useState('');
  const dispatch = useDispatch();
  // const cities = useSelector(state => state.cities);

  function addNewCity (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=b1ef2fb4dfe2ab9c8640525cfc37cf19`)
      .then(response => response.json())
      .then(data => { 
        if (data.cod >= 200 && data.cod < 300) {
          dispatch({type: 'ADD_NEW_CITY', city: city, data: data});
          setNewCity('');
          // localStorage.setItem('cities', localStorage.getItem('cities') + ',' + cities);
        } else {
          alert(data.message);
        }
      })        
      // console.log(localStorage.getItem('cities'));
      // localStorage.setItem('cities', cities);
  }

  return (
    <div>
      <input onChange={(event) => setNewCity(event.target.value)} value={newCity} placeholder='type the city...'></input>
      <button onClick={() => addNewCity(newCity)}>submit</button>
    </div>
  )
}

function Card({city, cityGet}) {
  const data = useSelector(state => state.citiesData[city]);
  const dispatch = useDispatch();

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
        <button onClick={() => dispatch({type: "DELETE_CITY", city: city})}>
          delete
        </button>
      </div>
    </div>
  ) : null
}

export default App;
