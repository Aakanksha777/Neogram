import React from "react";
import "./TextField.css";

export const TextField = ({
  inputType,
  inputName,
  label,
  id,
  children,
  ...props
}) => {
  return (
    <div className="form-group-field">
      <input
        type={inputType ? inputType : "text"}
        className="form__field"
        placeholder={label}
        name={inputName}
        {...props}
      />
      {children ? children : null}

      {/* {label && (
        <label htmlFor={id ? id : inputName} className="form__label">
          This is label
        </label>
      )} */}
    </div>
  );
};
