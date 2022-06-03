//NODE MODULES
require('dotenv').config()
const express = require('express')
const BodyParser = require('body-parser')


const app = express()
const PORT = process.env.PORT || 5000


//render static html files in the public folder
app.use(express.static('public'))
//return middleware for urlencoded bodies
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
//we are using ejs to contol dynamic files
app.set('view engine', 'ejs')


//attaching routers here
const db = require('./api/config/databaseConfig')
const loansRouter = require('./api/routes/loans.js')

app.use('/loan', loansRouter)


//connect to server, database
app.listen(PORT, async () => {
    console.log(`listening on ${PORT}...`);

    await db.connectToServer()
});

