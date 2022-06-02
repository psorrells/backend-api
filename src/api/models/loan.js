/* LOAN CLASS */

class Loan {
    //Inputs are amount, interest rate, length of the loan in months, and monthly payment amount
    constructor(amount, interestRate, loanLength, monthlyPayment) {
        this.amount = amount
        this.interestRate = interestRate
        this.loanLength = loanLength
        this.monthlyPayment = monthlyPayment
    }

    display() {
        return `Loan Amount: $${this.amount}\nInterest Rate: ${this.interestRate * 100}%\nLength of Loan in Months: ${this.loanLength} months\nMonthly Payment Amount: $${this.monthlyPayment}/month`
    }
}