import React from 'react';
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';



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
          <Link to={"/"+city}>
            Detailed
          </Link>
        </div>
      </div>
    ) : null
}

export default Card;