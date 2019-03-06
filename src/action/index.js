export const updateDatabase = ()=>({
    type: 'UPDATE_DATABASE',
    });

export const getApiAsync = (city) =>{
    return async (dispatch) => {
        console.log("getApiAsync");
        if (city){
            const api_url = await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=c4a2fab9875a4addca3b5ca41d0f8232`);
            const data = await api_url.json();
            if(data.city){
                dispatch({
                    type: 'GET_API',
                    data
                    })
            } else {
                alert("Put correct city");
            }
          } else {
             alert("Put city");
          }
    }
}



     