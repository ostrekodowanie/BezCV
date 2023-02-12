import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

export default function EmployerPopup({ setCanShow }: { setCanShow: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="bg-white fixed left-[8vw] right-[8vw] sm:left-auto bottom-12 sm:right-12 rounded-3xl w-full animate-opacity max-w-[5in] flex flex-col items-center gap-4 p-6 shadow-primaryBig">
            <h3>Wyszukaj swojego kandydata za darmo</h3>
            <div className="flex items-center gap-4">
                <Link onClick={() => setCanShow(false)} to='/rejestracja'>Zarejestruj się</Link>
                <button onClick={() => setCanShow(false)}>Zamknij</button>
            </div>
        </div>
    )
}