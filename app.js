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



bot.on("callback_query", async (msg) => {


    // start
    if(msg.data == "start"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        bot.sendMessage(msg.from.id, `
🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆 
`, {
    reply_markup: {
        inline_keyboard: [
            [{text: "عربي", callback_data: "ar"}],
            [{text: "English", callback_data: "en"}],
        ]
    }
})
    }
    if(msg.data == "ar"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
        🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆


        أهلا ${msg.from.first_name}  👋 👋
        

        📓 هذا البوت تجريبي 📓


        
        `, {
            reply_markup: {
                inline_keyboard: [
                    [{text: "الأوامر", callback_data : "commandAR"}]
                ]
            }
        })
    }
    if(msg.data == "en"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
        🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆


        Welcome ${msg.from.first_name}  👋 👋
        

        📓 this bot is demo  📓


        
        `, {
            reply_markup: {
                inline_keyboard: [
                    [{text: "commands", callback_data : "commandEN"}]
                ]
            }
        })
    }


    // commands
    if(msg.data == "commandAR"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️`, {
            reply_markup: {
                inline_keyboard: [
                    [{text: "space 🔭", callback_data: "spaceAR"}],
                    [{text: "weather 🌦", callback_data: "weatherAR"}],
                    [{text: "movies 🍿", callback_data: "moviesAR"}],
                    [{text: "photos 📸", callback_data: "photosAR"}],
                ]
            }
        })
    }
    if(msg.data == "commandEN"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️`, {
            reply_markup: {
                inline_keyboard: [
                    [{text: "space 🔭", callback_data: "spaceEN"}],
                    [{text: "weather 🌦", callback_data: "weatherEN"}],
                    [{text: "movies 🍿", callback_data: "moviesEN"}],
                    [{text: "photos 📸", callback_data: "photosEN"}],
                ]
            }
        })
    }


    // space
    if(msg.data == "spaceAR"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

هذا الأمر لعرض صورة من الفضاء تم تصويرها في نفس يوم ميلادك
🔭🔭

بستخدام : NASA api

أكتب يوم ميلادك بالصيغة التالية :

يوم-شهر-سنة
مثال : 24-12-2000
        `);
    }
    if(msg.data == "spaceEN"){
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is showing you picture of space taken in the same day as your birthday
🔭🔭

with : NASA api

Write your birthday day like this :

Year-Month-Day
ex : 2000-12-24
        `)
    }


    // weather
    if(msg.data == "weatherAR"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

هذا الأمر يعرض حالة الجو في جميع المدن
🌦🌦

أكتب الأمر بالصيغة التالية :

city : “المدينة”
مثال : city : jeddah
        `);
    }
    if(msg.data == "weatherEN"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is to check the weather in any city you want
🌦🌦

Write a city like this :

city : “city”
ex : city : jeddah
        `);
    }


    // movies
    if(msg.data == "moviesAR"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
🍿🍿 هذا الأمر يعرض تقييم الافلام و ميزة أختيار فلم عشوائي
    `,{
        reply_markup: {
            inline_keyboard: [
                [{text: "أختر عشوائي", callback_data: "randomMovie"}],
                [{text: "عرض التقييم", callback_data: "ratingAR"}]
            ]
        }
    })
    }
    if(msg.data == "moviesEN"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
This command is for showing movies and their rating 🍿🍿
    `,{
        reply_markup: {
            inline_keyboard: [
                [{text: "Get Random Movie", callback_data: "randomMovie"}],
                [{text: "Get the rates of a movie", callback_data: "ratingEN"}]
            ]
        }
    })
    }
    if(msg.data == "randomMovie"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
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
    if(msg.data == "ratingAR"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

أكتب أسم الفلم بالصيغة التالية :

rating : "أسم الفلم" 
مثال => rating : gravity
        `)
    }
    if(msg.data == "ratingEN"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

Write the name of the movie like this :

rating : "movie name" 
ex => rating : gravity
        `)
    }


    // photos
    if(msg.data == "photosAR"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, "هذا الأمر لعرض صور عشوائية أو بختيارك 📸📸", {
            reply_markup: {
                inline_keyboard: [
                    [{text: "عشوائي", callback_data: "picker"}],
                    [{text: "أختر فئة أو عنصر", callback_data: "catchAR"}]
                ]
            }
        })
    }
    if(msg.data == "photosEN"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, "This command is for showing random or specific photos 📸📸", {
            reply_markup: {
                inline_keyboard: [
                    [{text: "random", callback_data: "picker"}],
                    [{text: "specific", callback_data: "catchEN"}]
                ]
            }
        })
    }
    if(msg.data == "picker"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        let random = await getPhoto("random");
        if(random == "404"){
            return bot.sendMessage(msg.from.id, "Sorry try again");
        }
        return bot.sendPhoto(msg.from.id, random);
    }
    if(msg.data == "catchAR"){
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

أكتب أسم الفئة أو العنصر بالصيغة التالية :

show : "الفئة أو العنصر" 
ex => show : cars
        `)
    }
    if(msg.data == "catchAR"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

Write the name of the photos like this :

show : "photos name" 
ex => show : cars
        `)
    }
})

