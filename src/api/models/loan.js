/* LOAN CLASS */

class Loan {
    //Inputs are amount, interest rate (as a decimal), length of the loan in months, and monthly payment amount
    constructor(amount, interestRate, loanLength, monthlyPayment) {
        this.amount = amount
        this.interestRate = interestRate
        this.loanLength = loanLength
        this.monthlyPayment = monthlyPayment
    }

    display() {
        return `Loan Amount: $${this.amount}\n
                Interest Rate: ${this.interestRate * 100}%\n
                Length of Loan in Months: ${this.loanLength} months\n
                Monthly Payment Amount: $${this.monthlyPayment}/month`
    }
}

module.exports = Loan