/* p.154 */

// 불변성이 지켜지지 않는 라이브러리 코드 가정
function payrollCalc(employess) {
	// .. more code
	return payrollChecks;
}

// 불변성이 지켜지도록 wrapping
function payrollCalcSafe(employess) {
	const copy = deepCopy(employess);
	const payrollChecks = payrollCalc(copy);
	return deepCopy(payrollChecks);
}

/* p.155 */

const userChanges = {};

userChanges.subcribe(function (user) {
	const userCopy = deepCopy(user);
	processUser(userCopy);
});
