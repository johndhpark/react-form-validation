import useInput from "../hooks/useInput";

const isNonEmptyText = (name) => {
  return name.trim() !== "";
};

const isValidEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const BasicForm = (props) => {
  const [
    enteredFirstName,
    enteredFirstNameIsInvalid,
    firstNameInputChangeHandler,
    firstNameInputBlurHandler,
    firstNameInputSubmitHandler,
  ] = useInput(isNonEmptyText);

  const [
    enteredLastName,
    enteredLastNameIsInvalid,
    lastNameInputChangeHandler,
    lastNameInputBlurHandler,
    lastNameInputSubmitHandler,
  ] = useInput(isNonEmptyText);

  const [
    enteredEmail,
    enteredEmailIsInvalid,
    emailInputChangeHandler,
    emailInputBlurHandler,
    emailInputSubmitHandler,
  ] = useInput(isValidEmail);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (formIsInValid) return;

    console.log(
      "Valid Form Data:",
      enteredFirstName,
      enteredLastName,
      enteredEmail
    );

    firstNameInputSubmitHandler();
    lastNameInputSubmitHandler();
    emailInputSubmitHandler();
  };

  const formIsInValid =
    enteredFirstNameIsInvalid ||
    enteredLastNameIsInvalid ||
    enteredEmailIsInvalid;

  const firstNameClass = enteredFirstNameIsInvalid
    ? "form-control invalid"
    : "form-control";
  const lastNameClass = enteredLastNameIsInvalid
    ? "form-control invalid"
    : "form-control";
  const emailClass = enteredEmailIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClass}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={enteredFirstName}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
          />
          {enteredFirstNameIsInvalid && (
            <p className="error-text">First Name must not be empty</p>
          )}
        </div>
        <div className={lastNameClass}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={enteredLastName}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {enteredLastNameIsInvalid && (
            <p className="error-text">Last Name must not be empty</p>
          )}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor="email-address">E-Mail Address</label>
        <input
          type="text"
          id="mail-address"
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Email is Invalid</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={formIsInValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
