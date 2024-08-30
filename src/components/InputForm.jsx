export const InputForm = ({
  inputType,
  inputLabel,
  inputName,
  inputPlaceholder,
  inputLabelClassName,
  required,
  defaultValue
}) => {
  return (
    <label className={inputLabelClassName}>
      <span className="w-full inline-block text-start font-semibold">{inputLabel}</span>
      <input
        required={required}
        className="form-input-focus form-input-normal"
        placeholder={inputPlaceholder}
        type={inputType}
        name={inputName}
        defaultValue={defaultValue}
      />
    </label>
  );
};
