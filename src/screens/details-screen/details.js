import React from 'react';
import { useParams, Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';


function Details () {

  let { city } = useParams();
  const data = useSelector(state => state.citiesData[city]);
  const dispatch = useDispatch();

  function cityGet (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=b1ef2fb4dfe2ab9c8640525cfc37cf19`)
      .then(response => response.json())
      .then(data => dispatch({type: 'ADD_NEW_CITY', city: city, data: data}))           
  }

  if (!data) {
    cityGet(city);
  }

    return (
      data ? (
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
            <Link to={"/"+city}>
              Detailed
            </Link>
          </div>
        </div>
      ) : null
    )
}

export default Details;