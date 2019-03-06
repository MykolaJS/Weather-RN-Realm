
import React from "react";
import {StyleSheet, Text, View, Image} from 'react-native';
import { getDay } from './List';

export default class Details extends React.Component {
  render() {
      const { navigation } = this.props;
      const image = navigation.getParam('image', require("../img/var-sunny.png"));
      const day = navigation.getParam('day', {});

    return (
      <View style={styles.item}>
          <Image style={styles.image} source={image}></Image>
          <Text style={styles.city}>{day.city}</Text>
          <View style={styles.condContainer}>
            <Text>{getDay(day.date)}</Text>
            <Text style={styles.temp}>{day.temp !== "" ? parseInt((day.temp)-273.15, 10) : ""}°</Text> 
            <Text>Condition: {day.conditionDescr}</Text>
            <Text>Humidity: {day.humidity}</Text>
            <Text>Pressure: {day.pressure}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: { 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center" },
  image : {
    width: 150,
    height: 150
  },
  condContainer: {
    alignItems: "center", 
    justifyContent: "center",
    width: 250,
    height: 250,
    borderColor: '#A3D4F7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20
  },
  temp:{
    fontSize: 100,
    color: '#A3D4F7',
  },
  city:{
    padding: 10
  }
});