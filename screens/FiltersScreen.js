import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Color';
import {useDispatch} from 'react-redux';
import {setFilters} from '../slices/meals';

const FilterSwitch = ({label, onChange, state}) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={{color: 'black'}}>{label}</Text>
      <Switch
        value={state}
        onValueChange={onChange}
        trackColor={{
          true: Colors.primaryColor,
        }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
      />
    </View>
  );
};

const FiltersScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.menuButton} onPress={saveFilters}>
          <Ionicons name="save" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
    color: 'black',
  },
  menuButton: {
    marginHorizontal: 10,
  },
});

export default FiltersScreen;
