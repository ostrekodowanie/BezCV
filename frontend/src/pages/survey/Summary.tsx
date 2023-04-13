import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function Summary({ firstName }: { firstName: string }) {
  return (
    <>
      <ProgressBar progress={1} />
      <h2 className="text-2xl sm:text-3xl font-bold text-center w-full max-w-[8in]">
        Z naszej strony to wszystko!
      </h2>
      <div className="flex flex-col items-center justify-between gap-6 w-full">
        <p className="text-2xl md:text-3xl font-medium">
          Dziękuje Ci{" "}
          <span className="font-medium bg-clip-text text-transparent bg-secondary">
            {firstName}
          </span>{" "}
          za poświęcenie chwili czasu.
        </p>
        <p className="text-sm md:text-base leading-relaxed">
          Daj nam chwilę na przetworzenie danych, tak abyśmy mogli stworzyć dla
          Ciebie profil. O wszystkich postępach będziesz informowany regularnie
          za pomocą skrzynki mailowej.
        </p>
        <h3 className="font-semibold text-lg">Do usłyszenia!</h3>
        <Link
          className="rounded-full text-[.8rem] max-w-max font-medium mt-8 text-white px-6 py-[14px] bg-secondary"
          to="/"
        >
          Zakończ
        </Link>
      </div>
    </>
  );
}
