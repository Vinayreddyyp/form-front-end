const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";

export const VALIDATOR_REQUIRE = () => ({
	type: VALIDATOR_TYPE_REQUIRE,
});
export const VALIDATOR_MINLENGTH = (value) => ({
	type: VALIDATOR_TYPE_MINLENGTH,
	val: value,
});

export const validation = (value, validators) => {
	let isValid = true;
	for (let validator of validators) {
		if (validator.type === VALIDATOR_TYPE_REQUIRE) {
			isValid = isValid && value.trim().length > 0;
		}
		if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
			isValid = isValid && value.trim("").length >= validator.val;
		}
	}
	console.log("isValid", isValid);
	return isValid;
};
