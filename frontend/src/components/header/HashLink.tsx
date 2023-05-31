import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../providers/AccountProvider";
import { useNavigate } from "react-router";

const HashLink = ({
  children,
  to,
  route,
  className,
}: {
  children: string;
  to: string;
  route: string;
  className?: string;
}) => {
  const [shouldScroll, setShouldScroll] = useState(false);
  const { account } = useContext(AccountContext);
  const navigate = useNavigate();
  const handleScroll = () => {
    navigate(route);
    setShouldScroll(true);
  };

  useEffect(() => {
    if (!shouldScroll) return;
    let section = document.getElementById(to);
    section?.scrollIntoView({ behavior: "smooth" });
    setShouldScroll(false);
  }, [shouldScroll]);

  return (
    <button
      type="button"
      className={`relative flex items-center after:transition-all font-medium after:bg-primary hover:after:max-w-[50%] after:max-w-[0%] after:absolute after:h-[2px] after:-bottom-1 after:rounded-full after:w-full after:block after:right-0 ${
        account === "employer" ? "after:bg-primary" : "after:bg-secondary"
      } ${className}`}
      onClick={handleScroll}
    >
      {children}
    </button>
  );
};

export default HashLink;
