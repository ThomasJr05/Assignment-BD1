const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

// Q1: Create an endpoint that takes a newItemPrice and cartTotal as a query parameter and returns total cart value.

function getCartTotal(newItemPrice, cartTotal) {
  let totalCartValue = newItemPrice + cartTotal;
  return totalCartValue.toString();
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(getCartTotal(newItemPrice, cartTotal));
});

//Q2: Create an endpoint that takes a cartTotal and isMember as a query parameter and returns final price after applying the discount.

function getFinalPriceAfterDiscount(cartTotal, isMember) {
  let discountedPercentage = 0.1;
  let finalPrice;
  if (isMember === 'ture') {
    finalPrice = cartTotal * discountedPercentage;
  } else {
    finalPrice = cartTotal;
  }
  return finalPrice.toString();
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = parseFloat(req.query.isMember);
  res.send(getFinalPriceAfterDiscount(cartTotal, isMember));
});

// Q3: Create an endpoint that takes a cartTotal as a query parameter and returns the tax applied on the Cart Total.

function getTaxRate(cartTotal) {
  let taxRate = cartTotal * 0.05;
  return taxRate.toString();
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getTaxRate(cartTotal));
});

// Q4:Create an endpoint that takes a shippingMethod and distance as a query parameter and returns the number of days for delivering the package.

function getEstimateDelivery(shippingMethod, distance) {
  let standardDelivery = (1 / 50) * distance;
  let expressDelivery = (1 / 100) * distance;
  let standard;
  let express;
  let deliveryTime;

  if (shippingMethod == 'standard') {
    deliveryTime = standardDelivery;
  } else if (shippingMethod == 'express') {
    deliveryTime = expressDelivery;
  } else {
    deliveryTime = 'select either of delivery method';
  }
  return deliveryTime.toString();
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(getEstimateDelivery(shippingMethod, distance));
});

function getResult(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost.toString();
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(getResult(weight, distance));
});

function getLoyaltyPoint(purchaseAmount) {
  let royaltyRate = purchaseAmount * 2;
  return royaltyRate.toString();
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(getLoyaltyPoint(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
