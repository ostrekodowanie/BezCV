import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

export default function CandidatePopup({ setCanShow }: { setCanShow: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="inset-0 bg-[rgba(0,0,0,0.1)] fixed z-50 flex items-center justify-center animate-opacity">
            <div className="bg-white rounded-3xl w-full mx-[8vw] max-w-[6in] flex flex-col items-center gap-4 p-6 shadow-secondaryBig">
                <h3>Wypełnij formularz i znajdź wymarzoną pracę</h3>
                <div className="flex items-center gap-4">
                    <Link onClick={() => setCanShow(false)} to='/praca'>Wypełnij ankietę</Link>
                    <button onClick={() => setCanShow(false)}>Zamknij</button>
                </div>
            </div>
        </div>
    )
}