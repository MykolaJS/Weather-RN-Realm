import Realm from 'realm';
const WeatherSchema = {
  name: 'Weather',
  properties: {
    city: 'string',
    conditionDescr: 'string',
    conditionId: 'int',
    country: 'string',
    date: 'int',
    humidity: 'int',
    pressure: 'double',
    temp: 'double'
  }
};

// get objects (days) from Realm database
const  getDataFromDatabase = () => {
    const weatherArray = [];
    Realm.open({ schema: [WeatherSchema] }).then(realm => {
      realm.objects('Weather').forEach((weatherDay)=>{      
        weatherArray.push({
          city: weatherDay.city,
          conditionDescr: weatherDay.conditionDescr,
          conditionId: weatherDay.conditionId,
          country: weatherDay.country,
          date: weatherDay.date,
          humidity: weatherDay.humidity,
          pressure: weatherDay.pressure,
          temp: weatherDay.temp
          })}
      );            
    })    
  return weatherArray;
}

// get objects (days) from api
const createWeatherArrayDays = (data) => {
  const weatherArray = [];
    for(let i = 0; i < 5; i++){
      weatherArray.push({
        city: data.city.name,
        country: data.city.country,
        date: data.list[i].dt,
        temp: data.list[i].temp.day,
        conditionDescr: data.list[i].weather[0].description,
        conditionId: data.list[i].weather[0].id,
        humidity: data.list[i].humidity,
        pressure: data.list[i].pressure
      })
    }    
  return weatherArray;
}

// update database after finish work with app
const updateDatabase = (weatherArray) =>{
  Realm.open({ schema: [WeatherSchema]})
  .then(realm => { realm.write(() => {
    realm.delete(realm.objects('Weather'));
    weatherArray.forEach((weatherDay)=>{
      realm.create('Weather', weatherDay);
      });
    });
  });
}

export const reducer = (state = getDataFromDatabase(), action) => {
  switch (action.type) {
    case 'GET_API':
      return createWeatherArrayDays(action.data);
    case 'UPDATE_DATABASE':
      updateDatabase(state);
      return state;       
    default: 
    return state;
  }
}



