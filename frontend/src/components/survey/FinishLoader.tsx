import { useEffect, useRef, useState } from "react";
import Loader from "../Loader";

const finishTexts = [
  "Trwa tworzenie twojego profilu",
  "Przesyłamy twoje informacje do bazy",
];

export default function FinishLoader() {
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
    <div className="self-center flex flex-col items-center gap-4">
      <Loader />
      <div className="relative">
        <p className="font-medium transition-opacity delay-200 duration-200">
          {finishTexts[activeTextIndex]}
          {dots}
        </p>
      </div>
    </div>
  );
}
