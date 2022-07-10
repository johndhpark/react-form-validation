import { useState } from "react";

const useInput = (isValidFunc) => {
	const [enteredInput, setEnteredInput] = useState("");
	const [inputTouched, setInputTouched] = useState(false);

	const enteredInputIsValid = isValidFunc.call(null, enteredInput);
	const inputIsInValid = !enteredInputIsValid && inputTouched;

	const onInputChangeHandler = (event) => {
		setEnteredInput(event.target.value);
	};

	const onInputBlurHandler = () => {
		setInputTouched(true);
	};

	const onInputSubmitHandler = () => {
		setEnteredInput("");
		setInputTouched(false);
	};

	return [
		enteredInput,
		inputIsInValid,
		onInputChangeHandler,
		onInputBlurHandler,
		onInputSubmitHandler,
	];
};

export default useInput;
