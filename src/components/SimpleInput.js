import useInput from "../hooks/useInput";

const SimpleInput = () => {
  const [
    enteredName,
    enteredNameIsInValid,
    nameInputChangeHandler,
    nameInputBlurHandler,
    nameInputSubmitHandler,
  ] = useInput((name) => {
    return name.trim() !== "";
  });

  const [
    enteredEmail,
    enteredEmailIsInValid,
    emailInputChangeHandler,
    emailInputBlurHandler,
    emailInputSubmitHandler,
  ] = useInput((email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
  );

  let formIsValid = false;

  // Checks the overall validity of the form
  if (!enteredNameIsInValid && !enteredEmailIsInValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // setEnteredNameTouched(true); // when the form is submitted, the user is saying that all input has been touched.
    if (enteredNameIsInValid || enteredEmailIsInValid) return;

    nameInputSubmitHandler();
    emailInputSubmitHandler();
  };

  const nameInputClasses =
    enteredNameIsInValid || enteredEmailIsInValid
      ? "form-control invalid"
      : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {enteredNameIsInValid && (
          <p className="error-text">Name must not be empty</p>
        )}
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInValid && (
          <p className="error-text">Email is Invalid</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
