import { useReducer } from "react";

const INIT_STATE = {
	value: "",
	isTouched: false,
};

const inputReducer = (state, action) => {
	switch (action.type) {
		case "SET_INPUT":
			return { isTouched: state.isTouched, value: action.payload };
		case "SET_TOUCHED":
			return { value: state.value, isTouched: true };
		case "RESET":
			return action.payload;
		default:
			return state;
	}
};

const useInput = (isValidFunc) => {
	const [inputState, dispatchInputAction] = useReducer(
		inputReducer,
		INIT_STATE
	);

	const valueIsValid = isValidFunc(inputState.value);
	const inputIsInValid = !valueIsValid && inputState.isTouched;

	const onInputChangeHandler = (event) => {
		dispatchInputAction({
			type: "SET_INPUT",
			payload: event.target.value,
		});
	};

	const onInputBlurHandler = () => {
		dispatchInputAction({
			type: "SET_TOUCHED",
		});
	};

	const onInputSubmitHandler = () => {
		dispatchInputAction({
			type: "RESET",
			payload: { value: "", isTouched: false },
		});
	};

	return [
		inputState.value,
		inputIsInValid,
		onInputChangeHandler,
		onInputBlurHandler,
		onInputSubmitHandler,
	];
};

export default useInput;
