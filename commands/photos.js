import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default async function getPhoto(photo){


    if(photo == "random"){
        const random = async () => {
            let result;
            const response = await fetch(`https://api.unsplash.com/photos/random?page=3&per_page=3&order_by=popular&client_id=${process.env.PHOTOS}`)
            .then(response => response.json())
            .then(data => result = data); 
            
            return response.urls.small;
        }

        return random()
    }else{
        const photos = async () => {
            let result;
            const res = await fetch(`https://api.unsplash.com/search/photos?query=${photo}&order_by=popular&client_id=${process.env.PHOTOS}`)
            .then(response => response.json())
            .then(data => result = data);

            return res;
        }


        let photoGet = await photos(photo);
        if(photoGet.total == 0){
            return '404';
        }else{
            return photoGet.results;
          }
    }

}