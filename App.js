import React, {Component} from 'react';
import ReduxThunk from 'redux-thunk';
import Weather from './src/components/Weather';
import Details from './src/components/Details';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './src/reducer';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

const AppNavigator = createStackNavigator(
  {
    Home: {screen: Weather, navigationOptions: {title: 'Weather App',}},
    Details: {screen: Details, navigationOptions: {title: 'Weather App',}}
  },

  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
          backgroundColor: '#A3D4F7',
          elevation: 0,
          shadowOpacity: 0,
      },
      headerTintColor: '#333333',
      headerTitleStyle: {
          fontWeight: 'bold',
          color: '#ffffff'
      }
    }
  },
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  
  render() {
    console.log("render from App");
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}


