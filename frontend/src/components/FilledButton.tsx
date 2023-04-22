import { ButtonHTMLAttributes } from "react";
import { arrowRight } from "../assets/general";

export default function FilledButton({
  children,
  type = "button",
  form,
  className,
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      form={form}
      type={type}
      onClick={onClick}
      className={`bg-primary transition-colors font-semibold text-white rounded-full flex items-center min-w-max text-[.75rem] py-[14px] px-8 ${className}`}
    >
      {children} <img className="max-h-[1.2em] ml-2" src={arrowRight} alt="" />
    </button>
  );
}
