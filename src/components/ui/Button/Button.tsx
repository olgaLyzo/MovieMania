import type { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string; // для раскладки (например, растянуть кнопку)
};

// Общая кнопка: primary это янтарная 3D-кнопка, ghost это контурная.
export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className,
}: ButtonProps) {
  const classes = [styles[variant], className].filter(Boolean).join(" ");
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
