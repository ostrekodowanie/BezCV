import { underline } from "../../../assets/home/candidate/candidate"

export default function EmployerLanding() {
    return (
        <section className="padding pt-[1.4in] md:pt-[2in] items-center flex flex-col gap-16 relative text-center">
            <h1 className="font-semibold text-3xl leading-snug md:text-4xl md:leading-snug xl:text-5xl xl:leading-snug">Znajdź dopasowanego <div className="relative inline-block"><span className="relative z-10">pracownika</span><img className="absolute bottom-1" src={underline} alt="" /></div>,<br /> bez tworzenia oferty o pracę!</h1>
            <div className="bg-white p-10 pb-14 flex flex-col items-center gap-6 shadow-primaryBig rounded-t-3xl">
                <strong className="text-xl">BezCV to portal, który...</strong>
                <p className="text-sm text-[#3C4663] leading-loose max-w-[9in]">zrzesza kandydatów do pracy określając ich kompetencje miękkie. Dzięki wstępnej rekrutacji <span className="font-semibold">nie musisz przeglądać kilkudziesięciu CV</span>, a kandydatów masz w jednym miejscu! <span className="font-semibold">Nie tylko osoby chętne do pracy...</span> ale także kandydatów o sprecyzowanych umiejętnościach, dopasowanych do <span className="font-semibold">Twoich indywidualnych wymagań.</span></p>
                {/* <button className="bg-primary mt-4 rounded-full py-3 px-6 max-w-max text-white text-sm" onClick={() => setAccount && setAccount('worker')}>Chcę zostać kandydatem do pracy</button> */}
            </div>
        </section>
    )
}