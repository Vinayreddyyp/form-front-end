import "./Input.css";

import React, { useCallback, useEffect, useReducer, useState } from "react";

import { FormValid } from "../hooks/form-hook";
import { validation } from "../validations/validation";

const initialFormState = {
	email: { value: "", touched: false, isValid: false, error: "" },
	password: { value: "", touched: false, isValid: false, error: "" },
	isFormValid: false,
};

const formReducer = (state, action) => {
	switch (action.type) {
		case "change":
			return {
				...state,
				[action.name]: {
					...state[action.name],
					value: action.value,
					isValid: validation(action.value, action.validator),
				},
			};
		case "focus":
			return {
				...state,
				[action.name]: { ...state[action.name], touched: true },
			};

		case "formValid":
			let isFormValid = true;
			for (const inputId in state) {
				if (inputId === action.id) {
					isFormValid = isFormValid && state[inputId].isValid;
				} else {
					isFormValid = isFormValid && state[inputId].isValid;
				}
			}
			return {
				...state,
				isFormValid: isFormValid,
			};
		default:
			return state;
	}
};

const Input = (props) => {
	const { inputChangeHandler } = FormValid();
	const [formState, dispatch] = useReducer(formReducer, initialFormState);
	const [element, setElement] = useState();
	const [valid, setValid] = useState(false);
	const { type, name } = props;

	useEffect(() => {
		setElement(type);
	}, [type]);

	const changeHandler = (name, e) => {
		const value = e.target.value;
		const id = name;
		inputChangeHandler(id, value, valid);

		dispatch({
			type: "change",
			value: value,
			name: name,
			validator: props.validator,
		});

		dispatch({
			type: "formValid",
			id: name,
		});
	};
	const onFocusHandler = (name) => {
		dispatch({
			type: "focus",
			name: name,
		});
	};

	let formElement;
	if (element === "text") {
		formElement = (
			<input
				id={props.id}
				type={element}
				name={props.name}
				value={formState[props.id].value}
				onChange={(e) => {
					changeHandler(props.name, e);
				}}
				onBlur={() => {
					onFocusHandler(props.name);
				}}
			/>
		);
	} else if (element === "checkbox") {
		formElement = <input type={element} />;
	}

	return (
		<div className="inputs">
			<label>{props.label}</label>
			{formElement}
			{!formState[props.name].isValid && formState[props.name].touched && (
				<div className="error">please enter values</div>
			)}
		</div>
	);
};
export default Input;
