import React from "react";

type CardVariant = "default" | "glass" | "outline";
type CardPadding = "none" | "sm" | "md" | "lg";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
};

const variantClass: Record<CardVariant, string> = {
  default: "card card-default",
  glass: "card card-glass",
  outline: "card card-outline",
};

const paddingClass: Record<CardPadding, string> = {
  none: "card-p0",
  sm: "card-p-sm",
  md: "card-p-md",
  lg: "card-p-lg",
};

export default function Card({
  variant = "glass",
  padding = "md",
  className = "",
  ...props
}: Props) {
  return (
    <div
      className={[variantClass[variant], paddingClass[padding], className].join(
        " ",
      )}
      {...props}
    />
  );
}

/** Optional subcomponents (nice DX) */

export function CardHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["card-header", className].join(" ")} {...props} />;
}

export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["card-title", className].join(" ")} {...props} />;
}

export function CardSubTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["card-sub", className].join(" ")} {...props} />;
}

export function CardBody({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["card-body", className].join(" ")} {...props} />;
}

export function CardFooter({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["card-footer", className].join(" ")} {...props} />;
}
