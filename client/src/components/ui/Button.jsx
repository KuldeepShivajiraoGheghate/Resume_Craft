export default function Button({ variant = 'primary', children, className = '', ...props }) {
  const baseClass = variant === 'ghost' ? 'btn-ghost' : variant === 'danger' ? 'btn-danger' : 'btn-primary';
  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
