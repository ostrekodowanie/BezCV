import { MouseEvent } from "react";
import { arrowRight } from "../assets/general";

type FilledButtonProps = {
  children: JSX.Element | string | (JSX.Element | string)[];
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function FilledButton({
  children,
  type,
  className,
  onClick,
}: FilledButtonProps) {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`bg-primary transition-colors font-semibold text-white rounded-full flex items-center min-w-max text-[.75rem] py-[14px] px-8 ${className}`}
    >
      {children} <img className="max-h-[1.2em] ml-2" src={arrowRight} alt="" />
    </button>
  );
}
