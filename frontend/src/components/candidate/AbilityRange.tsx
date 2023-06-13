import { useEffect, useRef, useState } from "react";
import { percentageTriangle } from "../../assets/candidate/candidate";
import { professionColorMap } from "../../constants/professionColorMap";
import { RoleType } from "../../constants/workForm";

export interface AbilityProps {
  name?: string;
  percentage?: number;
  profession?: RoleType;
}

const AbilityRange = ({ name, percentage, profession }: AbilityProps) => {
  const [scaleValue, setScaleValue] = useState(0);
  const rangeRef = useRef<HTMLDivElement>(null!);
  const isUndefined = percentage === null || percentage === undefined;
  const isWorst = !profession;

  useEffect(() => {
    if (!rangeRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setScaleValue(100);
      }
    });
    observer.observe(rangeRef.current);
    return () => {
      observer.disconnect();
    };
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
            style={{
              backgroundImage: isWorst
                ? "linear-gradient(180deg, #DF1B5C 0%, #DF1B32 100%)"
                : professionColorMap[profession].gradient,
            }}
            className="ml-2 bg-clip-text text-transparent print:text-font print-bg-transparent"
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
            backgroundImage: !isWorst
              ? professionColorMap[profession].gradient
              : "linear-gradient(180deg, #DF1B5C 0%, #DF1B32 100%)",
            transform: `scaleX(${scaleValue}%)`,
            opacity: percentage ? "1" : "0.1",
          }}
          className="relative origin-left duration-500 ease-out transition-transform rounded-full h-full"
        >
          <div className="rounded-full absolute right-0 translate-x-[50%] h-6 w-6 bottom-[75%] shadow-primarySmall bg-white flex items-center justify-center">
            <div
              style={{
                backgroundImage: !isWorst
                  ? professionColorMap[profession].gradient
                  : "linear-gradient(180deg, #DF1B5C 0%, #DF1B32 100%)",
              }}
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
