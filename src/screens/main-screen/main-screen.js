import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import '../../App.css';
import Card from './Card';
import NewCityAdd from './NewCityAdd';

function MainScreen () {
    const cities = useSelector(state => state.cities);
    const dispatch = useDispatch();  
  
    const localStorageCities = localStorage.getItem('cities');
    // console.log(Boolean(localStorageCities));
  
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
        cities.forEach(city => cityGet(city));
      }
    }, []);
  
    return (
        <div className="main_container">
          {localStorageCities ? 
            localStorageCities.split(',').map((city,index) => <Card city={city} cityGet={cityGet} key={index+city} />) : null
            // cities.map((city,index) => <Card city={city} cityGet={cityGet} key={index+city} />)        
          }
          <NewCityAdd />
        </div>
    )
  }

  export default MainScreen;