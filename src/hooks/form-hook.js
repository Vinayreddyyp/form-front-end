import React, { useCallback, useReducer } from "react";

const initialFormValidations = {
	email: { value: "", isValid: false },
	password: { value: "", isValid: false },
	isFormValid: false,
};

const formValidationReducer = (state, action) => {
	let formIsValid = true;
	switch (action.type) {
		case "change":
			for (const inputId in state) {
				if (inputId === action.name) {
					console.log("inputID", inputId);
				}
			}
			return { ...state };
		default:
			return state;
	}
};

export const FormValid = (props) => {
	const [formValidations, dispatch] = useReducer(
		formValidationReducer,
		initialFormValidations
	);

	const inputChangeHandler = useCallback((name, value, isValid) => {
		console.log("value and the name", name, value, isValid);
		dispatch({
			type: "change",
			name: name,
			value: value,
			isValid: isValid,
		});
	}, []);

	return { inputChangeHandler };
};
