import CookieConsent from "react-cookie-consent";

export default function CookiesConsent() {
  return (
    <CookieConsent
      enableDeclineButton
      buttonText="Akceptuję politykę prywatności"
      declineButtonText="Nie akceptuję polityki prywatności"
      disableStyles
      containerClasses="text-[12px] bg-white flex flex-col gap-4 fixed z-50 bottom-0 right-0 left-0 py-6 padding shadow-[0px_-8px_62px_-2px_rgba(56,95,194,0.1)] lg:flex-row"
      contentClasses="text-[#3C4663]"
      declineButtonClasses="bg-[#EBF0FD] text-[#2F66F4] rounded-full py-3 px-6 font-semibold"
      buttonClasses="bg-primary text-white rounded-full py-3 px-6 font-semibold mt-2 sm:mt-0"
      buttonWrapperClasses="flex flex-col-reverse self-stretch gap-4 sm:flex-row min-w-max w-max"
    >
      Serwis bezCV korzysta z plików cookies w celu realizacji usług
      statystycznych i funkcjonalnych. Warunki przechowywania lub dostępu do
      plików cookies można określić w ustawieniach przeglądarki internetowej.
    </CookieConsent>
  );
}
