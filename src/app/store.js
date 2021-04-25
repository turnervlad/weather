import { createStore } from "redux";

const ADD_NEW_CITY = 'ADD_NEW_CITY';
const ADD_CITY_DATA = 'ADD_CITY_DATA';

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
      return {
        ...state,
        cities: [...state.cities, action.city],
        citiesData: {
          ...state.citiesData,
          [action.city]: action.data
        }          
      }
    default:
      return state
  }
}

// store.dispatch({
//   type: 'ADD_NEW_CITY',
//   text: 'Madrid'
// })

// console.log(store.getState());
