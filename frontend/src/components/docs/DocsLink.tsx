import { useMatch, useResolvedPath } from "react-router";
import { CustomLinkProps } from "../header/CustomLink";
import { Link } from "react-router-dom";

export default function DocsLink({ children, className, to }: CustomLinkProps) {
  const activePath = useResolvedPath(to);
  const isActive = useMatch({
    path: `${activePath.pathname}/*`,
    end: true,
  });
  return (
    <Link
      className={`w-full py-3 flex items-center group gap-2 font-medium after:self-stretch relative after:block after:w-[4px] after:transition-transform transition-colors after:absolute after:top-[20%] after:bottom-[20%] after:right-0 after:rounded-full after:bg-[#2F66F4] ${
        isActive
          ? "text-[#2F66F4] stroke-[#5E3DF1] after:scale-y-100"
          : "after:scale-y-0 text-font stroke-font hover:text-[#2F66F4]"
      } ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
}
