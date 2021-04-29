import React from 'react';
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';



function Card({city, cityGet}) {
    const data = useSelector(state => state.citiesData[city]);
    const dispatch = useDispatch();
  
    return data ? (
      <div className="card">
        <div className="city">{city.toUpperCase()}</div>
        <div>Daily temperature:
          <span className="temperature">
            {data.main.temp}
          </span>
        </div>
        <div>Feels like:
          <span className="feels__like">
          {data.main.feels_like}
          </span>
        </div>
        <div className="buttons">
          <Link to={"/"+ city}>
            Detailed
          </Link>
          <button onClick={() => cityGet(city)}>
            Update
          </button>
          <button onClick={() => dispatch({type: "DELETE_CITY", city: city})}>
            Delete
          </button>
          
        </div>
      </div>
    ) : null
}

export default Card;