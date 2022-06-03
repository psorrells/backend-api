/* CRU(D) FOR LOANS */
const express = require('express')
const { route } = require('express/lib/application')
const Loan = require('../models/loan')
const router = express.Router()
const db = require('../config/databaseConfig')
const { ObjectId } = require('bson')
const ObjectID = require("mongodb").ObjectID;


//all these routes begin with loan

//CREATE A NEW LOAN, UPDATE A LOAN
//get form to request loan ID for update
router.get('/update', (req,res) => {
    res.render('pickLoan', { 
        action: 'update',
        route: 'create'
    })
})
//get form for new and update
router.get('/create', async (req,res) => {
    let id = req.body.id

    let userLoan = await getLoan(id)
    
    //if we didn't receive a loan, set the values to null to send to the form
    if (!userLoan) {
        userLoan = new Loan(null,null,null,null)
    }

    res.render('createEditLoan', { 'loan': userLoan })
})

//post to database
router.post('/create', async (req,res) => {
    let amount = req.body.amount
    let interestRate = req.body.interestRate
    let loanLength = req.body.loanLength
    let monthlyPayment = req.body.monthlyPayment
    let loanID = req.body.id || null

    //add loan to database, return id
    try {    
        let newLoan = new Loan(amount, interestRate, loanLength, monthlyPayment)

        if(!loanID) {
            loanID = await db.getDb().collection('Loans').insertOne(newLoan)
        } else {
            await db.getDb().collection('Loans').updateOne({"_id" : loanID}, newLoan)
        }
    
        console.log(`Success! Loan has been added.`)
        res.render('loanSuccess', {
            loan: loanID
        })
    } catch(err) {
        console.log(err)
    }
})

//RETRIEVE A LOAN
router.get('/view/', (req,res) => {
    res.render('pickLoan', { 
        action: 'view',
        route: 'view'
    })
})

router.post('/view/', async (req,res) => {
    let id = req.body.id

    let userLoan = await getLoan(id)

    if (!await userLoan) res.status(404).write('Error: Loan not does not exist')

    res.render('viewLoan', { loan: userLoan})
})


async function getLoan(id = null) {
    if (id === null) return null
    try {
        let userLoan = await db.getDb().collection('Loans').findOne({"_id": ObjectId(id)})
        return userLoan
    } catch(err) {
        console.log(err)
    }
}

module.exports = router