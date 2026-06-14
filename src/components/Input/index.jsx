import { forwardRef } from "react";

const Input = forwardRef(({ label, type = "text", error, ...rest }, ref) => {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        className={`form-control ${error ? "is-invalid" : ""}`}
        type={type}
        ref={ref}
        {...rest}
      />
      {error && <span className="invalid-feedback">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
