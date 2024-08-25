import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigator from './navigators/Navigators';
import {Provider} from 'react-redux';
import {store} from './slices/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
