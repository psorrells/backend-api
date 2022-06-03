/* CRU(D) FOR LOANS */
const express = require('express')
const { route } = require('express/lib/application')
const Loan = require('../models/loan')
const router = express.Router()
const db = require('../config/databaseConfig')


//all these routes begin with loan

//CREATE A NEW LOAN, UPDATE A LOAN
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
            loanID = await loanID.insertedID.str
        } else {
            await db.getDb().collection('Loans').updateOne({"_id" : loanID}, newLoan)
        }
    
        console.log(`Success! Loan has been added.`)
        res.json(loanID)
    } catch(err) {
        console.log(err)
    }
})

//RETRIEVE A LOAN
router.get('/view', async (req,res) => {
    let id = req.query.id

    try {
        let userLoan = await db.getDb().collection('Loans').findOne({"_id" : id})
    
        res.render('loan/view', {
            loan : userLoan
          })
    } catch(err) {
        console.log(err)
    }

})