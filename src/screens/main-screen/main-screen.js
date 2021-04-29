import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../App.css";
import Card from "./Card";
import NewCityAdd from "./NewCityAdd";

function MainScreen() {
  const cities = useSelector((state) => state.cities);
  const isLoadingMain = useSelector((state) => state.isLoadingMain);
  const dispatch = useDispatch();
  const localStorageCities = localStorage.getItem("cities");

  function cityGet(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=b1ef2fb4dfe2ab9c8640525cfc37cf19`
    )
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: "ADD_CITY_DATA", city: city, data: data })
      );
  }

  useEffect(() => {
    if (localStorage.getItem("cities")) {
      localStorage.getItem("cities").split(",").forEach(city => cityGet(city));      
    }
    dispatch({ type: "SET_LOADING_MAIN_PAGE", payload: false });
  }, []);

  return (
    <div className="main_container">
        <NewCityAdd />
        <div className="card_container">
            {isLoadingMain ? <div className="main_loader">Loading...</div> : null}
            {localStorageCities.split(",").map((city, index) => (<Card city={city} cityGet={cityGet} key={index + city} />
            ))}  
        
      </div>    
      
    </div>
  );
}

export default MainScreen;
