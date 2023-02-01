import { progressFlag } from "../../assets/candidate/candidate";

export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="flex items-center gap-2 mb-8">
            <div className="bg-[#FFF9F1] relative h-4 rounded-full w-[4in] max-w-[80%]">
                <div style={{ maxWidth: `${(progress * 100).toFixed(0)}%`}} className='absolute bg-secondary w-full transition-all rounded-full left-0 top-0 bottom-0 shadow-[3px_4px_16px_rgba(161,80,20,0.19)]'>
                    <small className="font-semibold absolute text-[.95rem] top-[110%] right-0 text-secondary">{(progress * 100).toFixed(0)}%</small>
                </div>
            </div>
            <img src={progressFlag} alt="" />
        </div>
    )
}