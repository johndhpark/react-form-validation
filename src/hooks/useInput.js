import { useReducer } from "react";

const inputReducer = (state, action) => {
	switch (action.type) {
		case "SET_INPUT":
			return { ...state, enteredInput: action.payload };
		case "SET_TOUCHED":
			return { ...state, inputTouched: action.payload };
		case "RESET_STATE":
			return action.payload;
		default:
			return state;
	}
};

const useInput = (isValidFunc) => {
	const [inputState, dispatchInputAction] = useReducer(inputReducer, {
		enteredInput: "",
		inputTouched: false,
	});

	const enteredInputIsValid = isValidFunc.call(null, inputState.enteredInput);
	const inputIsInValid = !enteredInputIsValid && inputState.inputTouched;

	const onInputChangeHandler = (event) => {
		dispatchInputAction({
			type: "SET_INPUT",
			payload: event.target.value,
		});
	};

	const onInputBlurHandler = () => {
		dispatchInputAction({
			type: "SET_TOUCHED",
			payload: true,
		});
	};

	const onInputSubmitHandler = () => {
		dispatchInputAction({
			type: "RESET",
			payload: { enteredInput: "", inputTouched: false },
		});
	};

	return [
		inputState.enteredInput,
		inputIsInValid,
		onInputChangeHandler,
		onInputBlurHandler,
		onInputSubmitHandler,
	];
};

export default useInput;
