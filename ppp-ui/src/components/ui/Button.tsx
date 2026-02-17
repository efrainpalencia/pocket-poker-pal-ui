import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({
  variant = "primary",
  children,
  ...rest
}: Props) {
  const cls = `btn btn-${variant}`;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
