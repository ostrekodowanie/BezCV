import Control from "react-control-js"
import { underline } from "../../../assets/home/candidate/candidate"
import { bgBoy, bgGirl } from "../../../assets/home/employer/employer"

export default function EmployerLanding() {
    return (
        <section className="padding pt-[1.4in] md:pt-[2in] pb-[2in] md:pb-[3in] items-center flex flex-col gap-16 xl:gap-20 relative overflow-hidden">
            <h1 className="font-semibold text-3xl leading-snug md:text-4xl md:leading-snug xl:text-5xl xl:leading-snug text-center relative z-10">Znajdź <div className="relative inline-block"><span className="relative z-10">dopasowanego</span><img className="absolute bottom-0 w-full underline-animation" src={underline} alt="" /></div> pracownika,<br /> bez tworzenia oferty o pracę!</h1>
            <div className="flex flex-col md:grid grid-cols-2 gap-8">
                <div className="bg-white p-10 pb-14 flex flex-col items-center gap-6 shadow-primaryBig rounded-3xl relative">
                    <Control className="absolute -bottom-[12vw] xl:-bottom-[6vw] -left-[15vw] -z-10 hidden md:block" ease='ease-out' opacity={1} x={-20} element={<img className="max-w-[calc(3.7in+2vw)]" src={bgBoy} alt="" />} />
                    <h2 className="text-xl md:text-2xl font-bold">BezCV to portal, który...</h2>
                    <p className="text-sm text-[#3C4663] leading-loose max-w-[4in]">zrzesza kandydatów do pracy określając ich kompetencje miękkie. Dzięki wstępnej rekrutacji <span className="font-semibold">nie musisz przeglądać kilkudziesięciu CV</span>, a kandydatów masz w jednym miejscu!</p>
                </div>
                <div className="bg-white p-10 pb-14 flex flex-col items-center gap-6 shadow-primaryBig rounded-3xl relative">
                    <Control className="absolute -bottom-[8vw] xl:-bottom-[4vw] -right-[17vw] -z-10 hidden md:block" opacity={1} x={20} ease='ease-out' element={<img className="max-w-[calc(4.5in+2vw)]" src={bgGirl} alt="" />} />
                    <h2 className="text-xl md:text-2xl font-bold">Nie tylko osoby chętne...</h2>
                    <p className="text-sm text-[#3C4663] leading-loose max-w-[4in]"><span className="font-bold">do pracy</span> - ale także kandydatów o sprecyzowanych umiejętnościach, dopasowanych do <span className="font-semibold">Twoich indywidualnych wymagań.</span></p>
                </div>
            </div>
            <div className="absolute -left-[2in] -right-[8vw] bg-empbg bg-cover -z-10 bg-no-repeat bottom-0 h-[50vh]" />
        </section>
    )
}