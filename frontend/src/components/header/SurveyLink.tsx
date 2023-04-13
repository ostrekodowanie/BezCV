import { Link, useNavigate } from "react-router-dom";
import { arrowRight } from "../../assets/general";
import { MouseEvent, useEffect, useState } from "react";

const SurveyLink = () => {
  const [shouldScroll, setShouldScroll] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/ankieta");
    setShouldScroll(true);
  };

  useEffect(() => {
    if (!shouldScroll) return;
    const button = document.getElementById("survey-button");
    button?.scrollIntoView({ behavior: "smooth" });
    setShouldScroll(false);
  }, [shouldScroll]);

  return (
    <Link
      className="rounded-full max-w-max text-white text-[.8rem] font-semibold flex items-center py-3 px-8 bg-secondary mt-4 md:mt-0 md:ml-4"
      to="/ankieta"
      onClick={handleNavigate}
    >
      Wypełnij formularz{" "}
      <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
    </Link>
  );
};

export default SurveyLink;
