# CHAPTER 10 - 일급 함수 I

참고) <b>코드의 냄새(code smell)</b>는 더 큰 문제를 가져올 수 있는 코드이다.

### 코드의 냄새 : 이름에 있는 암묵적 인자(implcit argument)

1. 함수 구현이 거의 동일하다.
2. 함수 이름이 구현의 차이를 만든다.

**리팩토링 : 암묵적 인자 드러내기**

1. 함수 이름에서 암묵적 인자를 확인한다.
2. 명시적인 인자를 추가한다.
3. 함수 본문에 하드 코딩된 값을 새로운 인자로 변경한다.
4. 함수를 부르는 곳을 고친다.

```js
// before
const setPriceByName = (cart, name, price) => {};
const setQuantityByName = (cart, name, quantity) => {};
const setTaxByName = (cart, name, tax) => {};

// after

// 1. 함수 이름에서 암묵적 인자를 확인한다.             => 'price'
// 2. 명시적인 인자를 추가한다.                         => 'field'
// 3. 함수 본문에 하드 코딩된 값을 새로운 인자로 변경한다.
// 4. 함수를 부르는 곳을 고친다.
const setFieldByName = (cart, name, field, value) => {};
```

### 일급인 것과 일급이 아닌 것을 구별하기

- 자바스크립트에서 일급이 아닌 것
  - 수식 연산자(\*, +, -), 반복문(for, while), 조건문(if, switch), try/catch 블록
- 일급(first-class) 조건

  1. 변수에 할당 가능
  2. 함수의 인자로 전달 가능
  3. 함수의 리턴값으로 받기 가능
  4. 배열이나 객체에 담기 가능

- 중요한 건 일급이 아닌 것을 일급으로 바꾸는 방법을 터득하는 것!
  - 자바스크립트의 함수는 일급이다!
  - 일급이 아닌 것을 함수로 일급으로 만들어보자

**더하기 연산자를 일급으로!**

```js
const plus = (x, y) => x + y;
```

**반복문을 일급으로!**

```js
const forEach = (array, callback) => {
	for (let i = 0; i < array.length; i++) {
		callback(array[i]);
	}
};
```

**조건문을 일급으로!**

```js
const _if = (cond, onTrue, onFalse) => {
	return cond ? onTrue() : onFalse();
};
```

**try/catch를 일급으로!**

```js
const _tryCatch = (callback, onError) => {
	try {
		callback();
	} catch (error) {
		onError(error);
	}
};
```

### 함수 본문을 콜백으로 바꾸기

- 반복되는 함수 본문을 콜백 함수로 변경하기
- 고차 함수(higher-order function) : 함수를 인자로 받거나, 함수를 리턴하는 함수

**함수 본문을 콜백으로 변경해보기 리팩토링**

```js
// before
for (const food of foods) {
	cook(food);
	eat(food);
}

for (const dish of dishes) {
	wash(dish);
	dry(dish);
	putAway(dish);
}

// after v1
const cookAndEat = food => {
	cook(food);
	eat(food);
};

const cleanDish = dish => {
	wash(dish);
	dry(dish);
	putAway(dish);
};

const cookAndEatArray = array => {
	for (const item of array) {
		cookAndEat(item);
	}
};

const cleanArray = array => {
	for (const item of array) {
		clean(item);
	}
};

// after v2
const forEach = (array, callback) => {
	for (const item of array) {
		callback(item);
	}
};

forEach(foods, food => {
	cook(food);
	eat(food);
});

forEach(dishes, dish => {
	wash(dish);
	dry(dish);
	putAway(dish);
});
```

**간단한 로깅 함수**

```js
const withLogging = callback => {
	try {
		callback();
	} catch (error) {
		logError(error);
	}
};

withLogging(foo);
```

### 생각 정리

**🙄 왜 일급이 아닌 것을 일급 함수로 변경하려고 할까?**

절차형 코드를 선언형 코드로 변경하기 위해??..
