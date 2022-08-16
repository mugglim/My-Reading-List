const $ = (query) => document.querySelector(query)


let shoppingCart = [];
let shoppingCartTotal = 0;

const calcTotal = cart => {
	return cart.reduce((total, item) => total + item.price, 0);
};

const isFreeShippingPrice = (total, itemPrice) => {
	return total + itemPrice >= 20;
};

const updateShippingIcons = () => {
	const buyButtons = getBuyButtonsDOM();

	for (const buyButton of buyButtons) {
		const { price } = buyButton.item;

		if (isFreeShippingPrice(shoppingCartTotal, price)) {
			buyButton.showFreeShippingIcon();
		} else {
			buyButton.hideFreeShippingIcon();
		}
	}
};

const setTaxDOM = (tax) => {
	const $
};

const calcTax = amount => {
	return amount * 0.1;
};

const updateTaxDOM = cartTotal => {
	const newTax = calcTax(shoppingCartTotal);
	setTaxDOM(newTax);
};

const addItem = (cart, name, price) => {
	const newCart = cart.slice();
	newCart.push({ name, price });

	return newCart;
};

const addItemToCart = (name, price) => {
	shoppingCart = addItem(shoppingCart, name, price);
	calcCartTotal();
};

const calcCartTotal = () => {
	shoppingCartTotal = calcTotal(shoppingCart);
};
