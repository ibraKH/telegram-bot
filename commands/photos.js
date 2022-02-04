import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default async function getPhoto(photo){

    if(photo == "random"){
        let random;
        const randomRes = await fetch(`https://api.unsplash.com/photos/random?page=3&per_page=3&order_by=popular&client_id=${process.env.PHOTOS}`)
        .then(response => response.json())
        .then(data => random = data);


        if(random.urls.full){
            return random.urls.full;
        }
        
    }else{
        
    let result;
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${photo}&order_by=popular&client_id=${process.env.PHOTOS}`)
    .then(response => response.json())
    .then(data => result = data);


    if(result.total == 0){
      return '404';
    }else{
      return result.results
    }
    
    }


  
}