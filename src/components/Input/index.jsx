export default function Input({
  value,
  type,
  onChange,
  label,
  placeholder,
  isRequired,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={`input-${value}`} className="form-label" type="text">
        {label}
      </label>
      <input
        className="form-control"
        id={`input-${value}`}
        placeholder={placeholder}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={isRequired}
      />
    </div>
  );
}
