import { createStore } from "redux";

const ADD_NEW_CITY = 'ADD_NEW_CITY';
const ADD_CITY_DATA = 'ADD_CITY_DATA';
const DELETE_CITY = "DELETE_CITY";
const SET_LOADING_MAIN_PAGE = 'SET_LOADING_MAIN_PAGE';
const SET_LOADING_DETAILS_PAGE = 'SET_LOADING_DETAILS_PAGE';

function setToLocalStorage(newCity) {
  if (localStorage.getItem('cities')) {
    localStorage.setItem('cities', localStorage.getItem('cities') + ',' + newCity);
  } else {
    localStorage.setItem('cities', newCity);
  }  
}

const initialState = {
  cities: ['london', 'kharkiv'],
  citiesData: {},
  isLoadingMain: true,
  isLoadingDetails: true
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
      if (localStorage.getItem('cities')) {
        if (!localStorage.getItem('cities').split(',').includes(action.city)) {
          setToLocalStorage(action.city);
        }        
      } else {
        setToLocalStorage(action.city);
      }
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
    case SET_LOADING_MAIN_PAGE:
      return {
        ...state,
        isLoadingMain: action.payload
      }
    case SET_LOADING_DETAILS_PAGE:
      return {
        ...state,
        isLoadingDetails: action.payload
      } 
    default:
      return state
  }
}

