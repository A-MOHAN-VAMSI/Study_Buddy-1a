import { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(
  (
    {
      label,
      icon,
      error,
      className = "",
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <div className="sb-input-group">

        {label && (
          <label className="sb-label">
            {label}
          </label>
        )}

        <div
          className={clsx(
            "sb-input-wrapper",
            error && "sb-input-error"
          )}
        >
          {icon && (
            <span className="sb-input-icon">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            type={type}
            className={clsx(
              "sb-input",
              icon && "sb-input-with-icon",
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <span className="sb-error-text">
            {error}
          </span>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;