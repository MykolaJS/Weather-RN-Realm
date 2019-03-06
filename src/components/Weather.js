import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, AppState, NetInfo} from 'react-native';
import { updateDatabase, getApiAsync } from '../action'
import { connect } from 'react-redux';
import List from './List';
import Input from './Input'

const mapToProps = (state) => {
  return {state};
}

class Weather extends Component {

  constructor (){
    super();
    this.state = {
      apiIsReady : true,
      appState: AppState.currentState,
    }
    NetInfo.addEventListener('connectionChange', this._handleNetStateChange);
  }
  
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    NetInfo.removeEventListener('connectionChange', this._handleNetStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      this.onUpdateDataRealm(this.props.state);
    } 
    this.setState({appState: nextAppState});
  };

  _handleNetStateChange = (connectionInfo) => {
    const { dispatch } = this.props; 
    if(this.props.state[0]){
      connectionInfo.type !== 'none' || 'unknown' 
      ? dispatch(getApiAsync(this.props.state[0].city))     
      : alert('Please turn on Internet');
    }
  }

  onInputCity = (city) => {
    this.setState({apiIsReady : false});
    const { dispatch } = this.props; 
    dispatch(getApiAsync(city));
  }

  onUpdateDataRealm = () => {
    const { dispatch } = this.props; 
    dispatch(updateDatabase());
  }

  onNavigateToDetails = (dayIndex, image) => {
    const { navigate } = this.props.navigation;
    navigate('Details', {day: this.props.state[dayIndex], image});
  }

  onRenderDays = () =>{
    if(this.props.state[0]){
      return (
        <View>
          <Text>City: {this.props.state[0].city}, Country: {this.props.state[0].country}</Text>
          <List items={this.props.state} navigateToDetail={this.onNavigateToDetails}/> 
        </View>
      )
    } else if(!this.state.apiIsReady){
      return (
        <View>
          <Image style={styles.image} source={require("../img/load.gif")}/>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Input placeholder={'Type your city'} onSubmitEditing={this.onInputCity} />
      {this.onRenderDays()}
      </View>
    );
  }
}

export default connect(mapToProps)(Weather);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image : {
    width: 50,
    height: 50
  }
});
