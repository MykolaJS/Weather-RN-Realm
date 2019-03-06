import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

export default class List extends Component {
  state = {
    url: ""
  }

  renderItem = (item, i) => {
    const url = setImageUrl((item.conditionId));
    const { navigateToDetail } = this.props;
    return (
      <TouchableOpacity key={i} onPress={()=> navigateToDetail(i, url)}>
        <View style={styles.item}>
          <Image style={styles.image} source={url}/>
          <Text> {item.date !== "" ? getDay(item.date) : ""} </Text>
          <Text> {item.temp !== "" ? parseInt((item.temp)-273.15, 10) : ""} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() { 
    return (
      <ScrollView style={styles.container}>
          {this.props.items.map(this.renderItem)}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  image : {
    width: 50,
    height: 50
  }
});

function setImageUrl(conditionId){
  let url = "";
  if ((conditionId >= 200) && (conditionId <= 504)) {
    url = require("../img/var-sunny.png");
  } else if ((conditionId  >= 520) && (conditionId <= 531)) {
      url = require("../img/var-rain.png");
  } else if (conditionId === 511) {
      url = require("../img/var-sleet.png");
  } else if ((conditionId === 600) || (conditionId === 601)) {
      url = require("../img/var-snow-occasional.png");
  } else if (conditionId === 602) {
      url = require("../img/var-cold.png");
  } else if ((conditionId >= 611) && (conditionId <= 616)) {
      url = require("../img/var-sleet.png");
  } else if ((conditionId >= 620) && (conditionId <= 622)) {
      url = require("../img/var-cold.png");
  } else if (conditionId === 800) {
      url = require("../img/var-sunny.png");
  } else if ((conditionId >= 801) && (conditionId <= 804)) {
      url = require("../img/var-clouds.png");
  } else {
      console.log("api not required, please check this!");
  }

  return url;
}

export function getDay(date){
  let millisec = parseInt(date + "0".concat("0").concat("0"));
  let dateObj = new Date(millisec);
  let options = { weekday: 'long' };
  return dateObj.toLocaleDateString("en-US", options);
}