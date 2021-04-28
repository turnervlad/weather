import { createStore } from "redux";

const ADD_NEW_CITY = 'ADD_NEW_CITY';
const ADD_CITY_DATA = 'ADD_CITY_DATA';
const DELETE_CITY = "DELETE_CITY";

function setToLocalStorage(newCity) {
  if (localStorage.getItem('cities')) {
    localStorage.setItem('cities', localStorage.getItem('cities') + ',' + newCity);
  } else {
    localStorage.setItem('cities', newCity);
  }  
}

const initialState = {
  cities: ['london', 'kharkiv'],
  citiesData: {}
};

export const store = createStore(reducer, initialState);

function reducer(state = initialState, action) {  
  switch (action.type) {
    case ADD_CITY_DATA:
      return {
        ...state,
        citiesData: {
          ...state.citiesData,
          [action.city]: action.data      
        }
      }
    case ADD_NEW_CITY:
      setToLocalStorage(action.city);
      return {
        ...state,
        cities: [...state.cities, action.city],
        citiesData: {
          ...state.citiesData,
          [action.city]: action.data
        }          
      }
    case DELETE_CITY:
      delete state.citiesData[action.city];
      localStorage.setItem('cities', localStorage.getItem('cities').split(',').filter(x => x !== action.city));
      return {
        ...state,
        cities: state.cities.filter(x => x !== action.city)
      }
      
    default:
      return state
  }
}

