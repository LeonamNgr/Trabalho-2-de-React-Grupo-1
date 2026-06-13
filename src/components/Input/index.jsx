export default function Input({
  name,
  value,
  type = "text",
  onChange,
  label,
  placeholder,
  isRequired = false,
}) {
  const inputId = `input-${name}`;

  return (
    <div className="mb-3">
      <label htmlFor={inputId} className="form-label fw-semibold">
        {label}
      </label>

      <input
        className="form-control"
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        required={isRequired}
      />
    </div>
  );
}
