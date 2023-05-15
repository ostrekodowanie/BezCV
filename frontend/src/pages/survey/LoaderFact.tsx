import { underline } from "../../assets/home/candidate/candidate";
import { LoaderFactProps } from "../../constants/workForm";
import DotsLoader from "../../components/survey/DotsLoader";

export default function LoaderFact({ ability, desc }: LoaderFactProps) {
  return (
    <div className="flex flex-col gap-8 items-center">
      <DotsLoader />
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
