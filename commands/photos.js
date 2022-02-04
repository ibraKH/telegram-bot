import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default async function getPhoto(photo){

    if(photo == "random"){
        let random = { urls: {
            regular: "https://images.unsplash.com/photo-1637766717184-1cfab32dd635?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=MnwyOTc1NzV8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjQzOTgyMjQ4\u0026ixlib=rb-1.2.1\u0026q=80\u0026w=1080"
        }};
        const randomRes = await fetch(`https://api.unsplash.com/photos/random?page=3&per_page=3&order_by=popular&client_id=${process.env.PHOTOS}`)
        .then(response => response.json())
        .then(data => random = data);

        if(typeof(random.errors) !== "undefined"){
            return '404'
        }else{
            return random.urls.regular;
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