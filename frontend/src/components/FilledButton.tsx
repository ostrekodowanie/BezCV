import { arrowRight } from "../assets/general";

export default function FilledButton({ children, className }: any) {
  return (
    <button
      className={`bg-primary transition-colors font-medium text-white rounded-full flex items-center text-[.8rem] py-3 px-8 ${className}`}
    >
      {children} <img className="max-h-[1.2em] ml-2" src={arrowRight} alt="" />
    </button>
  );
}
