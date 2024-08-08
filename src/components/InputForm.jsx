export const InputForm = ({
  inputType,
  inputLabel,
  inputName,
  inputPlaceholder,
  inputLabelClassName,
  required,
}) => {
  return (
    <label className={inputLabelClassName}>
      <span className="w-full inline-block text-start">{inputLabel}</span>
      <input
        required={required}
        className="form-input-focus form-input-normal"
        placeholder={inputPlaceholder}
        type={inputType}
        name={inputName}
      />
    </label>
  );
};
