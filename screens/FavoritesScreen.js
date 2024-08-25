import React, {useEffect} from 'react';
import MealList from '../components/MealList';
import {useSelector} from 'react-redux';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FavoritesScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const favoriteMeals = useSelector(state => {
    return state?.meals?.fav;
  });

  if (favoriteMeals?.length === 0 || !favoriteMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found.Start adding some!</DefaultText>
      </View>
    );
  }
  return <MealList displayedMeals={favoriteMeals} navigation={navigation} />;
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
