import { Link } from "react-router-dom";
import { reportSuccessMan } from "../../assets/profile/profile";

export default function Success() {
  return (
    <div className="flex flex-col text-center items-center gap-4">
      <img
        className="max-w-[1.4in] w-full mb-6"
        src={reportSuccessMan}
        alt=""
      />
      <h2 className="font-semibold text-xl sm:text-2xl">
        Gratulacje, płatność zrealizowana prawidłowo!
      </h2>
      <p className="text-sm text-[#3C4663]">
        Dziękujemy za zakup tokenów bezCV na naszym serwisie! Możesz teraz
        cieszyć się dostępem do kontaktów z interesującymi Cię kandydatami,
        które zakupisz za pomocą swoich tokenów.
      </p>
      <Link
        to="/oferty"
        className="font-semibold hover:text-[#2F66F4] transition-colors text-sm min-w-max mt-4"
      >
        Znajdź pracownika
      </Link>
    </div>
  );
}
