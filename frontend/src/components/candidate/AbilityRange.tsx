import { useEffect, useRef, useState } from "react";
import { percentageTriangle } from "../../assets/candidate/candidate";

export interface AbilityProps {
  name?: string;
  percentage?: number;
}

const AbilityRange = ({
  name,
  percentage,
  color,
}: AbilityProps & { color: string }) => {
  const [scaleValue, setScaleValue] = useState(0);
  const rangeRef = useRef<HTMLDivElement>(null!);
  const isUndefined = percentage === null || percentage === undefined;

  useEffect(() => {
    if (!rangeRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setScaleValue(100);
      }
    });
    observer.observe(rangeRef.current);
  }, []);

  return (
    <div className="flex flex-col gap-3 text-font">
      <h4
        className={`max-w-full w-max font-medium text-[.8rem] flex items-center ${
          isUndefined ? "opacity-[.1]" : "opacity-1"
        }`}
      >
        {isUndefined ? "Kandydat nie wypełnił jeszcze tej ankiety." : name}{" "}
        {!isUndefined && (
          <span
            style={{ backgroundImage: color }}
            className="ml-2 bg-clip-text text-transparent"
          >
            {percentage}%
          </span>
        )}
      </h4>
      <div className="bg-[#F8F9FB] rounded-full h-[1.4rem]">
        <div
          ref={rangeRef}
          style={{
            width: !isUndefined ? percentage + "%" : "60%",
            backgroundImage: color,
            transform: `scaleX(${scaleValue}%)`,
            opacity: percentage ? "1" : "0.1",
          }}
          className="relative origin-left duration-500 ease-out transition-transform rounded-full h-full"
        >
          <div className="rounded-full absolute right-0 translate-x-[50%] h-6 w-6 bottom-[75%] shadow-primarySmall bg-white flex items-center justify-center">
            <div
              style={{ backgroundImage: color }}
              className="h-[35%] w-[35%] rounded-full"
            />
            <img
              className="absolute top-[30%] left-0 w-full -z-10"
              src={percentageTriangle}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbilityRange;
