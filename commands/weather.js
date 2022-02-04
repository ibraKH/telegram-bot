import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default async function getWeather(city){

    let result;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER}`)
  .then(response => response.json())
  .then(data => result = data);


  if(result.cod == "404"){
    return "404"
  }else{
    return result;
  }


  
}

