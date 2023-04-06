import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const PointsHashLink = () => {
  const [shouldScroll, setShouldScroll] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    navigate("/");
    setShouldScroll(true);
  };

  useEffect(() => {
    if (!shouldScroll) return;
    const section = document.querySelector("#punkty");
    section?.scrollIntoView({ behavior: "smooth" });
    setShouldScroll(false);
  }, [shouldScroll]);

  return (
    <button
      type="button"
      className="relative flex items-center after:transition-all font-medium after:bg-primary hover:after:max-w-[50%] after:max-w-[0%] after:absolute after:h-[2px] after:-bottom-1 after:rounded-full after:w-full after:block after:right-0"
      onClick={handleScroll}
    >
      Cennik
    </button>
  );
};

export default PointsHashLink;
