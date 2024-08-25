import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toogleFav} from '../slices/meals';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListItem = ({children}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const MealDetailScreen = ({route, navigation}) => {
  const {mealId} = route.params;

  const isFavoriteMeal = useSelector(state => {
    return state.meals.fav.some(meal => meal.id === mealId);
  });
  const availableMeals = useSelector(state => {
    return state.meals.meals;
  });

  const selectedMeal = availableMeals.find(meal => {
    return meal.id === mealId;
  });

  const dispatch = useDispatch();

  const toggleFavHandler = () => {
    dispatch(toogleFav(mealId));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedMeal.title,
      headerRight: () => (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={toggleFavHandler}>
          <Ionicons
            name={isFavoriteMeal ? 'star' : 'star-outline'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      ),
    });
  }, [isFavoriteMeal]);

  const {duration, affordability, complexity, imageUrl, ingredients, steps} =
    selectedMeal;

  return (
    <ScrollView>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.text}>{duration}mins</Text>
        <Text style={styles.text}>{complexity.toUpperCase()}</Text>
        <Text style={styles.text}>{affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {ingredients.map(ingredient => {
        return <ListItem key={ingredient}>{ingredient}</ListItem>;
      })}
      <Text style={styles.title}>Steps</Text>
      {steps.map(step => {
        return <ListItem key={step}>{step}</ListItem>;
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
  },
  text: {
    color: 'black',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
