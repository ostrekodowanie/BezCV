import { Link } from "react-router-dom";

export default function Finished({ firstName }: { firstName: string }) {
    return (
        <div className="flex flex-col max-h-max sm:my-auto gap-4">
            <h2 className="text-xl font-semibold">Z naszej strony to wszystko!</h2>
            <p>Dziękuje Ci <span className="font-medium">{firstName}</span> za poświęcenie chwili czasu.</p>
            <p>Daj nam chwilę na przetworzenie danych, tak abyśmy mogli stworzyć dla Ciebie profil. O wszystkich postępach będziesz informowany regularnie za pomocą skrzynki mailowej.</p>
            <h3 className="font-semibold text-lg">Do usłyszenia!</h3>
            <Link className="rounded-full text-[.8rem] max-w-max font-medium mt-8 text-white px-8 py-4 bg-secondary" to='/'>Zakończ</Link>
        </div>
    )
}