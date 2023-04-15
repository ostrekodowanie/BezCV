import { progressFlag } from "../../assets/candidate/candidate";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className={`items-center self-stretch sm:self-center gap-1 mb-8 ml-8 flex ${
        progress === -1 && "opacity-0"
      }`}
    >
      <div className="bg-[#FFF9F1] relative h-4 rounded-full w-full sm:w-[4in] sm:max-w-[80%]">
        <div
          style={{ maxWidth: `${(progress * 100).toFixed(0)}%` }}
          className="absolute bg-secondary w-full transition-all rounded-full left-0 top-0 bottom-0 shadow-[3px_4px_16px_rgba(161,80,20,0.19)]"
        >
          <small className="font-semibold absolute text-[.95rem] top-[110%] right-0 text-secondary">
            {(progress * 100).toFixed(0)}%
          </small>
        </div>
      </div>
      <img src={progressFlag} alt="" />
    </div>
  );
}
