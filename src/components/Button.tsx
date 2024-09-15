interface Props {
  children: any;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  onClick: () => void;
}
function Button({ children, onClick, color }: Props) {
  return (
    <div className="container-fluid text-center">
      <button type="button" onClick={onClick} className={"btn btn-" + color}>
        {children}
      </button>
    </div>
  );
}

export default Button;
