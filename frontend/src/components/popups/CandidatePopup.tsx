import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { arrowRight } from "../../assets/general";

export default function CandidatePopup({ setCanShow }: { setCanShow: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="bg-white fixed left-[8vw] right-[8vw] sm:left-auto bottom-12 sm:right-12 rounded-3xl w-full max-w-max flex flex-col items-center gap-6 px-16 py-8 animate-opacity shadow-[0px_24px_61px_rgba(250,172,62,0.15)]">
            <h3 className="font-bold">Wypełnij formularz i znajdź wymarzoną pracę</h3>
            <div className="flex items-center gap-4">
                {/* <button className="rounded-full transition-transform hover:scale-[1.06] max-w-max text-[.75rem] font-semibold flex items-center py-[14px] px-6 bg-[#FEF4E4] shadow-[12px_12px_48px_rgba(6,35,108,0.05)]" onClick={() => setCanShow(false)}><span className='text-secondary'>Zamknij</span></button> */}
                <Link className="rounded-full max-w-max text-white text-[.75rem] font-semibold flex items-center py-[14px] px-6 bg-secondary" onClick={() => setCanShow(false)} to='/praca'>Znajdź pracę <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" /></Link>
            </div>
        </div>
    )
}