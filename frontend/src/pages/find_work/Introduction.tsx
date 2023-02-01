import { Link } from "react-router-dom";

export default function Introduction() {
    return (
        <section className="padding py-[1.4in] md:py-[2in] bg-white">
            <div className="flex flex-col gap-4">
                <strong className="text-xl">Cześć!</strong>
                <p>Miło mi Ciebie poznać. Jestem Mariusz i przeprowadzę Cię przez kwestionariusz, który pozwoli mi Cię lepiej poznać.</p>
                <p>Chciałbyś mieć większą satysfakcję z pracy i zarabiać więcej niż teraz?<br />A może chcesz dowiedzieć się, jakie są Twoje mocne strony zawodowe i do których profesji najlepiej pasujesz?</p>
                <p>Wypełniając tą ankietę możesz rozpędzić swoją zawodową karierę. Będziesz za darmo otrzymywać oferty pracy tylko od firm, które szukają osoby o Twoim profilu. </p>
                <p>Efekt? Większa satysfakcja z pracy i więcej możliwości rozwoju</p>
                <p className="my-8"><strong>Ankieta zajmie Ci około 9 minut</strong> - masz możliwość nie udzielania odpowiedzi. Im więcej nam o sobie opowiesz tym większa szansa, że znajdziemy Ci wymarzoną pracę. </p>
                <Link to='/praca/ankieta' className="bg-secondary rounded-full py-3 px-6 max-w-max text-white text-sm">Zaczynajmy!</Link>
            </div>
        </section>
    )
}