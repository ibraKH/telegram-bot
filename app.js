import TelegramBot from 'node-telegram-bot-api';
import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import path from 'path'



// web
let app = express();
const PORT = process.env.PORT || 3009
app.set("view engine", "ejs");
const __dirname = path.resolve();
let publicDierctory = path.join(__dirname, "./public");
app.use(express.static(publicDierctory));



const token = process.env.TOKEN;



import getPicture from './commands/space.js';
import getWeather from './commands/weather.js';
import getMovie from './commands/movies.js'
import getPhoto from './commands/photos.js'


const bot = new TelegramBot(token, {polling: true});


bot.on("message", async (msg) => {


    if(msg.text === "/start"){
        bot.sendMessage(msg.from.id, `
        🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆 

                                          
        Welcome ibra 👋 👋 
        ———————————

📓 This is ibra's 
bot with more than five apis 📓 

To see the ⚙️ commands ⚙️  
please write :

"/command" or "/"
        
        `)
    }

    // commands 

    if(msg.text == "/command" || msg.text == "/"){
        return bot.sendMessage(msg.from.id, `
        ⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️

The commands :

/space       🔭 
/weather     🌦
/movies      🍿
/photos      📸
        `)
    }

    // Space 


    if(msg.text.includes("-")){
        let cleanText = msg.text.replace(" ", "");
        let regex = /[^0-9-]/gi
        if(regex.test(cleanText)){
            return bot.sendMessage(msg.from.id,`
            🚩Wrong Input 🚩
            
Write your birthday day like this :

Year-Month-Day
ex : 2000-12-24
            `)
        }

        const arr = cleanText.split("-")
        if(arr[0].length == 4 && (parseInt(arr[0]) < 2022)){
            if((arr[1].length === 2 || arr[1].length === 1) && (parseInt(arr[1]) < 13)){
                if((arr[2].length === 2 || arr[2].length === 1) && (parseInt(arr[2]) < 32)){
                    let url = await getPicture(cleanText);
                    return bot.sendPhoto(msg.from.id, url);
                }else{
                    return bot.sendMessage(msg.from.id, "🚩 Please Write Valid Day 🚩")
                }
            }else{
                return bot.sendMessage(msg.from.id, "🚩 Please Write Valid Month 🚩")
            }
        }else{
            return bot.sendMessage(msg.from.id, "🚩 Please Write Valid Year 🚩")
        }
    }


    if(msg.text == "/space"){
        return bot.sendMessage(msg.from.id, `
        〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is showing you picture of space taken in the same day as your birthday
🔭🔭

Write your birthday day like this :

Year-Month-Day
ex : 2000-12-24
        `)
    }


    // Weather 


    if(msg.text.includes("city")){
        let city = msg.text.trim().split(" ").reverse()[0];
        let result = await getWeather(city);
        if(result == "404"){
            return bot.sendMessage(msg.from.id, `🚩 Enter valid city 🚩`)
        }
        return bot.sendMessage(msg.from.id, `

${result.name} , ${result.sys.country} 🏙
____________________
${parseInt(result.main.temp)} 🌡 • ${result.weather[0].main} ☁️ • ${result.wind.speed} 🍃
        `);
    }


    if(msg.text == "/weather"){
        return bot.sendMessage(msg.from.id, `
        〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is to check the weather in any city you want
🌦🌦

Write a city like this :

city : “city”
ex : city : jeddah
        `);
    }



    // Movies 
    if(msg.text.includes("rating")){
        let movie = msg.text.trim().split(" ").reverse()[0];
        let result = await getMovie(movie);
        if(result == "404"){
            return bot.sendMessage(msg.from.id, `🚩 Enter valid movie name 🚩`)
        }
        let here = await bot.sendPhoto(msg.from.id, result.Poster);
        return bot.sendMessage(msg.from.id, `
${result.Title} 🍿
____________
${result.Year} 🎥 • ${result.Runtime} ⏰ • ${result.Genre} 🎞
            
💫
IMDB : ${result.imdbRating}
Awards : ${result.Awards}
        `)
    }


    if(msg.text == "/random"){
        let random = await getMovie("random");
        let here = await bot.sendPhoto(msg.from.id, random.Poster);
        return bot.sendMessage(msg.from.id, `
${random.Title} 🍿
____________
${random.Year} 🎥 • ${random.Runtime} ⏰ • ${random.Genre} 🎞
                    
💫
IMDB : ${random.imdbRating}
Awards : ${random.Awards}
        `)
    }

    if(msg.text == "/rate"){
        return bot.sendMessage(msg.from.id, `
        〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

Write the name of the movie like this :

rating : "movie name" 
ex => rating : gravity
        `)
    }

    if(msg.text == "/movies"){
        return bot.sendMessage(msg.from.id, `
        〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is for showing movies and their rating
🍿🍿

/random    - To select random movie to watch 🎥
/rate      - To get the rate of specific movie 💫
        `)
    }



    // Photos
    if(msg.text.includes("show")){
        let photos = msg.text.trim().split(" ").reverse()[0];
        let result = await getPhoto(photos);
        if(result == "404"){
            return bot.sendMessage(msg.from.id, `🚩 Enter valid photos name 🚩`)
        }
        bot.sendMessage(msg.from.id, "Wait... ⏰")
        await bot.sendPhoto(msg.from.id, result[0].urls.full);
        await bot.sendPhoto(msg.from.id, result[1].urls.full);
        await bot.sendPhoto(msg.from.id, result[2].urls.full)
        return bot.sendMessage(msg.from.id, "🤩🤩")
    }


    if(msg.text == "/picker"){
        let random = await getPhoto("random");;
        return bot.sendPhoto(msg.from.id, random);
    }

    if(msg.text == "/catch"){
        return bot.sendMessage(msg.from.id, `
        〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

Write the name of the photos like this :

show : "photos name" 
ex => show : cars
        `)
    }

    if(msg.text == "/photos"){
        return bot.sendMessage(msg.from.id, `
        〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is for showing random or specific photos
📸📸

/picker    - To select random photos to watch 🔥
/catch      - To get specific photos ✨
        `)
    }
})

app.get("/", (req,res) => {
    return res.render("main");
});

app.listen(PORT, err => err ? console.log(err) : console.log("listening on PORT : " + PORT))