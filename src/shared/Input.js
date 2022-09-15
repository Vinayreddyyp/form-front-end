import "./Input.css";

import React, { useCallback, useEffect, useReducer, useState } from "react";

import { validation } from "../validations/validation";

const initialFormState = {
	email: { value: "", touched: false, isValid: false, error: "" },
	password: { value: "", touched: false, isValid: false, error: "" },
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
		default:
			return state;
	}
};

const Input = (props) => {
	const [formState, dispatch] = useReducer(formReducer, initialFormState);
	const [element, setElement] = useState();
	const { type } = props;
	useEffect(() => {
		setElement(type);
	}, [type]);

	const changeHandler = (name, value) => {
		dispatch({
			type: "change",
			value: value,
			name: name,
			validator: props.validator,
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
					changeHandler(props.name, e.target.value);
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
			{!formState[props.name].isValid && (
				<div>
					<h1>Best error</h1>
				</div>
			)}
		</div>
	);
};
export default Input;
