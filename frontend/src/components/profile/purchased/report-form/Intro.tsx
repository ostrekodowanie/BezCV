const Intro = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-[#3C4663]">
          Abyś jeszcze chętniej zatrudniał nowe osoby bezCV dajemy Ci możliwość
          zwrotu kontaktów, których nie miałeś realnej szansy zatrudnić.
        </p>
        <p className="text-sm text-[#3C4663]">
          Możesz zwrócić do 3 kontaktów w miesiącu. Wypełnij poniższy formularz,
          a my w ciągu 48h postaramy się rozwiązać Twój problem.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-lg sm:text-xl font-semibold">
          Możesz zwrócić kontakt w następujących sytuacjach:
        </h3>
        <ul className="list-disc text-sm sm:text-base marker:text-[#3C4663] text-[#3C4663] list-inside">
          <li>Brak kontaktu, nie można się skontaktować z kandydatem,</li>
          <li>Niewłaściwa osoba wskazana jako kontaktowa,</li>
          <li>Duplikat zlecenia, które już wcześniej zakupiłeś w bezCV,</li>
          <li>Naruszenie regulaminu bezCV lub niezgodność zlecenia z prawem</li>
        </ul>
      </div>
    </>
  );
};
export default Intro;
