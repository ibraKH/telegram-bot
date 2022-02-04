import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();


export default async function getPicture(date){

    let result = ""
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA}&date=${date}`)
  .then(response => response.json())
  .then(data => result = data.url);

  return result;
}
