abstract class Payment {
    protected paymentStatus: boolean = false;

    constructor(
        public amount: number,
        public date: Date
    ) { }

    abstract processPayment(): string;
}

class CreditCardPayment extends Payment {
    private cardNumber: string;
    private cardCVV: string;

    constructor(amount: number, date: Date, cardNumber: string, cvv: string) {
        super(amount, date);
        this.cardNumber = cardNumber;
        this.cardCVV = cvv;
    }

    processPayment(): string {
        this.paymentStatus = true;
        return `Your Credit Card Payment is: ${this.amount} Rs on ${this.date}`;
    }

    getCardNumber(): string {
        const lastNum = this.cardNumber.slice(-4);
        const maskCard = lastNum.padStart(this.cardNumber.length, "*")
        return `Your Masked Credit Card Number is: ${maskCard}`;
    }
}

class PayPalPayment extends Payment {
    private clientEmail: string;
    private clientPassword: string;

    constructor(amount: number, date: Date, email: string, password: string) {
        super(amount, date);
        this.clientEmail = email;
        this.clientPassword = password;
    }

    processPayment(): string {
        this.paymentStatus = true;
        return `Your PayPal Payment is: ${this.amount} Rs on ${this.date}`;
    }

    getPayPalEmail(): string {
        return `User's Email_id is: ${this.clientEmail}`;
    }
}

class CryptoPayment extends Payment {
    private walletAddress: string;
    private privateKey: string;
    public publicKey: string;

    constructor(amount: number, date: Date, walletAddress: string, publicKey: string, privateKey: string) {
        super(amount, date);
        this.walletAddress = walletAddress;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    processPayment(): string {
        this.paymentStatus = true;
        return `Your Crypto Payment is: ${this.amount} Rs on ${this.date}`;
    }

    getWalletAddress(): string {
        return `Your requested Wallet Address is: ${this.walletAddress}`;
    }
}


const creditCardPayment = new CreditCardPayment(100000, new Date(), '123456789123', '321');
const paypalPayment = new PayPalPayment(50000, new Date(), 'anshjeet@gmail.com', 'pass1234');
const cryptoPayment = new CryptoPayment(800000, new Date(), 'abcd...1234', 'private_key', 'public_key');

console.log(creditCardPayment.getCardNumber());
console.log(creditCardPayment.processPayment());

console.log(paypalPayment.getPayPalEmail());
console.log(paypalPayment.processPayment());

console.log(cryptoPayment.getWalletAddress());
console.log(cryptoPayment.processPayment());

// Your Masked Credit Card Number is: ********9123
// Your Credit Card Payment is: 100000 Rs on Tue Feb 11 2025 21:25:25 GMT+0530 (India Standard Time)
// User's Email_id is: anshjeet@gmail.com
// Your PayPal Payment is: 50000 Rs on Tue Feb 11 2025 21:25:25 GMT+0530 (India Standard Time)
// Your requested Wallet Address is: abcd...1234
// Your Crypto Payment is: 800000 Rs on Tue Feb 11 2025 21:25:25 GMT+0530 (India Standard Time)