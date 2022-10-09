import { useFormData } from "../utilities/UseFormData";
import { useNavigate } from "react-router-dom";

const InputField = ({ name, text, state, change }) => (
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
      <span className="p-2">{message}</span>
    </div>
  );
};

export const CourseEditForm = ({ courses, id }) => {
  const course = courses[id];
  const [state, change] = useFormData(null, course);
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
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
      <ButtonBar />
    </form>
  );
};
