import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

export default function CandidatePopup({ setCanShow }: { setCanShow: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="bg-white fixed left-[8vw] right-[8vw] sm:left-auto bottom-12 sm:right-12 rounded-3xl w-full max-w-[5in] flex flex-col items-center gap-4 p-6 animate-opacity shadow-[0px_24px_61px_rgba(250,172,62,0.15)]">
            <h3>Wypełnij formularz i znajdź wymarzoną pracę</h3>
            <div className="flex items-center gap-4">
                <Link onClick={() => setCanShow(false)} to='/praca'>Wypełnij ankietę</Link>
                <button onClick={() => setCanShow(false)}>Zamknij</button>
            </div>
        </div>
    )
}