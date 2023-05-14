import { underline } from "../../assets/home/candidate/candidate";
import Loader from "../../components/Loader";
import { LoaderFactProps } from "../../constants/workForm";

export default function LoaderFact({ ability, desc }: LoaderFactProps) {
  return (
    <>
      <Loader />
      <h2 className="text-2xl sm:text-3xl font-bold text-center w-full max-w-[8in] mt-[1in] mb-8">
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
        <p className="text-sm md:text-base leading-relaxed text-center text-[#3C4663]">
          {desc}
        </p>
      </div>
    </>
  );
}
