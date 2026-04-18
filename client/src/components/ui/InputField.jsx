export default function InputField({ label, id, ...props }) {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      {props.type === 'textarea' ? (
        <textarea id={id} {...{ ...props, type: undefined }} />
      ) : (
        <input id={id} {...props} />
      )}
    </div>
  );
}
