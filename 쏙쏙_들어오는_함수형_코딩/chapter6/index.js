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

function setCartTotalDOM(total) {
	console.log(`total price : ${total}`);
}

function showFreeShippingIcon(name, price) {
	console.log(`${name} is ${price}$, so it's free shipping!`);
}

function hideFreeShippingIcon(name, price) {
	console.log(`${name} is ${price}$, so it's not free shipping!`);
}

function updateShippingIcons(cart) {
	const $buyButtons = getBuyButtonsDOM();

	for (const { name, price } of $buyButtons) {
		// 1
		const cartItem = makeCartItem(name, price);
		const newCart = addItem(cart, cartItem);

		// 2
		const isShown = isFreeShippingItem(newCart);

		// 3
		setFreeShippingIcon(name, price, isShown);
	}
}

function setFreeShippingIcon(name, price, isShown) {
	if (isShown) {
		showFreeShippingIcon(name, price);
		return;
	}

	hideFreeShippingIcon(name, price);
}

function setTaxDOM(newTax) {
	tax = newTax;
	console.log(`tax is ${tax}`);
}

function updateTaxDOM(total) {
	setTaxDOM(calcTax(total).toFixed(1));
}

function addItemToCart(name, price) {
	const cartItem = makeCartItem(name, price);
	shoppingCart = addItem(shoppingCart, cartItem);

	const total = calcTotal(shoppingCart);
	setCartTotalDOM(total);
	updateShippingIcons(shoppingCart);
	updateTaxDOM(total);
}

function removeItemByName(cart, name) {
	const itemIndex = cart.findIndex(item => item.name === name);

	if (itemIndex !== -1) {
		return removeItems(cart, name);
	}

	return cart;
}

function handleOnDelete(name) {
	shoppingCart = removeItemByName(shoppingCart, name);
	const total = calcTotal(shoppingCart);

	setCartTotalDOM(total);
	updateShippingIcons(shoppingCart);
	updateTaxDOM(total);
}

function setPrice(item, price) {
	const copy = item.copy();
	copy['price'] = price;
	return copy;
}

function setPriceByName(cart, name, price) {
	const copy = cart.slice();
	const itemIndex = copy.findIndex(item => item.name === name);
	if (itemIndex === -1) return;

	copy[itemIndex] = setPrice(cart[itemIndex], price);
	return copy;
}

// calculations

function removeItems(array, idx, count) {
	const copy = array.slice();
	copy.splice(index, count);

	return copy;
}

function appendElement(array, element) {
	return array.slice().concat(element);
}

function addItem(cart, item) {
	return appendElement(cart, item);
}

function makeCartItem(name, price) {
	return { name, price };
}

function calcTotal(cart) {
	return cart.reduce((total, { price }) => total + price, 0);
}

function isFreeShippingItem(cart) {
	return calcTotal(cart) >= 20;
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

console.log('---- 🛒 Delete pen from cart ----');
handleOnDelete('pen');
console.log();
