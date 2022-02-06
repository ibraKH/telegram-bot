import TelegramBot from 'node-telegram-bot-api';
import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import path from 'path'



// website
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
import Pool from './database/connection.js'


const bot = new TelegramBot(token, {polling: true});

var answerCallbacks = "default";

bot.on("callback_query", async (msg) => {


    // start
    if(msg.data == "start"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
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
        answerCallbacks = "ar";
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
        🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆


        أهلا ${msg.from.first_name}  👋 👋
        

        📓 هذا البوت تجريبي 📓
        📓   أكثر من 4 api   📓

        
        `, {
            reply_markup: {
                inline_keyboard: [
                    [{text: "الأوامر", callback_data : "commandAR"}]
                ]
            }
        })
    }
    if(msg.data == "en"){
        answerCallbacks = "en";
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
        🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆


        Welcome ${msg.from.first_name}  👋 👋
        

        📓 this bot is demo  📓
        📓      4 apis...    📓

        
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
        `, {reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                anwser.text.toLowerCase();
                let cleanText = anwser.text.replace(" ", "");
        let regex = /[^0-9-]/gi
        if(regex.test(cleanText)){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Date 🚩
الرجاء كتابة تاريخ صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceAR"}]
                            ]
                        }
                    })
        }

        const arr = cleanText.split("-")
        if(arr[0].length == 4 && (parseInt(arr[0]) < 2022)){
            if((arr[1].length === 2 || arr[1].length === 1) && (parseInt(arr[1]) < 13)){
                if((arr[2].length === 2 || arr[2].length === 1) && (parseInt(arr[2]) < 32)){
                    let url = await getPicture(cleanText);
                    await bot.sendPhoto(anwser.from.id, url);
                    return bot.sendMessage(anwser.from.id, `
الأوامر
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandAR"}]
                            ]
                        }
                    })
                }else{
                    return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Day 🚩
الرجاء كتابة يوم صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceAR"}]
                            ]
                        }
                    })
                }
            }else{
                return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Month 🚩
الرجاء كتابة شهر صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceAR"}]
                            ]
                        }
                    })
            }
        }else{
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Year 🚩
الرجاء كتابة سنة صحيحة
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceAR"}]
                            ]
                        }
                    })
        }
            })
        });
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
        `, {reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                anwser.text.toLowerCase();
                let cleanText = anwser.text.replace(" ", "");
        let regex = /[^0-9-]/gi
        if(regex.test(cleanText)){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Date 🚩
الرجاء كتابة تاريخ صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceEN"}]
                            ]
                        }
                    })
        }

        const arr = cleanText.split("-")
        if(arr[0].length == 4 && (parseInt(arr[0]) < 2022)){
            if((arr[1].length === 2 || arr[1].length === 1) && (parseInt(arr[1]) < 13)){
                if((arr[2].length === 2 || arr[2].length === 1) && (parseInt(arr[2]) < 32)){
                    let url = await getPicture(cleanText);
                    await bot.sendPhoto(anwser.from.id, url);
                    return bot.sendMessage(msg.from.id, `
commands
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandEN"}]
                            ]
                        }
                    })
                }else{
                    return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Day 🚩
الرجاء كتابة يوم صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceEN"}]
                            ]
                        }
                    })
                }
            }else{
                return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Month 🚩
الرجاء كتابة شهر صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceEN"}]
                            ]
                        }
                    })
            }
        }else{
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Year 🚩
الرجاء كتابة سنة صحيحة
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceEN"}]
                            ]
                        }
                    })
        }
            })
        })
    }


    // weather
    if(msg.data == "weatherAR"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

هذا الأمر يعرض حالة الجو في جميع المدن
🌦🌦



أكتب الأمر بالصيغة التالية :


🌦🌦
        `, {reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                let city = anwser.text.trim().split(" ").reverse()[0];
        let result = await getWeather(city);
        if(result == "404"){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid City 🚩
الرجاء كتابة مدينة صحيحة
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "weatherAR"}]
                            ]
                        }
                    })
        }
        bot.sendMessage(anwser.from.id, `

${result.name} , ${result.sys.country} 🏙
____________________
${parseInt(result.main.temp)} 🌡 • ${result.weather[0].main} ☁️ • ${result.wind.speed} 🍃
        `);
        return bot.sendMessage(anwser.from.id, `
الأوامر
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandAR"}]
                            ]
                        }
                    })
            })
            });
    }
    if(msg.data == "weatherEN"){
        bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is to check the weather in any city you want

Write a city :


🌦🌦
        `, {reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                let city = anwser.text.trim().split(" ").reverse()[0];
        let result = await getWeather(city);
        if(result == "404"){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid City 🚩
الرجاء كتابة مدينة صحيحة
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "weatherEN"}]
                            ]
                        }
                    })
        }
        await bot.sendMessage(anwser.from.id, `

${result.name} , ${result.sys.country} 🏙
____________________
${parseInt(result.main.temp)} 🌡 • ${result.weather[0].main} ☁️ • ${result.wind.speed} 🍃
        `);
        return bot.sendMessage(msg.from.id, `
commands
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandEN"}]
                            ]
                        }
                    })
            })
            })
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
        await bot.sendPhoto(msg.from.id, random.Poster);
        await bot.sendMessage(msg.from.id, `
${random.Title} 🍿
____________
${random.Year} 🎥 • ${random.Runtime} ⏰ • ${random.Genre} 🎞
                    
💫
IMDB : ${random.imdbRating}
Awards : ${random.Awards}
        `)
        return bot.sendMessage(msg.from.id, `
Back 🔙
العودة 🔙
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "start"}]
                            ]
                        }
                    })
    }
    if(msg.data == "ratingAR"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

أكتب أسم الفلم :


البحث بالأنقليزي فقط!
🍿🍿  
        `,{reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                anwser.text.toLowerCase();
                let movie = anwser.text.trim().split(" ").reverse()[0];
        let result = await getMovie(movie);
        if(result == "404"){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Movie 🚩
الرجاء كتابة فلم صحيح
                                `, {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{text: "🔙", callback_data: "ratingAR"}]
                                        ]
                                    }
                                })
        }
        await bot.sendPhoto(anwser.from.id, result.Poster);
        await bot.sendMessage(anwser.from.id, `
${result.Title} 🍿
____________
${result.Year} 🎥 • ${result.Runtime} ⏰ • ${result.Genre} 🎞
            
💫
IMDB : ${result.imdbRating}
Awards : ${result.Awards}
        `)
        return bot.sendMessage(anwser.from.id, `
الأوامر
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandAR"}]
                            ]
                        }
                    })
            })
        })
    }
    if(msg.data == "ratingEN"){
        bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

Write the name of the movie :



🍿🍿  
        `,{reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                anwser.text.toLowerCase();
                let movie = anwser.text.trim().split(" ").reverse()[0];
        let result = await getMovie(movie);
        if(result == "404"){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Movie 🚩
الرجاء كتابة فلم صحيح
                                `, {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{text: "🔙", callback_data: "ratingEN"}]
                                        ]
                                    }
                                })
        }
        await bot.sendPhoto(anwser.from.id, result.Poster);
        await bot.sendMessage(anwser.from.id, `
${result.Title} 🍿
____________
${result.Year} 🎥 • ${result.Runtime} ⏰ • ${result.Genre} 🎞
            
💫
IMDB : ${result.imdbRating}
Awards : ${result.Awards}
        `)
        return bot.sendMessage(msg.from.id, `
commands
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandEN"}]
                            ]
                        }
                    })
            })
        })
    }


    // photos
    if(msg.data == "photosAR"){
        Pool.query(`SELECT attempt FROM users WHERE user_name = '${msg.from.username}'`, (err,result) => {
            if(err){
                console.log(err);
            }

            const attempt = result.rows[0].attempt;
            bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
هذا الأمر لعرض صور عشوائية أو بختيارك 
📸📸


عدد المحاولات المتبقية : ${attempt} 
        `, {
            reply_markup: {
                inline_keyboard: [
                    [{text: "عشوائي", callback_data: "picker"}],
                    [{text: "أختر فئة أو عنصر", callback_data: "catchAR"}]
                ]
            }
        })
        })
    }
    if(msg.data == "photosEN"){
        Pool.query(`SELECT attempt FROM users WHERE user_name = '${msg.from.username}'`, (err,result) => {
            if(err){
                console.log(err);
            }

            var attempt = result.rows[0].attempt;
            bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
This command is for showing random or specific photos 
📸📸


You have ${attempt} attempt left
`, {
            reply_markup: {
                inline_keyboard: [
                    [{text: "random", callback_data: "picker"}],
                    [{text: "specific", callback_data: "catchEN"}]
                ]
            }
        })
        })
    }
    if(msg.data == "picker"){
        Pool.query(`SELECT attempt FROM users WHERE user_name = '${msg.from.username}'`, async (err,result) => {
            if(err){
                console.log(err);
            }

            if(result.rows[0].attempt == 0){
                bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
                return bot.sendMessage(msg.from.id, `
🚩 Sorry you are out of attempts 🚩
للاسف خلصت محاولاتك`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: "🔙", callback_data: "start"}]
                        ]
                    }
                }); 
            }else{
                Pool.query(`UPDATE users SET attempt = attempt - 1 WHERE user_name = '${msg.from.username}'`, async (err,result) => {
                    if(err){
                        console.log(err);
                    }
                })
                bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
                let random = await getPhoto("random");
                if(random == "404"){
                    return bot.sendMessage(msg.from.id, "Sorry try again", {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "start"}]
                            ]
                        }
                    });
                }
                await bot.sendPhoto(msg.from.id, random);
                return bot.sendMessage(msg.from.id, `
Back 🔙
العودة 🔙
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "start"}]
                            ]
                        }
                    })
            }
        })
    }
    if(msg.data == "catchAR"){
        Pool.query(`SELECT attempt FROM users WHERE user_name = '${msg.from.username}'`, async (err,result) => {
            if(err){
                console.log(err);
            }

            if(result.rows[0].attempt == 0){
                bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
                return bot.sendMessage(msg.from.id, `
🚩 Sorry you are out of attempts 🚩
للاسف خلصت محاولاتك`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: "🔙", callback_data: "photosAR"}]
                        ]
                    }
                });
            }else{
                Pool.query(`UPDATE users SET attempt = attempt - 1 WHERE user_name = '${msg.from.username}'`, async (err,result) => {
                    if(err){
                        console.log(err);
                    }
                })
                bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
                await bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

أكتب أسم الفئة أو العنصر  :

البحث بالأنقليزي فقط

📸📸

        `,{reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                anwser.text.toLowerCase();
                let photos = anwser.text;
        let result = await getPhoto(photos);
        if(result == "404"){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Photos name 🚩
الرجاء كتابة أسم أو عنصر صحيح
                                `, {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{text: "🔙", callback_data: "catchAR"}]
                                        ]
                                    }
                                })
        }
        await bot.sendMessage(anwser.from.id, "Wait... ⏰")
        await bot.sendPhoto(anwser.from.id, result[0].urls.small);
        await bot.sendPhoto(anwser.from.id, result[1].urls.small);
        await bot.sendPhoto(anwser.from.id, result[2].urls.small);
        await bot.sendMessage(msg.from.id, "🤩🤩")
        return bot.sendMessage(anwser.from.id, `
الأوامر
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandAR"}]
                            ]
                        }
                    })
            })
        })
            }
        })
    }
    if(msg.data == "catchEN"){
        Pool.query(`SELECT attempt FROM users WHERE user_name = '${msg.from.username}'`, async (err,result) => {
            if(err){
                console.log(err);
            }

            if(result.rows[0].attempt == 0){
                bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
                return bot.sendMessage(msg.from.id, `
🚩 Sorry you are out of attempts 🚩
للاسف خلصت محاولاتك`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: "🔙", callback_data: "photosAR"}]
                        ]
                    }
                });
            }else{
                Pool.query(`UPDATE users SET attempt = attempt - 1 WHERE user_name = '${msg.from.username}'`, async (err,result) => {
                    if(err){
                        console.log(err);
                    }
                })
                bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️


Write the name of the photos :


📸📸

        `,{reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                anwser.text.toLowerCase();
                let photos = anwser.text;
        let result = await getPhoto(photos);
        if(result == "404"){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Photos name 🚩
الرجاء كتابة أسم أو عنصر صحيح
                                `, {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{text: "🔙", callback_data: "catchEN"}]
                                        ]
                                    }
                                })
        }
        await bot.sendMessage(anwser.from.id, "Wait... ⏰")
        await bot.sendPhoto(anwser.from.id, result[0].urls.small);
        await bot.sendPhoto(anwser.from.id, result[1].urls.small);
        await bot.sendPhoto(anwser.from.id, result[2].urls.small);
        await bot.sendMessage(msg.from.id, "🤩🤩")
        return bot.sendMessage(msg.from.id, `
commands
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandEN"}]
                            ]
                        }
                    })
            })
        })
            }
        })
        
    }
    if(msg.data == "catch"){
        Pool.query(`SELECT attempt FROM users WHERE user_name = '${msg.from.username}'`, async (err,result) => {
            if(err){
                console.log(err);
            }

            if(result.rows[0].attempt == 0){
                bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
                return bot.sendMessage(msg.from.id, `
🚩 Sorry you are out of attempts 🚩
للاسف خلصت محاولاتك`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: "🔙", callback_data: "photosAR"}]
                        ]
                    }
                });
            }else{
                Pool.query(`UPDATE users SET attempt = attempt - 1 WHERE user_name = '${msg.from.username}'`, async (err,result) => {
                    if(err){
                        console.log(err);
                    }
                })
                bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
        return bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️


Write the name of the photos :


📸📸

        `,{reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                anwser.text.toLowerCase();
                let photos = anwser.text;
        let result = await getPhoto(photos);
        if(result == "404"){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Photos name 🚩
الرجاء كتابة أسم أو عنصر صحيح
                                `, {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{text: "🔙", callback_data: "catchEN"}]
                                        ]
                                    }
                                })
        }
        await bot.sendMessage(anwser.from.id, "Wait... ⏰")
        await bot.sendPhoto(anwser.from.id, result[0].urls.small);
        await bot.sendPhoto(anwser.from.id, result[1].urls.small);
        await bot.sendPhoto(anwser.from.id, result[2].urls.small);
        await bot.sendMessage(msg.from.id, "🤩🤩")
        return bot.sendMessage(msg.from.id, `
commands
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandEN"}]
                            ]
                        }
                    })
            })
        })
            }
        })
        
    }
})

