import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

export const InputForm = ({
  additionalInputClassnames,
  inputDownWarning = false,
  inputPassword = false,
  inputLabelClassName,
  inputPlaceholder,
  defaultValue,
  inputLabel,
  inputProps,
  inputName,
  inputType,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className={`${inputLabelClassName} relative`}>
      {inputLabel && (
        <span className="w-full inline-block text-start font-medium">
          {inputLabel}
        </span>
      )}

      <input
        className={`form-input focus:shadow-xl ${additionalInputClassnames}`}
        type={inputType === "password" && showPassword ? "text" : inputType}
        placeholder={inputPlaceholder}
        defaultValue={defaultValue}
        required={required}
        name={inputName}
        {...inputProps}
      />

      {inputDownWarning && <p>{inputDownWarning}</p>}

      {inputPassword && (
        <div className="absolute top-4 right-4">
          {showPassword ? (
            <button type="button" onClick={() => setShowPassword(false)}>
              <FaRegEyeSlash className="text-fourth-color/50" />
            </button>
          ) : (
            <button type="button" onClick={() => setShowPassword(true)}>
              <FaRegEye className="text-fourth-color/50" />
            </button>
          )}
        </div>
      )}
    </label>
  );
};
