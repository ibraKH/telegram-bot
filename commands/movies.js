import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();



const movies = ["baby driver", "extraction", "6 underground", "1917", "joker", "the revenant", "the purge", "venom", "gatsby",
"interstellar", "lucy", "gravity"];
export default async function getMovie(movie){

    if(movie == "random"){
        let random = movies[Math.floor(Math.random() * movies.length)];
        movie = random;
    }
    let result;
    const res = await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${process.env.MOVIES}`)
  .then(response => response.json())
  .then(data => result = data);

  
  if(result.Response == "False"){
      return '404';
  }else{
      return result
  }
  
}