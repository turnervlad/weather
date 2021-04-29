import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Details() {
  let { city } = useParams();
  const data = useSelector(state => state.citiesData[city]);
  const dispatch = useDispatch();
  const isLoadingDetails = useSelector(state => state.isLoadingDetails);
  // const cities = useSelector(state => state.cities);
  // console.log(cities);
  console.log(data);

  function cityGet(city) {
    // console.log('load', isLoadingDetails);
    // dispatch({type: 'SET_LOADING_DETAILS_PAGE', payload: true});
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b1ef2fb4dfe2ab9c8640525cfc37cf19`
    )
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: "ADD_NEW_CITY", city: city, data: data })
      );    
    // dispatch({type: 'SET_LOADING_DETAILS_PAGE', payload: false});
  }

  useEffect(() => {
    console.log(city);
    if (!data) {
      // cityGet(city);
    }
    dispatch({type: 'SET_LOADING_DETAILS_PAGE', payload: false});
  }, []);

  return data ? (     
      <div className="details">
        {isLoadingDetails ? <div className="detail_loader">Loading</div> : null}
        <div>{city.toUpperCase()}</div>
        <div>{data.weather[0].main}</div>
        <div>Temperature now<span>{data.main.temp}</span></div>
        <div>Feels like<span>{data.main.feels_like}</span></div>
        <div>Max daily temperature<span>{data.main.temp_max}</span></div>
        <div>Min daily temperature<span>{data.main.temp_min}</span></div>
        <div>Humidity<span>{data.main.humidity}</span></div>
        <div>Pressure<span>{data.main.pressure}</span></div>
        <div>Wind speed<span>{data.wind.speed}</span></div>      
      </div>
  ) : null;
}

export default Details;
