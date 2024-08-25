import {createSlice} from '@reduxjs/toolkit';
import {MEALS} from '../data/dummy';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  fav: [],
};

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    toogleFav: (state, action) => {
      const prevIndex = state.fav.findIndex(meal => meal.id == action.payload);
      if (prevIndex >= 0) {
        const upfavmeals = [...state.fav];
        upfavmeals.splice(prevIndex, 1);
        state.fav = upfavmeals;
      } else {
        const meal = state.meals.find(meal => meal.id == action.payload);
        state.fav = state.fav.concat(meal);
      }
    },
    setFilters: (state, action) => {
      const appliedFilters = action.payload;
      const updatedFilterMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      state.filteredMeals = updatedFilterMeals;
    },
  },
});

export const {toogleFav, setFilters} = mealSlice.actions;

export default mealSlice.reducer;
