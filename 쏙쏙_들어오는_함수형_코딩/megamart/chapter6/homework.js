/* p.120 */

const myPush = (array, item) => {
	const copy = array.slice();
	copy.push(item);
	return copy;
};

let mailingList = [];

function addContact(mailingList, email) {
	return myPush(mailingList, [email]);
}

function hanleOnSubmit(event) {
	const email = event.target.elements['email'].value;
	mailingList = addContact(mailingList, email);
}

/* p.125 */

const getLastElement = array => array.at(-1);

const dropLast = array => {
	const copy = array.slice();
	copy.pop();
	return copy;
};

function myPop(array) {
	const copy = array.slice();
	const last = copy.pop();

	return {
		last,
		array: copy,
	};
}

/* p.130 */

function mySet(array, index, value) {
	if (index >= array.length) return array;

	const copy = array.slice();
	copy[index] = value;
	return copy;
}

/* p.136 */

function objectSet(object, key, value) {
	const copy = Object.assign({}, object);
	copy[key] = value;

	return copy;
}

/* p.137 */

function setPrice(item, price) {
	return objectSet(item, 'price', price);
}

/* p.138 */

function setQuantity(item, quantity) {
	return objectSet(item, 'quantity', quantity);
}

/* p.139 */

function objectDelete(object, key) {
	if (Object.hasOwn(object, key) === false) return object;

	const copy = Object.assign({}, object);
	delete copy[key];
	return copy;
}

/* p.144 */

function setPriceByName(cart, name, quantity) {
	const copy = cart.slice();
	const itemIndex = copy.findIndex(item => item.name === name);
	if (itemIndex === -1) return;

	copy[itemIndex] = objectSet(cart[itemIndex], 'quantity', quantity);
	return copy;
}
