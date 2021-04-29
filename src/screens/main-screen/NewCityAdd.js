import React, { useState } from 'react';
import {useDispatch} from 'react-redux';


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
          } else {
            alert(data.message);
          }
        })
    }
  
    return (
      <div className="addnewcity_wrapper">
        <div className="title">ADD NEW CITY</div>
        <input onChange={(event) => setNewCity(event.target.value)} value={newCity} placeholder='type the city...'></input>
        <button onClick={() => addNewCity(newCity)}>Submit</button>
      </div>
    )
}

export default NewCityAdd;