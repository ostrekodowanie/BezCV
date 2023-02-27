import { useRef } from "react";
import CountUp from "react-countup";
import { countUpUnderline } from "../../../assets/home/employer/employer";

const abilities = [
    "Organizacja czasu pracy",
    "Podzielność uwagi",
    "Asertywność",
    "Pewność siebie",
    "Charyzma",
    "Skrupulatność i dokładność",
    "Adaptacja i elastyczność",
    "Pozytywne nastawienie",
    "Umiejętność rozwiązywania problemów",
    "Cierpliwość",
    "Uważność",
    "Efektywne słuchanie",
    "Prezencja",
    "Empatia",
    "Otwartość na problemy innych",
    "Opiekuńczość",
    "Lojalność i dyskrecja",
    "Wysoka kultura osobista",
    "Nadawanie priorytetów",
    "Umiejętność pracy pod presją czasu",
    "Umiejętności komunikacyjne",
    "Znajomość programów niezbędnych do pracy"

]

export default function Banner() {
    return (
        <section className="padding pt-[1in] md:pt-[1.4in] 2xl:pt-[1.8in] items-center relative">
            <div className="font-bold flex flex-col gap-4 bg-primary rounded-3xl px-10 overflow relative xl:px-20 py-8 xl:py-16 text-white">
                <h2 className="text-3xl leading-tight xl:text-[2.5rem] xl:leading-tight relative">W BezCV jest ponad <div className="inline-block relative text-4xl xl:text-5xl leading-tight"><CountUp enableScrollSpy useEasing end={500} /><img className="absolute left-0 bottom-1 w-full" src={countUpUnderline} alt='' /></div><br /> kandydatów do pracy</h2>
                <p className="font-normal text-[rgba(255,255,255,0.8)] mb-6 max-w-[6in] leading-relaxed">wyselekcjonowanych na podstawie podstawowych informacji, preferencji zawodowych oraz 21 kompetencji miękkich</p>
                <div className="overflow-hidden">
                    <div className="abilities-slider flex items-center gap-4 w-max">
                        {abilities.map(ab => <Ability ability={ab} key={ab} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}

const Ability = ({ ability }: { ability: string }) => {
    return (
        <div className="py-4 px-6 text-white min-w-max flex-1 text-sm font-medium bg-[#599EF7] rounded-full">
            {ability}
        </div>
    )
}