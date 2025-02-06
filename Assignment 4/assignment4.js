const products = [
    { name: 'Mac Book Pro', price: 100000, category: 'Electronics' },
    { name: 'Google Pixel 9', price: 50000, category: 'Electronics' },
    { name: 'T-Shirt', price: 3000, category: 'Clothing' },
    { name: 'BMW M5 Competition', price: 29000000, category: 'Automobile' }
];

const productsNameToUpper = products.map((current) => current.name.toUpperCase());
console.log(productsNameToUpper);

// (4) ['MAC BOOK PRO', 'GOOGLE PIXEL 9', 'T-SHIRT', 'BMW M5 COMPETITION']
// 0: "MAC BOOK PRO"
// 1: "GOOGLE PIXEL 9"
// 2: "T-SHIRT"
// 3: "BMW M5 COMPETITION"
// length: 4
// [[Prototype]]: Array(0)

const filterElectronics = products.filter((current) => current.category === 'Electronics');
console.log(filterElectronics);

// (2) [{…}, {…}]
// 0: {name: 'Mac Book Pro', price: 100000, category: 'Electronics'}
// 1: {name: 'Google Pixel 9', price: 50000, category: 'Electronics'}
// length: 2
// [[Prototype]]: Array(0)

const totalPrice = products.reduce((accumulator, current) => accumulator + current.price, 0);
console.log(`Total price of all the products in the array are: Rs ${totalPrice}`);

// Total price of all the products in the array are: Rs 29153000

const priceOfCategory = (passedCategory) => {
    const price =
        products.filter((curr) => curr.category === passedCategory)
            .map((curr) => curr.price)
            .reduce((accumulator, curr) => accumulator + curr, 0);

    return `Total price of ${passedCategory} category : Rs ${price}`;
};
console.log(priceOfCategory('Electronics'));

// Total price of Electronics category : Rs 150000