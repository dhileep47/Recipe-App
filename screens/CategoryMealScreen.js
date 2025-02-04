import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import MealList from '../components/MealList';
import {View, StyleSheet} from 'react-native';
import {CATEGORIES} from '../data/dummy';

const CategoryMealScreen = ({route, navigation}) => {
  const {categoryId} = route.params;

  const availableMeals = useSelector(state => {
    return state.meals.filteredMeals;
  });

  const displayedMeals = availableMeals.filter(meal => {
    return meal.categoryIds.indexOf(categoryId) >= 0;
  });

  const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCategory.title,
    });
  }, []);

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters</DefaultText>
      </View>
    );
  }
  return <MealList displayedMeals={displayedMeals} navigation={navigation} />;
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealScreen;
