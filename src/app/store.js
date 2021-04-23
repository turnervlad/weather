import { createStore } from "redux";
const ADD_NEW_CITY = 'ADD_NEW_CITY';
const ADD_CITY_DATA = 'ADD_CITY_DATA';

const initialState = {
  cities: ['london', 'kharkiv'],
  citiesData: {}
};
// debugger;
export const store = createStore(reducer, initialState);

function reducer(state = initialState, action) {  
  switch (action.type) {
    case ADD_CITY_DATA:
      return {
        ...state,
        citiesData: {
          ...state.citiesData,
          [action.city]: action.payload      
        }
      }
    case ADD_NEW_CITY:
      return {
        ...state,
        citiesData: {...state.citiesData},
        cities: [...state.cities, action.text]  
      }
    default:
      return state
  }
}

store.dispatch({
  type: 'ADD_NEW_CITY',
  text: 'Madrid'
})

console.log(store.getState());
