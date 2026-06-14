import { forwardRef } from "react";

const Select = forwardRef(
  (
    { label, options, error, defaultOption, wrapperClass = "mb-3", ...rest },
    ref,
  ) => {
    return (
      <div className={wrapperClass}>
        {label && <label className="form-label">{label}</label>}

        <select
          className={`form-select ${error ? "is-invalid" : ""}`}
          ref={ref}
          {...rest}
        >
          {defaultOption && <option value="">{defaultOption}</option>}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <span className="invalid-feedback d-block">{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
