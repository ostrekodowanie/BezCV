import { RangeNumberKey } from "../../constants/workForm";

export default function RangeKey({ number, text, numericalAnswer }: RangeNumberKey & { numericalAnswer: number }) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className={`rounded-full h-16 w-16 transition-colors flex items-center justify-center shadow-[0px_7px_37px_-2px_rgba(215,105,23,0.13)] ${number === numericalAnswer ? 'bg-[#F9AE3D] text-white' : 'bg-white text-font'}`}>
                <span className="text-xl font-semibold">{number}</span>
            </div>
            <div className="text-center">
                <h5 className="font-medium text-sm">{number} oznacza</h5>
                <h4 className="font-bold text-sm">“{text}”</h4>
            </div>
        </div>
    )
}