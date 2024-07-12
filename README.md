# Plates Co Sales System Proof of Concept

This is a proof of concept for the sales system of Plates Co, a leading provider of made-up dinner plates. The system implements a basket with the following features:
- Initialization with the product catalogue, delivery charge rules, and special offers.
- An `add` method to add products to the basket using product codes.
- A `total` method to calculate the total cost of the basket, considering delivery charges and special offers.

## Features

1. **Initialization**: The basket is initialized with:
   - Product catalogue
   - Delivery charge rules
   - Special offers

2. **Adding Products**: Products can be added to the basket using the `add` method with the product code as a parameter.

3. **Calculating Total**: The `total` method calculates the total cost of the basket, taking into account special offers and delivery charges.

## Usage

### Initialization

The basket is initialized with a product catalogue, delivery charge rules, and special offers. Here's an example:
```javascript
const data = [
  { product: 'Red Plate', code: 'R01', price: 32.95 },
  { product: 'Green Plate', code: 'G01', price: 24.95 },
  { product: 'Blue Plate', code: 'B01', price: 7.95 },
];

const deliveryRules = {
  under50: 4.95,
  under90: 2.95,
  over90: 0,
};

const offers = [new Offer('BOGO50', { productCode: 'R01' })];

const basket = new PlatesCo(data, deliveryRules, offers);
```
# Adding Products
To add products to the basket, use the add method with the product code as a parameter:
```javascript
basket.add('B01');
basket.add('G01');
```

# Calculating Total
To calculate the total cost of the basket, use the total method:
```javascript
basket.add('B01');
basket.add('G01');
console.log(basket.total());  // Output: 37.85
```
# Assumptions
- The product catalogue is provided as an array of objects with product details.
- Delivery charge rules are provided as an object with thresholds and corresponding charges.
- Offers are provided as an array of Offer instances.
- The "buy one red plate, get the second half price" offer applies to any number of red plates in the basket.
- The total method rounds the final total to two decimal places for display.

# Running the Code
To run the code, use Node.js. Save the code in a file called basket.js and run the following command in the terminal:
```bash
node basket.js
```





