import CountUp from "react-countup";

const abilities = [
    'Oczekiwania finansowe',
    'Organizacja czasu pracy',
    'Podzielność uwagi',
    'Prezencja',
    'Mobilność',
    'Umiejętności komunikacyjne'
]

export default function Banner() {
    return (
        <section className="padding pt-[1in] md:pt-[1.4in] 2xl:pt-[1.8in] items-center relative">
            <div className="font-bold flex flex-col gap-6 bg-primary rounded-3xl px-10 overflow relative xl:px-20 py-8 xl:py-16 text-white">
                <h2 className="text-3xl leading-tight xl:text-[2.5rem] xl:leading-tight">W BezCV jest ponad <CountUp enableScrollSpy useEasing end={500} /> <br /> kandydatów do pracy</h2>
                <p className="font-medium text-[rgba(255,255,255,0.8)] mb-6 max-w-[6in]">wyselekcjonowanych na podstawie podstawowych informacji oraz 21 kompetencji miękkich</p>
                <div className="flex flex-wrap gap-4">
                    {abilities.map(ab => <Ability ability={ab} key={ab} />)}
                </div>
            </div>
        </section>
    )
}

const Ability = ({ ability }: { ability: string }) => {
    return (
        <div className="py-3 px-6 text-white text-sm font-semibold bg-[#599EF7] rounded-full">
            {ability}
        </div>
    )
}