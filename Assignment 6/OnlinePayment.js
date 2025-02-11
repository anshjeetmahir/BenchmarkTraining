var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Payment = /** @class */ (function () {
    function Payment(amount, date) {
        this.amount = amount;
        this.date = date;
        this.paymentStatus = false;
    }
    return Payment;
}());
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment(amount, date, cardNumber, cvv) {
        var _this = _super.call(this, amount, date) || this;
        _this.cardNumber = cardNumber;
        _this.cardCVV = cvv;
        return _this;
    }
    CreditCardPayment.prototype.processPayment = function () {
        this.paymentStatus = true;
        return "Your Credit Card Payment is: ".concat(this.amount, " Rs on ").concat(this.date);
    };
    CreditCardPayment.prototype.getCardNumber = function () {
        var lastNum = this.cardNumber.slice(-4);
        var maskCard = lastNum.padStart(this.cardNumber.length, "*");
        return "Your Masked Credit Card Number is: ".concat(maskCard);
    };
    return CreditCardPayment;
}(Payment));
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(amount, date, email, password) {
        var _this = _super.call(this, amount, date) || this;
        _this.clientEmail = email;
        _this.clientPassword = password;
        return _this;
    }
    PayPalPayment.prototype.processPayment = function () {
        this.paymentStatus = true;
        return "Your PayPal Payment is: ".concat(this.amount, " Rs on ").concat(this.date);
    };
    PayPalPayment.prototype.getPayPalEmail = function () {
        return "User's Email_id is: ".concat(this.clientEmail);
    };
    return PayPalPayment;
}(Payment));
var CryptoPayment = /** @class */ (function (_super) {
    __extends(CryptoPayment, _super);
    function CryptoPayment(amount, date, walletAddress, publicKey, privateKey) {
        var _this = _super.call(this, amount, date) || this;
        _this.walletAddress = walletAddress;
        _this.publicKey = publicKey;
        _this.privateKey = privateKey;
        return _this;
    }
    CryptoPayment.prototype.processPayment = function () {
        this.paymentStatus = true;
        return "Your Crypto Payment is: ".concat(this.amount, " Rs on ").concat(this.date);
    };
    CryptoPayment.prototype.getWalletAddress = function () {
        return "Your requested Wallet Address is: ".concat(this.walletAddress);
    };
    return CryptoPayment;
}(Payment));
var creditCardPayment = new CreditCardPayment(100000, new Date(), '123456789123', '321');
var paypalPayment = new PayPalPayment(50000, new Date(), 'anshjeet@gmail.com', 'pass1234');
var cryptoPayment = new CryptoPayment(800000, new Date(), 'abcd...1234', 'private_key', 'public_key');
console.log(creditCardPayment.getCardNumber());
console.log(creditCardPayment.processPayment());
console.log(paypalPayment.getPayPalEmail());
console.log(paypalPayment.processPayment());
console.log(cryptoPayment.getWalletAddress());
console.log(cryptoPayment.processPayment());
