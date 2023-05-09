export default function PrivacyPolicy() {
  return (
    <div className="sm:rounded-xl shadow-primaryBig py-8 flex flex-col gap-4 pb-24 sm:px-8 px-[8vw]">
      <h2 className="font-medium text-lg sm:text-xl mb-4 text-center">
        Polityka Prywatności bezCV
      </h2>
      <ol className="flex flex-col gap-8 list-decimal">
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">1. Informacje wstępne</h3>
          <p className="text-sm sm:text-base">
            Polityka prywatności określa, jak zbierane, przetwarzane i
            przechowywane są dane osobowe Użytkowników niezbędne do świadczenia
            usług drogą elektroniczną (dalej: Usługi) za pośrednictwem strony
            internetowej bezcv.com (dalej: Portal). Portal zbiera wyłącznie dane
            osobowe niezbędne do świadczenia i rozwoju usług w nim oferowanych.
            Dane osobowe zbierane za pośrednictwem Portalu są przetwarzane
            zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE)
            2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób
            fizycznych w związku z przetwarzaniem danych osobowych i w sprawie
            swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE
            (ogólne rozporządzenie o ochronie danych, dalej RODO) oraz ustawą o
            ochronie danych osobowych z dnia 10 maja 2018 r. Wszystkie niezbędne
            informacje dotyczące Usług bezCV znajdują się poniżej oraz w
            Regulaminie.
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">
            2. Administrator Danych Osobowych
          </h3>
          <p className="text-sm sm:text-base">
            Administratorem danych osobowych Użytkowników przetwarzanych w
            związku z usługami świadczonymi za pośrednictwem Portalu jest:{" "}
            <strong className="font-semibold">
              Agencja Social Media YO ME sp. z o.o. z siedzibą w Warszawie, (ul.
              Meksykańska 6/10, 03-948 Warszawa), wpisana do Rejestru
              Przedsiębiorców Krajowego Rejestru Sądowego przez Sąd Rejonowy dla
              m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy Krajowego
              Rejestru Sądowego pod numerem KRS: 0000893513, NIP: 1133031112.
            </strong>
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">
            3. Zakres zbieranych i przetwarzanych danych.
          </h3>
          <ol className="flex flex-col gap-8">
            <li className="flex flex-col gap-4">
              <h4 className="font-medium">
                3.1. Dane, które przekazywane są bezpośrednio przez
                Użytkowników. Dane wprowadzone podczas Rejestracji oraz
                pozostałe informacje w ramach Twojego Profilu
              </h4>
              <div className="flex flex-col gap-2">
                <p className="text-sm sm:text-base">
                  W ramach rejestracji, w celu skorzystania ze świadczonych
                  Usług bezCV, zbierane są następujące dane w ramach
                  przekazanych przez Użytkowników informacji:
                </p>
                <ul className="list-disc text-sm sm:text-base list-inside flex flex-col gap-2 my-2">
                  <li>
                    W ramach rejestracji z wykorzystaniem adresu email: imię i
                    nazwisko oraz adres email;
                  </li>
                  <li>
                    W ramach rejestracji z wykorzystaniem numeru telefonu: imię
                    nazwisko oraz numer telefonu.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm sm:text-base">
                  Uzyskanie powyższych danych jest wymagane i niezbędne do
                  korzystania z Usług bezCV. Dodatkowo, w ramach korzystania z
                  Usług bezCV Użytkownik może również dobrowolnie wskazać
                  dodatkowe dane:
                </p>
                <ul className="list-disc text-sm sm:text-base ml-[2ch] flex flex-col gap-4">
                  <li>
                    dane karty płatniczej/karty kredytowej w przypadku, gdy
                    Użytkownik zainteresowany jest nabyciem płatnych usług
                    określonych w Regulaminie które w zależności od zastosowania
                    metody płatności obejmują:
                    <ul className="ml-[2ch] list-disc text-sm sm:text-base my-2 flex flex-col gap-2">
                      <li>Imię i nazwisko;</li>
                      <li>Adres e-mail;</li>
                      <li>
                        Dane karty płatniczej/kredytowej (imię i nazwisko
                        posiadacza karty, data jej ważności, typ karty
                        kredytowej i cztery ostatnie cyfry numeru karty)
                      </li>
                    </ul>
                  </li>
                  <li>
                    dane związane z wykonywanym przez Użytkowników zawodem lub
                    wolą jego wykonywania (Kandydat) lub branży, w której
                    poszukiwani są Kandydaci (Pracodawcy), które zostaną
                    udostępnione w Profilu Użytkownika oraz dedykowanym miejscu
                    w ramach aktywnym poszukiwaniu pracy;
                  </li>
                  <li>
                    dane związane z korzystaniem przez Użytkowników z usług
                    płatniczych (Płatności bezCV) udostępnianych w ramach
                    Portalu, a świadczonych przez zewnętrznego dostawcę usług
                    płatniczych – PayU S.A. z siedzibą w Poznaniu („Dostawca
                    Usług Płatności”).
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex flex-col gap-4">
              <h4 className="font-medium">
                3.2. Dane, zebrane w sposób automatyczny podczas korzystania z
                Portalu bezCV oraz realizacji Usług bezCV
              </h4>
              <div className="flex flex-col gap-6">
                <p className="text-sm sm:text-base">
                  Do automatycznie zbieranych danych Użytkownika należą
                  następujące informacje:
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">
                      Wszelkie dane dotyczące logowania
                    </h4>
                    <p className="text-sm sm:text-base">
                      Portal bezCV gromadzi dane związane z logowaniem, w tym
                      adres protokołu internetowego (adres IP) urządzenia
                      Użytkownika, informacje o strefie czasowej i systemie
                      operacyjnym. Przechowywane są również informacje na temat
                      logowania Użytkownika (data rejestracji, data ostatniej
                      zmiany hasła, data ostatniego udanego logowania), a także
                      typu i rodzaju przeglądarki internetowej Użytkownika.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">
                      Dane o aktywności w Portalu
                    </h4>
                    <p className="text-sm sm:text-base">
                      Administrator zbiera dane o aktywności Użytkownika w
                      Portalu bezcV, a wśród nich informacje o stronach, z
                      których Użytkownik zostaje skierowany na Portal bezCV,
                      datę każdej wizyty, wyniki wyszukiwań Użytkownika, listy
                      produktów oraz banery reklamowe, które zostały wybrane
                      przez Użytkownika. Dotyczy to również to również
                      interakcji z reklamami, czas trwania wizyty Użytkownika, a
                      także kolejność korzystania z Portalu bezCV.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">
                      Wszelkie dane związane z korzystaniem z chatu Portalu
                      bezCV
                    </h4>
                    <p className="text-sm sm:text-base">
                      W ramach korzystania chatu bezcVgromadzone są wszelkie
                      informacje dotyczące używania funkcji czatu związanego z
                      komunikacją z innymi Użytkownikami, informacje są zbierane
                      o Użytkownikach czatu biorących udział w konwersacji,
                      informacje o treści wiadomości i informacje, które
                      przekazujesz za pośrednictwem tej funkcjonalności oraz
                      czasów odpowiedzi.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">Cookies</h4>
                    <p className="text-sm sm:text-base">
                      Portal bezCV przetwarza pliki cookies/tokeny w celu
                      zarządzania sesjami Użytkowników, przechowywania wyboru
                      preferencji językowych oraz dostarczania odpowiednich
                      reklam. "Cookies" to niewielkie pliki tekstowe przesyłane
                      przez serwer internetowy na twardy dysk urządzenia
                      Użytkownika. Cookies/Tokeny mogą być wykorzystywane do
                      gromadzenia informacji o dacie i godzinie wizyty
                      Użytkownika, jego historii przeglądania, preferencjach,
                      oraz samej nazwie Użytkownika. Użytkownik może dowolnie
                      zmienić ustawienia przeglądarki, aby odrzucić wszystkie
                      lub niektóre cookies/tokeny, lub ustawić określone
                      ostrzeżenia informujące o dostępie do cookies/tokenów.
                      Uwaga, zastrzegamy iż w przypadku zablokowania lub
                      ograniczenia plików cookies/tokenów, niektóre z Usług
                      bezCVmogą stać się niedostępne lub mogą działać
                      nieprawidłowo. Aby uzyskać więcej informacji o
                      wykorzystaniu dotyczących Cookies/Tokenów prosimy o
                      zapoznanie się z Polityką Cookies/Tokenów
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="flex flex-col gap-4">
              <h4 className="font-medium">
                3.3. Dane, która są pozyskiwane z publicznych źródeł oraz od
                stron trzecich
              </h4>
              <p className="text-sm sm:text-base">
                Niektóre dane osobowe Użytkowników są pozyskiwane od różnych
                osób trzecich (i ze źródeł publicznych), które są przetwarzane w
                ramach realizacji Usług bezCV. Przede wszystkim dotyczy to
                następujących informacji:
              </p>
              <ul className="list-disc text-sm sm:text-base ml-[2ch] flex flex-col gap-4">
                <li>
                  Dane adresowe i kontaktowe związane z prowadzoną działalnością
                  gospodarczą pozyskane od dostawców informacji, jak np.
                  wywiadownie gospodarcze oraz podmioty budujące bazy
                  potencjalnych kontrahentów oraz publicznie dostępne rejestry
                  (np. Centralna Ewidencja i Informacja o Działalności
                  Gospodarczej);
                </li>
                <li>
                  Dane i informacje techniczne dotyczące Użytkowania od
                  dostawców usług analitycznych, takich jak Google Analytics
                  360, do celów statystycznych i analizy korzystania z naszych
                  Usług, ulepszania Usług bezCV i marketingu online;
                </li>
                <li>
                  Danych innych użytkowników Portalu, w zakresie w jakim
                  prowadzą oni i przekazują komunikację w związku z Usługami
                  bezCV;
                </li>
                <li>
                  W ramach korzystania przez Użytkowników z Płatności bezCV, dla
                  celów rozliczeniowych i raportowych, stanowiących prawnie
                  uzasadniony interes Administratora (art. 6 ust. 1 lit. f
                  RODO), Administrator otrzymuje dane osobowe od Dostawcy Usług
                  Płatności. Obejmuje to identyfikator płatności zleconej przez
                  Dostawcę Usług Płatności, kwotę oraz status tej płatności,
                  datę jej utworzenia, adres e-mail, metodę płatności oraz tytuł
                  transakcji, której dotyczy płatność
                </li>
              </ul>
            </li>
          </ol>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">
            4. Ograniczenia podmiotowe w pozyskiwaniu danych.
          </h3>
          <p className="text-sm sm:text-base">
            Portal bezCV nie jest zaadresowany do ludzi poniżej 16 roku życia i
            świadomie nie są pozyskiwane informacje na ich temat. W przypadku,
            gdy jakakolwiek osoba poniżej 16 roku życia dostarczy na Portal
            bezCVswoje dane osobowe, zostaną one natychmiastowo usunięte.
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">
            5. Cel zbierania danych osobowych.
          </h3>
          <p className="text-sm sm:text-base">
            Dane osobowe wykorzystywane są w celu:
          </p>
          <ul className="list-disc flex flex-col gap-4 ml-[2ch] text-sm sm:text-base">
            <li>rejestracji konta i weryfikacji tożsamości Użytkownika,</li>
            <li>umożliwienia logowania do Portalu,</li>
            <li>realizacji umowy dotyczącej usług i e-usług,</li>
            <li>
              komunikacji z Użytkownikiem (chat, formularz kontaktowy itp.)
            </li>
            <li>
              wysyłki newslettera (po wyrażeniu zgody Użytkownika na jego
              otrzymywanie),
            </li>
            <li>prowadzenia systemu komentarzy,</li>
            <li>świadczenia usług społecznościowych,</li>
            <li>promocji oferty Administratora,</li>
            <li>marketingu, remarketingu, afiliacji,</li>
            <li>personalizacji Portalu dla Użytkowników,</li>
            <li>działań analitycznych i statystycznych,</li>
            <li>windykacji należności,</li>
          </ul>
          <p>
            Podanie danych jest dobrowolne, ale niezbędne do zawarcia umowy albo
            skorzystania z innych funkcjonalności Portalu.
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">
            6. Rodzaj przetwarzanych danych osobowych.
          </h3>
          <p className="text-sm sm:text-base">
            Administrator włącznie z danymi wskazanymi w punkcie 2 może
            przetwarzać dane osobowe Użytkownika: imię i nazwisko, data
            urodzenia, adres zamieszkania, adres e-mail, numer telefonu, NIP.
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">
            7. Okres przetwarzania danych osobowych.
          </h3>
          <p className="text-sm sm:text-base">
            Dane osobowe Użytkowników będą przetwarzane przez okres:
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-sm sm:text-base">
              gdy podstawą przetwarzania danych jest wykonanie umowy – do
              momentu przedawnienia roszczeń po jej wykonaniu,
            </p>
            <p className="text-sm sm:text-base">
              gdy podstawą przetwarzania danych jest zgoda – do momentu jej
              odwołania, a po odwołaniu zgody do przedawnienia roszczeń.
            </p>
          </div>
          <p className="text-sm sm:text-base">
            W obu przypadkach termin przedawnienia wynosi 6 lat, a dla roszczeń
            o świadczenia okresowe i roszczeń dotyczących prowadzenia
            działalności gospodarczej – 3 lata (jeśli przepis szczególny nie
            stanowi inaczej).
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">
            8. Udostępnianie danych osobowych.
          </h3>
          <p className="text-sm sm:text-base">
            Dane osobowe Użytkowników mogą być przekazywane: podmiotom
            powiązanym z Administratorem, jego podwykonawcom, podmiotom
            współpracującym z Administratorem np. firmom obsługującym
            e-płatności, firmom świadczącym usługi kurierskie/pocztowe,
            kancelariom prawnym.
          </p>
          <p className="text-sm sm:text-base">
            Dane osobowe Użytkowników nie będą/będą przekazywane poza teren
            Europejskiego Obszaru Gospodarczego (EOG).
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">9. Prawa Użytkowników.</h3>
          <p className="text-sm sm:text-base">
            Użytkownik Portalu ma prawo do: dostępu do treści swoich danych
            osobowych, ich sprostowania, usunięcia, ograniczenia przetwarzania,
            przenoszenia, wniesienia sprzeciwu wobec przetwarzania, cofnięcia
            zgody w każdej chwili (co nie ma wpływu na zgodność z prawem
            przetwarzania dokonanego w oparciu o zgodę przed jej cofnięciem).
          </p>
          <p className="text-sm sm:text-base">
            Zgłoszenie o wystąpieniu przez Użytkownika z uprawnieniem
            wynikającym z wymienionych praw należy przesłać na adres [adres
            e-mail].
          </p>
          <p className="text-sm sm:text-base">
            Zgłoszenie o wystąpieniu przez Użytkownika z uprawnieniem
            wynikającym z wymienionych praw należy przesłać na adres [adres
            e-mail].
          </p>
          <p className="text-sm sm:text-base">
            Użytkownik ma prawo złożyć skargę do Prezesa Urzędu Ochrony Danych
            Osobowych, jeśli uzna, że przetwarzanie narusza jego prawa i
            wolności (RODO).
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">
            10. Zautomatyzowane podejmowanie decyzji i profilowanie.
          </h3>
          <p className="text-sm sm:text-base">
            Dane Użytkowników nie mogą być przetwarzane w zautomatyzowany sposób
            tak, że na skutek tego mogłyby zapaść wobec nich jakiekolwiek
            decyzje.
          </p>
          <p className="text-sm sm:text-base">
            Dane Użytkowników mogą być profilowane celem dostosowania treści i
            personalizacji oferty po wyrażeniu przez nich zgody.
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">
            11. Nawiązanie i prowadzenie komunikacji z Użytkownikiem.
          </h3>
          <p className="text-sm sm:text-base">
            Administrator podejmuje kontakt z Użytkownikiem za pośrednictwem
            wiadomości email, SMS lub za pomocą powiadomień związanych z naszymi
            Usługami bezCV. Komunikacja będzie mieć na celu potwierdzenie
            rejestracji Użytkownika, oraz informacji dotyczącej realizacji Usług
            bezCV. Ze względu na to, że wysyłanie tego rodzaju komunikatów i
            wiadomości jest obligatoryjne po stronie Administratora, w
            niektórych przypadkach Użytkownik nie będzie mógł zrezygnować z ich
            otrzymywania.
          </p>
          <p className="text-sm sm:text-base">
            Użytkownik może w każdej chwili zrezygnować z otrzymywanej
            komunikacji marketingowej przez kliknięcie w odpowiedni link
            umieszczony w wysłanej do niego wiadomości email lub SMS, zmieniając
            ustawienia powiadomień w ramach swojego konta bezCV. W przypadku
            jakichkolwiek problemów w tym zakresie prosimy o kontakt pod adresem
            kontakt@bezcv.com
          </p>
          <p className="text-sm sm:text-base flex flex-col gap-4">
            Użytkownik może podjąć korespondencję marketingową, gdy:
            <ul className="list-disc flex flex-col gap-2 ml-[2ch] text-sm sm:text-base">
              <li>
                Wyraził Administratorowi chęć otrzymywania takich informacji
                wyrażając swoją zgodę na komunikację marketingową;
              </li>
              <li>
                Przekazał Administratorowi swoje dane biorąc udział w konkursie;
                lub zgłosiłeś swój udział w akcji promocyjnej.
              </li>
            </ul>
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">12. Korespondencja.</h3>
          <p className="text-sm sm:text-base">
            W celu uzyskania wszelkich informacji dotyczących pomocy w
            realizacji Usług bezCVoraz samego Portalu bezCV należy skorzystać z
            katalogu ustawień na profilu Użytkownika w tym zakładki Pomoc lub
            napisać bezpośrednio do Agencji Social Media YO ME Sp. z o.o na
            adres wskazany w punkcie 1.
          </p>
        </li>
        <li className="flex flex-col gap-4">
          <h3 className="font-semibold sm:text-lg">13. Nadzór.</h3>
          <p className="text-sm sm:text-base">
            W sprawach lokalnych związanych z ochroną danych osobowych
            Użytkownik może skontaktować się z Prezesem Urzędu Ochrony Danych
            Osobowych: Stawki 2, 00-193 Warszawa.
          </p>
        </li>
      </ol>
    </div>
  );
}
