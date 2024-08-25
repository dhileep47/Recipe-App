import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

const CategoryGridTitle = ({title, onSelect, color}) => {
  return (
    <View style={styles.gridItem}>
      <TouchableOpacity style={{flex: 1}} onPress={onSelect}>
        <View style={{...styles.container, backgroundColor: color}}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryGridTitle;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: height * 0.15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 7,
  },
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
});
