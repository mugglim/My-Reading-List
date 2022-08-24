function deepClone(target) {
	if (Array.isArray(target)) {
		return target.reduce((copy, value) => {
			copy.push(deepClone(value));
			return copy;
		}, []);
	} else if (target !== null && typeof target === 'object') {
		return Array.from(Object.keys(target)).reduce((copy, key) => {
			copy[key] = deepClone(target[key]);
			return copy;
		}, {});
	}

	return target;
}

function addItemToCart(name, price) {
	const cartItem = makeCartItem(name, price);
	shoppingCart = addItem(shoppingCart, cartItem);

	const total = calcTotal(shoppingCart);
	setCartTotalDOM(total);
	updateShippingIcons(shoppingCart);
	updateTaxDOM(total);

	shoppingCart = blackFridayPromotionSafe(shoppingCart);
}

function blackFridayPromotionSafe(cart) {
	// 안전지대 데이터의 변경 위험을 맊기 위해 방어적 복사
	const cartCopy = deepClone(shoppingCart);

	// 1. 안전지대 -> 안전지대 외부
	blackFridayPromotion(cartCopy);

	// 2. 안전지대 외부 -> 안전지대
	// - 1번 과정 중 cartCopy는 변경될 수 있음.
	// - 1번 과정 이후 전파된 cartCopy가 이후에 변경될 수 있음.
	return deepClone(cartCopy);
}
