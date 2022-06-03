//NODE MODULES
const express = require('express')
const BodyParser = require('body-parser')


const app = express()


//render static html files in the public folder
app.use(express.static('public'))
//return middleware for urlencoded bodies
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
//we are using ejs to contol dynamic files
app.set('view engine', 'ejs')

