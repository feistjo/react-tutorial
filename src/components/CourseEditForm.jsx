import { useFormData } from "../utilities/UseFormData";
import { useNavigate } from "react-router-dom";
import { useDbUpdate } from "../utilities/firebase";

const validateFormData = (key, val) => {
  switch (key) {
    case "title":
      return /(^\w\w)/.test(val) ? "" : "must be least two characters";
    case "meets":
      return /^\w+[ ]([0-9]|[0-1][0-9]|2[0-4])[:][0-5][0-9]-([0-9]|[0-1][0-9]|2[0-4])[:][0-5][0-9]/.test(
        val
      )
        ? ""
        : "must contain days and start-end, e.g., MWF 12:00-13:20";
    default:
      return "";
  }
};

const InputField = ({ name, text, state, change }) => {
  console.log(state);
  console.log(name);
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {text}
      </label>
      <input
        className="form-control"
        id={name}
        name={name}
        defaultValue={state.values?.[name]}
        onChange={change}
      />
      <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
  );
};

const ButtonBar = ({ message, disabled }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button
        type="button"
        className="btn btn-outline-dark me-2"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary me-auto"
        disabled={disabled}
      >
        Submit
      </button>
      <span className="p-2">{message}</span>
    </div>
  );
};

export const CourseEditForm = ({ courses, id }) => {
  const [update, result] = useDbUpdate(`/courses/${id}`);
  const course = courses[id];
  const [state, change] = useFormData(validateFormData, course);
  const navigate = useNavigate();
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
      navigate(-1);
    }
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className={state.errors ? "was-validated" : null}
    >
      <InputField
        name="title"
        text="Course Title"
        state={state}
        change={change}
      />
      <InputField
        name="meets"
        text="Meeting Time"
        state={state}
        change={change}
      />
      <ButtonBar message={result?.message} />
    </form>
  );
};
