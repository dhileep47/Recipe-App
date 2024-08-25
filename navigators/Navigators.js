import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import COLORS from '../constants/Color';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MealDetailScreen from '../screens/MealDetailScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import CategoryScreen from '../screens/CategoryScreen';
import FiltersScreen from '../screens/FiltersScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const FilterStack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const {width, height} = Dimensions.get('window');

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: COLORS.primaryColor,
  },
  headerTintColor: 'white',
};

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          title: 'Meals',
        }}
      />
      <Stack.Screen name="CategoryMealScreen" component={CategoryMealScreen} />
      <Stack.Screen name="MealDetailScreen" component={MealDetailScreen} />
    </Stack.Navigator>
  );
};

const FilterNavigator = () => {
  return (
    <FilterStack.Navigator screenOptions={defaultStackOptions}>
      <FilterStack.Screen
        name="FilterScreen"
        component={FiltersScreen}
        options={{
          title: 'Filters',
        }}
      />
    </FilterStack.Navigator>
  );
};
const FavNavigator = () => {
  return (
    <FavStack.Navigator screenOptions={defaultStackOptions}>
      <FavStack.Screen
        name="FavScreen"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
        }}
      />
      <Stack.Screen name="MealDetailScreen" component={MealDetailScreen} />
    </FavStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator shifting={true} barStyle={styles.tabBarStyle}>
      <Tab.Screen
        name="Meal"
        component={MyStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="restaurant"
              color={focused ? color : '#ffffff'}
              size={22}
            />
          ),
          tabBarLabel: <Text style={{color: 'white'}}>Meals</Text>,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="star"
              color={focused ? color : '#ffffff'}
              size={22}
            />
          ),
          tabBarLabel: <Text style={{color: 'white'}}>Favorites</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: COLORS.accentColor,
        headerShown: false,
      }}>
      <Drawer.Screen name="Meals" component={TabNavigator} />
      <Drawer.Screen name="Filters" component={FilterNavigator} />
    </Drawer.Navigator>
  );
};
const Navigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.primaryColor,
    marginBottom: height * 0.02,
    height: height * 0.07,
  },
});
export default Navigator;