// start
bot.onText(/\/start/,  async (msg) => {
    Pool.query(`SELECT * FROM users WHERE user_name = '${msg.from.username}';`, (err,result) => {
        if(err){
            console.log(err);
        }

        if(result.rows.length == 0){
            Pool.query(`INSERT INTO users VALUES ('${msg.from.username}', 2,1);`, (error, good) => {
                if(error){
                    console.log(error);
                }
            })
        }else{
            Pool.query(`UPDATE users SET visits = visits + 1 WHERE user_name = '${msg.from.username}';`, (err, result) => {
                if(err){
                    console.log(err);
                }
            })
        }
    });
    return bot.sendMessage(msg.from.id, `
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
2000-12-24


        `, {reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                anwser.text.toLowerCase();
                let cleanText = anwser.text.replace(" ", "");
        let regex = /[^0-9-]/gi
        if(regex.test(cleanText)){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Date 🚩
الرجاء كتابة تاريخ صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceBack"}]
                            ]
                        }
                    })
        }

        const arr = cleanText.split("-")
        if(arr[0].length == 4 && (parseInt(arr[0]) < 2022)){
            if((arr[1].length === 2 || arr[1].length === 1) && (parseInt(arr[1]) < 13)){
                if((arr[2].length === 2 || arr[2].length === 1) && (parseInt(arr[2]) < 32)){
                    let url = await getPicture(cleanText);
                    await bot.sendPhoto(anwser.from.id, url);
                    return bot.sendMessage(msg.from.id, `
commands
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "commandEN"}]
                            ]
                        }
                    })
                }else{
                    return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Day 🚩
الرجاء كتابة يوم صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceBack"}]
                            ]
                        }
                    })
                }
            }else{
                return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Month 🚩
الرجاء كتابة شهر صحيح
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceBack"}]
                            ]
                        }
                    })
            }
        }else{
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid Year 🚩
الرجاء كتابة سنة صحيحة
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "spaceBack"}]
                            ]
                        }
                    })
        }
            })
        })
})

// weather
bot.onText(/\/weather/, async(msg) => {
    bot.sendMessage(msg.from.id, `
〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

This command is to check the weather in any city you want

Write a city :


🌦🌦
        `, {reply_markup: JSON.stringify({force_reply: true})}).then((replay) => {
            bot.onReplyToMessage(replay.chat.id, replay.message_id, async (anwser) => {
                let city = anwser.text.trim().split(" ").reverse()[0];
        let result = await getWeather(city);
        if(result == "404"){
            return bot.sendMessage(anwser.from.id, `
🚩 Please Write Valid City 🚩
الرجاء كتابة مدينة صحيحة
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{text: "🔙", callback_data: "weatherBack"}]
                            ]
                        }
                    })
        }
        return bot.sendMessage(anwser.from.id, `

${result.name} , ${result.sys.country} 🏙
____________________
${parseInt(result.main.temp)} 🌡 • ${result.weather[0].main} ☁️ • ${result.wind.speed} 🍃
        `);
            })
            })
});

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
    msg.text.toLowerCase();
    // Space 
    // Weather 
    // Movies 
    // Photos
    //
})

app.get("/", (req,res) => {
    return res.render("main");
});


app.listen(PORT, err => err ? console.log(err) : console.log("listening on PORT : " + PORT))