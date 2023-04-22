import { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";

type CustomLinkProps = {
  children: JSX.Element | string | (JSX.Element | string)[];
  to: string;
  className?: string;
  icon?: JSX.Element;
};

const CustomLink = ({ children, to, className }: CustomLinkProps) => {
  const { account } = useContext(AccountContext);
  const activePath = useResolvedPath(to);
  const isActive = useMatch({ path: `${activePath.pathname}/*`, end: true });
  return (
    <Link
      to={to}
      className={`relative flex items-center after:transition-all font-medium ${
        account === "employer" ? "after:bg-primary" : "after:bg-secondary"
      } after:absolute after:h-[2px] after:-bottom-1 after:rounded-full after:w-full after:block after:right-0 ${
        isActive
          ? "after:max-w-[50%]"
          : "hover:after:max-w-[50%] after:max-w-[0%]"
      } ${className && className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
