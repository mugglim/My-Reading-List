# CHAPTER 6 - 동작을 읽기, 쓰기 또는 둘 다로 분류하기

### 데이터를 다루는 동작(읽기와 쓰기)

데이터를 다루는 동작은 **읽기와 쓰기**로 분류할 수 있다. 읽기는 데이터가 변하지 않기 때문에 다루기 쉬운 반면, 쓰기는 데이터가 변하기 때문에 다루기 어렵다.

쓰기 동작은 변경된 값이 어디에서, 어떻게 사용될 지 모르기 때문에 한눈에 파악하기 어렵다. 그래서 쓰기 동작에는 **불변성** 원칙이 적용되야 한다.

그러면 어떻게 쓰기 동작에 불변성을 적용할 수 있을까? 정답은 카피-온-라이트(Copy-on-write)이다.

### 카피-온-라이트(Copy-on-write)

카피-온-라이트는 데이터의 쓰기 동작을 하는 시점에 원본 데이터를 복사를 하는 행위이다. 여기서 복사는 데이터의 값이 아닌, 데이터의 주소값을 복사한다.

간단히 카피-온-라이트를 위한 절차와 예시를 확인해보자.

**카피-온-라이트를 위한 절차**

```
1. 복사본을 생성한다.
2. 복사본을 변경한다. (마음껏😀!)
3. 복사본을 반환한다.
```

**push 함수**

```js
// 불변성을 만족하지 않는 함수
function myPush(array, element) {
	array.push(element);
	return array;
}

// 불변성을 만족하는 함수
function myPush(array, element) {
	// 1. 복사본을 생성한다.
	const copy = array.slice();

	// 2. 복사본을 변경한다.
	copy.push();

	// 3. 복사본을 반환한다.
	return copy;
}
```

위 처럼 쓰기 동작에 불변성이 만족되면, <b>쓰기 동작이 읽기 동작으로 변경된다</b>. 또한, 불변 데이터 구조의 읽기는 계산으로 평가된다.

### 구조적 공유(Structural sharing)

두 개의 중첩된 데이터의 구조가 어떤 참조를 공유한다면 이를 <b>구조적 공유(structural sharing)</b>라고 한다.

```js
const premierLeague = {
	name: 'premier league',
	teams: ['wolves', 'tot'],
};

const foo = Object.assign({}, premierLeague);
const bar = Object.assign({}, premierLeague);

// false
console.log(foo === bar);

// true
console.log(foo.name === bar.name);
console.log(foo.team === bar.team);
```

두 객체 `foo`와 `bar`는 같은 객체가 아니다. 그런데 player 객체의 `name`과 `team` 속성을 공유하고 있다. 이를 <b>구조적 공유</b>라고 말할 수 있다.

구조적 공유를 통해 값이 아닌 주소값을 공유하여 메모리를 효율적으로 관리할 수 있다. 그런데 구조적 공유는 불변 데이터 구조 일까? 이를 확인하기 위해서는 얕은 복사를 좀 더 살펴봐야 한다.

### 얕은 복사와 불변성

얕은 복사는 중첩된 데이터 구조에서 최상위 데이터만 복사한다. `Object.assign()`은 객체를 <b>얕은 복사(shallow copy)</b>하는 메소드이다.  
(참고로 배열의 얕은 복사 메소드는 `Array.prototype.slice()`이다.)

```js
const premierLeague = {
	name: 'premier league',
	teams: ['wolves', 'tot'],
};

const foo = Object.assign({}, premierLeague);
const bar = Object.assign({}, premierLeague);

foo['name'] = 'seria';

console.log(JSON.stringify(foo)); // {"name":"seria","teams":["wolves","tot"]}
console.log(JSON.stringify(bar)); // {"name":"premier league","teams":["wolves","tot"]}

foo['teams'].push('arsenal');

console.log(JSON.stringify(foo)); // {"name":"seria","teams":["wolves","tot","arsenal"]}
console.log(JSON.stringify(bar)); // {"name":"premier","teams":["wolves","tot","arsenal"]}
```

위 코드에서 player을 `foo` 객체의 name 속성을 "seria"로 변경하면 `foo`의 `name` 속성만 변경된다. 이와 달리, `foo` 객체의 `teams` 속성에 arsenal 값을 push하면 `foo`, `bar` 두 객체의 teams에 모두 반영된다.

만약 `foo` 객체의 teams만 변경하고 싶다면 아래와 같이 하면 된다.

```js
// 이전 코드
foo['teams'].push('arsenal');

// 새로운 코드
foo['teams'] = [...foo['teams'], 'arsenal'];
```

위 처럼 얕은 복사를 잘못 사용하여 구조적 공유를 하면 데이터가 안전하지 않게 된다. 즉, 불변성을 보장하지 않는다.

### 생각

저자는 책 초반에 자바스크립트가 함수형 프로그래밍을 하기에 완벽하지 않는 언어라고 말했다.

자바스크립트는 기본적으로 불변형 데이터 구조가 없다. 그래서 배열 또는 객체의 카피-온-라이트를 코드를 직접 작성해야하는 불편함이 있다. 또한 직접 작성한 코드와 언어 차원에서 제공하는 코드는 유효성 검사, 에러 처리, 복사 과정에서의 성능 및 안정성 등의 차이가 있다.

아마 저자는 이러한 불편함을 때문에 자바스크립트를 함수형 프로그래밍으로 사용하기에 불편하다고 말하는 것 같다.

그러면, "불변성" 측면에서 어떻게 자바스크립트로 함수형 프로그래밍을 할 수 있을까? 필자의 생각은 아래와 같다.

1. 타입 안정성을 위해 타입스크립트를 도입한다. (정적 타입 보장)
2. 단위 테스트를 거친 불변형 함수를 보일러 플레이트로 관리한다. (에러 처리)
3. 불변형 데이터 구조를 제공하는 라이브러리 사용한다. (에러 처리 + 타입 안정성)