// start
bot.onText(/\/start/,  async (msg) => {
    bot.sendMessage(msg.from.id, `
        🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆 
`, {
    reply_markup: {
        inline_keyboard: [
            [{text: "عربي", callback_data: "ar"}],
            [{text: "English", callback_data: "en"}],
        ]
    }
})
})

// commands
bot.onText(/\/command/, async (msg) => {
    return bot.sendMessage(msg.from.id, `⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️`, {
            reply_markup: {
                inline_keyboard: [
                    [{text: "space 🔭", callback_data: "space"}],
                    [{text: "weather 🌦", callback_data: "weather"}],
                    [{text: "movies 🍿", callback_data: "movies"}],
                    [{text: "photos 📸", callback_data: "photos"}],
                ]
            }
        })
})

// space
bot.onText(/\/space/ , async (msg) => {
    return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is showing you picture of space taken in the same day as your birthday
🔭🔭

Write your birthday day like this :

Year-Month-Day
ex : 2000-12-24
        `)
})

// weather
bot.onText(/\/weather/, async(msg) => {
    return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is to check the weather in any city you want
🌦🌦

Write a city like this :

city : “city”
ex : city : jeddah
        `);
})

// movies
bot.onText(/\/movies/, async (msg) => {
    return bot.sendMessage(msg.from.id, `
This command is for showing movies and their rating 🍿🍿
    `,{
        reply_markup: {
            inline_keyboard: [
                [{text: "random", callback_data: "randomMovie"}],
                [{text: "rate", callback_data: "rating"}]
            ]
        }
    })
})

// photos
bot.onText(/\/photos/, async(msg) => {
    return bot.sendMessage(msg.from.id, "This command is for showing random or specific photos 📸📸", {
        reply_markup: {
            inline_keyboard: [
                [{text: "picker", callback_data: "picker"}],
                [{text: "catch", callback_data: "catch"}]
            ]
        }
    })
})


bot.on("message", async (msg) => {

    // Space 
    if(msg.text.includes("-")){
        let cleanText = msg.text.replace(" ", "");
        let regex = /[^0-9-]/gi
        if(regex.test(cleanText)){
            return bot.sendMessage(msg.from.id, `
🚩 Please Write Valid Date 🚩
الرجاء كتابة تاريخ صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "start"}]
                            ]
                        }
                    })
        }

        const arr = cleanText.split("-")
        if(arr[0].length == 4 && (parseInt(arr[0]) < 2022)){
            if((arr[1].length === 2 || arr[1].length === 1) && (parseInt(arr[1]) < 13)){
                if((arr[2].length === 2 || arr[2].length === 1) && (parseInt(arr[2]) < 32)){
                    let url = await getPicture(cleanText);
                    bot.sendPhoto(msg.from.id, url);
                }else{
                    return bot.sendMessage(msg.from.id, `
🚩 Please Write Valid Day 🚩
الرجاء كتابة يوم صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "start"}]
                            ]
                        }
                    })
                }
            }else{
                return bot.sendMessage(msg.from.id, `
🚩 Please Write Valid Month 🚩
الرجاء كتابة شهر صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "start"}]
                            ]
                        }
                    })
            }
        }else{
            return bot.sendMessage(msg.from.id, `
🚩 Please Write Valid Year 🚩
الرجاء كتابة سنة صحيحة
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "start"}]
                            ]
                        }
                    })
        }
    }



    // Weather 
    if(msg.text.includes("city")){
        let city = msg.text.trim().split(" ").reverse()[0];
        let result = await getWeather(city);
        if(result == "404"){
            return bot.sendMessage(msg.from.id, `
🚩 Please Write Valid City 🚩
الرجاء كتابة مدينة صحيحة
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "start"}]
                            ]
                        }
                    })
        }
        return bot.sendMessage(msg.from.id, `

${result.name} , ${result.sys.country} 🏙
____________________
${parseInt(result.main.temp)} 🌡 • ${result.weather[0].main} ☁️ • ${result.wind.speed} 🍃
        `);
    }



    // Movies 
    if(msg.text.includes("rating")){
        let movie = msg.text.trim().split(" ").reverse()[0];
        let result = await getMovie(movie);
        if(result == "404"){
            return bot.sendMessage(msg.from.id, `
🚩 Please Write Valid Movie 🚩
الرجاء كتابة فلم صحيح
                                `, {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{text: "🔙", callback_data: "start"}]
                                        ]
                                    }
                                })
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



    // Photos
    if(msg.text.includes("show")){
        let photos = msg.text.trim().split(" ").reverse()[0];
        let result = await getPhoto(photos);
        if(result == "404"){
            return bot.sendMessage(msg.from.id, `
🚩 Please Write Valid Photos name 🚩
الرجاء كتابة أسم أو عنصر صحيح
                                `, {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{text: "🔙", callback_data: "start"}]
                                        ]
                                    }
                                })
        }
        await bot.sendMessage(msg.from.id, "Wait... ⏰")
        await bot.sendPhoto(msg.from.id, result[0].urls.small);
        await bot.sendPhoto(msg.from.id, result[1].urls.small);
        await bot.sendPhoto(msg.from.id, result[2].urls.small);
        return bot.sendMessage(msg.from.id, "🤩🤩")
    }

    //
})

app.get("/", (req,res) => {
    return res.render("main");
});

app.listen(PORT, err => err ? console.log(err) : console.log("listening on PORT : " + PORT))