// data
const BUY_BUTTONS = [
	{ name: 'pen', price: 3 },
	{ name: 'shoe', price: 5 },
	{ name: 't-shirt', price: 10 },
];

// actions
let shoppingCartTotal = 0;
let tax = 0;
let shoppingCart = [];

function getBuyButtonsDOM() {
	// Assume that data is a DOM node.
	return BUY_BUTTONS;
}

function setCartTotalDOM() {
	console.log(`total price : ${shoppingCartTotal}`);
}

function showFreeShippingIcon(name, price) {
	console.log(`${name} is ${price}$, so it's free shipping!`);
}

function hideFreeShippingIcon(name, price) {
	console.log(`${name} is ${price}$, so it's not free shipping!`);
}

function updateShippingIcons() {
	const $buyButtons = getBuyButtonsDOM();

	for (const { name, price } of $buyButtons) {
		if (isFreeShippingItem(shoppingCartTotal, price)) {
			showFreeShippingIcon(name, price);
		} else {
			hideFreeShippingIcon(name, price);
		}
	}
}

function setTaxDOM(newTax) {
	tax = newTax;
	console.log(`tax is ${tax}`);
}

function updateTaxDOM() {
	setTaxDOM(calcTax(shoppingCartTotal).toFixed(1));
}

function calcCartTotal() {
	shoppingCartTotal = caclTotal(shoppingCart);
	setCartTotalDOM();
	updateShippingIcons();
	updateTaxDOM();
}

function addItemToCart(name, price) {
	shoppingCart = addItem(shoppingCart, name, price);
	calcCartTotal();
}

// calculations
function addItem(cart, name, price) {
	return cart.slice().concat({ name, price });
}

function caclTotal(cart) {
	return cart.reduce((total, { price }) => total + price, 0);
}

function isFreeShippingItem(total, itemPrice) {
	return total + itemPrice >= 20;
}

function calcTax(total) {
	return total * 0.1;
}

// for testing
console.log('---- 🛒 Add shoe ----');
addItemToCart('shoe', 5);
console.log();

console.log('---- 🛒 Add t-shirt');
addItemToCart('t-shirt', 10);
console.log();

console.log('---- 🛒 Add pen ----');
addItemToCart('pen', 3);
console.log();
