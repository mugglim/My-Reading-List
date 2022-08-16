let shoppingCartTotal = 0;
let tax = 0;

const BUY_BUTTONS = [
	{ name: 'pen', price: 3 },
	{ name: 'shoe', price: 5 },
	{ name: 't-shirt', price: 10 },
];

const shoppingCart = [];

function getBuyButtonsDOM() {
	// Assume that data is a DOM node.
	return BUY_BUTTONS;
}

function setCartTotalDOM() {
	console.log(`total price : ${shoppingCartTotal}`);
}

function showFreeShippingIcon(name) {
	console.log(`${name} is free shipping!`);
}

function hideFreeShippingIcon(name) {
	console.log(`${name} is not free shipping!`);
}

function updateShippingIcons() {
	const $buyButtons = getBuyButtonsDOM();
	for (const { name, price } of $buyButtons) {
		if (price + shoppingCartTotal >= 20) {
			showFreeShippingIcon(name);
		} else {
			hideFreeShippingIcon(name);
		}
	}
}

function setTaxDOM(newTax) {
	tax = newTax;
	console.log(`tax is ${tax}`);
}

function updateTaxDOM() {
	setTaxDOM((shoppingCartTotal * 0.1).toFixed(1));
}

function calcCartTotal() {
	shoppingCartTotal = 0;
	for (const { price } of shoppingCart) {
		shoppingCartTotal += price;
	}

	setCartTotalDOM();
	updateShippingIcons();
	updateTaxDOM();
}

function addItemToCart(name, price) {
	shoppingCart.push({ name, price });
	calcCartTotal();
}

console.log('---- 🛒 Add shoe ----');
addItemToCart('shoe', 5);

console.log('---- 🛒 Add t-shirt');
addItemToCart('t-shirt', 10);

console.log('---- 🛒 Add pen ----');
addItemToCart('pen', 3);
