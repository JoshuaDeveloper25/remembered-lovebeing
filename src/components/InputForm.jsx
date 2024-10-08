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
      <span className="w-full inline-block text-start font-medium">{inputLabel}</span>
      <input
        required={required}
        className="form-input"
        placeholder={inputPlaceholder}
        type={inputType}
        name={inputName}
        defaultValue={defaultValue}
      />
    </label>
  );
};
