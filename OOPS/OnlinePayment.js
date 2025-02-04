class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
        this.paymentStatus = false;
    }

    processPayment() {
        if (!this.paymentStatus)
            console.log('Payment needs to be processed.....');

    }


}
//Inheritance
class CreditCardPayment extends Payment {
    #cardNumber;//private
    #cardcvv;//private


    constructor(amount, date, cardNumber, cvv) {
        super(amount, date);
        this.#cardNumber = cardNumber;
        this.#cardcvv = cvv;//abstraction

    }

    processPayment() {

        this.paymentStatus = true;
        if (this.paymentStatus)
            return `Your Credit Card Payment is: ${this.amount}Rs on ${this.date}`;
    }

    getCardNumber() {
        const lastNum = this.#cardNumber.slice(-4);
        const maskCard = lastNum.padStart(this.#cardNumber.length, "*")
        return `Your Masked Credit Card Number is: ${maskCard}`;
    }
}
//Inheritance
class PayPalPayment extends Payment {
    #clientEmail;
    #clientPassword;

    constructor(amount, date, email, password) {
        super(amount, date);
        this.#clientEmail = email;
        this.#clientPassword = password;//abstraction
    }

    processPayment() {

        this.paymentStatus = true;
        if (this.paymentStatus)
            return `Your PayPal Payment is: ${this.amount}Rs on ${this.date}`;
    }

    getPayPalEmail() {
        return ` User's Email_id is : ${this.#clientEmail}`;
    }
}
//Inheritance
class CryptoPayment extends Payment {
    #walletAddress;
    #privateKey;

    constructor(amount, date, walletAddress, publicKey, privateKey) {
        super(amount, date);
        this.#walletAddress = walletAddress;
        this.publicKey = publicKey;//abstraction
        this.#privateKey = privateKey;//private
    }

    processPayment() {

        this.paymentStatus = true;
        if (this.paymentStatus)
            return `Your Crypto Payment is: ${this.amount}Rs on ${this.date}`;
    }

    getWalletAddress() {
        return `Your requested Wallet Address is : ${this.#walletAddress}`;
    }
}

//Object creation
const creditCard = new CreditCardPayment(100000, new Date(), '123456789123', '321');
const paypal = new PayPalPayment(50000, new Date(), 'anshjeet@gmail.com', 'pass1234');
const crypto = new CryptoPayment(800000, new Date(), 'abcd...1234', 'private_key', 'public_key');

console.log(creditCard.getCardNumber()); // Your Masked Credit Card Number is: ********9123
console.log(creditCard.processPayment()); // Your Credit Card Payment is: 100000Rs on Tue Feb 04 2025 22:15:13 GMT+0530 (India Standard Time)
console.log(paypal.getPayPalEmail()); //  User's Email_id is : anshjeet@gmail.com
console.log(crypto.getWalletAddress()); //  Your requested Wallet Address is : abcd...1234     