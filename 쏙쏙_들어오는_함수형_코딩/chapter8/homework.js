/* p.192 ~ */

/* origin code */
function setPriceByName(cart, name, price) {
	const cartCopy = cart.slice();

	cartCopy.forEach((item, i) => {
		if (item.name === name) {
			cartCopy[i] = setPrice(cartCopy[i], price);
		}
	});

	return cartCopy;
}

function indexOfItem(cart, name) {
	return cart.findIndex(item => item.name === name);
}

/* Step1 */
function indexOfItem(cart, name) {
	return cart.findIndex(item => item.name === name);
}

function setPriceByName(cart, name, price) {
	const cartCopy = cart.slice();
	const i = indexOfItem(cart, name);

	if (i !== -1) {
		cartCopy[i] = setPrice(cartCopy[i], name);
	}

	return cartCopy;
}

/* Step2 */

function arraySet(array, index, value) {
	const copy = array.slice();
	array[index] = value;
	return copy;
}
function indexOfItem(cart, name) {
	return cart.findIndex(item => item.name === name);
}

function setPriceByName(cart, name, price) {
	const i = indexOfItem(cart, name);

	if (i === -1) return cart;

	return arraySet(cart, i, setPrice(cart[i], price));
}

/* Step3 */

function arrayGet(array, index) {
	return array[index];
}

function arraySet(array, index, value) {
	const copy = array.slice();
	array[index] = value;
	return copy;
}

function indexOfItem(cart, name) {
	return cart.findIndex(item => item.name === name);
}

function setPriceByName(cart, name, price) {
	const i = indexOfItem(cart, name);

	if (i === -1) return cart;

	const item = arrayGet(cart, i);

	return arraySet(cart, i, setPrice(item, price));
}
