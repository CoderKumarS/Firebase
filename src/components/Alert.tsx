import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | string;
  onClose: () => void;
}
function Alert({ children, onClose, color }: Props) {
  return (
    <div
      className={
        "alert alert-" +
        color +
        " alert-dismissible fade show m-2 position-absolute top-6 start-50 translate-middle-x"
      }
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default Alert;
