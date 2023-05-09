import { MouseEvent } from "react";
import { dropdownArrow } from "../assets/general";

export default function TopScroller({ className }: { className?: string }) {
  const handleScroll = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`bg-white shadow-primaryBig rounded-full flex items-center justify-center h-16 w-16 ${className}`}
      onClick={handleScroll}
    >
      <img className="rotate-180 max-h-[50%]" src={dropdownArrow} alt="" />
    </button>
  );
}
