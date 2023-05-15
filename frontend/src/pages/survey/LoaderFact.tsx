import { useEffect, useRef, useState } from "react";
import { underline } from "../../assets/home/candidate/candidate";
import Loader from "../../components/Loader";
import { LoaderFactProps } from "../../constants/workForm";

const finishTexts = [
  "Trwa tworzenie twojego profilu",
  "Przesyłamy twoje informacje do bazy",
];

export default function LoaderFact({ ability, desc }: LoaderFactProps) {
  const timer = useRef<any>(null);
  const dotsTimer = useRef<any>(null);
  const [activeTextIndex, setActiveTextIndex] = useState<0 | 1>(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    setDots("");
    timer.current = setTimeout(
      () => setActiveTextIndex((prev) => (prev === 0 ? 1 : 0)),
      5000
    );
    return () => {
      clearTimeout(timer.current);
    };
  }, [activeTextIndex]);

  useEffect(() => {
    dotsTimer.current = setTimeout(
      () => setDots((prev) => (prev === "..." ? "" : prev.concat("."))),
      600
    );
    return () => {
      clearTimeout(dotsTimer.current);
    };
  }, [dots]);

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="self-center flex flex-col items-center gap-4">
        <Loader />
        <div className="relative">
          <p className="font-medium transition-opacity delay-200 duration-200">
            {finishTexts[activeTextIndex]}
            {dots}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center w-full max-w-[8in]">
          Czy wiedziałeś, że...
        </h2>
        <div className="flex flex-col items-center justify-between gap-6 w-full">
          <h1 className="text-2xl md:text-3xl font-medium text-center">
            <div className="relative inline-block">
              <span className="relative z-10">{ability}</span>
              <img
                className="absolute -bottom-1 left-0 w-full underline-animation"
                src={underline}
                alt=""
              />
            </div>{" "}
            to cecha szczególnie cenna dla pracodawców!
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-center">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
