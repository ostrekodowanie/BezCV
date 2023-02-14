import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { arrowRight } from "../../assets/general";

export default function EmployerPopup({ setCanShow }: { setCanShow: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="bg-white fixed left-[8vw] right-[8vw] sm:left-auto bottom-12 sm:right-12 rounded-3xl w-full animate-opacity max-w-max flex flex-col items-center gap-6 px-16 py-8 shadow-primaryBig">
            <h3 className='font-bold'>Wyszukaj swojego kandydata za darmo</h3>
            <div className="flex items-center gap-4">
                {/* <button className="rounded-full transition-transform hover:scale-[1.06] max-w-max text-[.75rem] font-semibold flex items-center py-[14px] px-6 bg-[#EBF0FD] shadow-[12px_12px_48px_rgba(6,35,108,0.05)]" onClick={() => setCanShow(false)}><span className='text-primary'>Zamknij</span></button> */}
                <Link className="rounded-full max-w-max text-white text-[.75rem] font-semibold flex items-center py-[14px] px-6 bg-primary" onClick={() => setCanShow(false)} to='/rejestracja'>Zarejestruj się <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" /></Link>
            </div>
        </div>
    )
}