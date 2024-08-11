const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUVMbUJId0E5S2ZpbkdoQ2pQYzFiY1lISE41T280SjhYZVBKekVNYnFXcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjRzQmU2TGRCYjkrOVhKTnN1WDB6UUEvWksrQWNiQU5yMVd2NUJHMGZGaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwTUNWQ3M4QmtZSlRwOVRYQ24rbGQ1VHF5QUQ0ekRyZnlSeVJtUFpFV25JPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPZjE4Z3NTck5vbEw0QmFJQ1lLRGlHTlZLOWFraGpsMkpUbFVhaWxWOXdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMRXlFZXR5K05EdHJPLzRCRlVlRDJpeTB6R0JaaVEwR0dZK0QydHNYWDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IittM0k1OW5uSlFJMHRVb0VVOW9HODVvamFEZzlST2M3c2NLaHVHd1E4RzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0JtRk45SnEvb3c2TnpiSi9Yem9KclBnRlM2M0dtcmFHVjdZa3RjQzhHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieWhLSlVxMll0Rm9ZTGRPZTRhQzBtdFdQdW96cmpsV1dUTG82OVZ1NzJHdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikh5RDBCQ1g3cVg0RGJCL2NWdWV4cnBWVyt5NlN4THZwazlwVmhEZnAwaVM1YTNkcWpvclNHSWpEdVFKZTNYMnZ6L3hZcmZBa1hINU1qTU55OEpYNkFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYzLCJhZHZTZWNyZXRLZXkiOiJHY0JTeExNTEFGd1pQcWJHcy9KOFpVa1FHRzBjVGhtRDlsMmtuLzl0U0pFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBRTAzSDdlWFI1NldySkExZ0NJSnVRIiwicGhvbmVJZCI6IjQyODIxNTYzLTQ0ZjMtNGQ3NC04MjNiLTQ2YTEzZGU4NTA1OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0am0vZE1FVnZzUXVmQ2d4NEcycytPT0NLbE09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFFscXp0T0pzanpKc09ZS2NnWis1WGJxYVlJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjQxR0JFOFpDIiwibWUiOnsiaWQiOiIyNjM3MTQyOTY1NTA6MjJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lXRnFOUUhFSlhQNUxVR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkUyTzJsdTRHTGJjVExMdENVczIwdWhGSVpKTm16dStCK2pKcWRSTzF4eG89IiwiYWNjb3VudFNpZ25hdHVyZSI6IjdERWRTYVVPcnM5b01XOG5BdVlIb0FsVHZscVZCbVpoKzhIUkZCVFBBdHI0cTBaVDdudC9keXUxa0o4cW9UWEtySUlLRXVTMVE4SzZEZWg1cHhwSUFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJJUTh0blFXSk5QdkJyTUh0ektXNTJlenNZUkh1UU1NNGRiQVF6ekFCNDM3QVVralpYK3RCUjBhMHN3Z0docWU4ajFWVGt1WTBIMU9VNEFReGZGampDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNDI5NjU1MDoyMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSTmp0cGJ1QmkyM0V5eTdRbExOdExvUlNHU1Raczd2Z2ZveWFuVVR0Y2NhIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNDEwMzM5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo1VyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Sage Dickson",
    NUMERO_OWNER : process.env.OWNER_NUM || "263780597802",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Sage Dickson_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
