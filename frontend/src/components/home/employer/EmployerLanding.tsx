import Control from "react-control-js"
import { Link } from "react-router-dom"
import { arrowRight } from "../../../assets/general"
import { underline } from "../../../assets/home/candidate/candidate"
import { bgBoy, bgGirl } from "../../../assets/home/employer/employer"

export default function EmployerLanding() {
    return (
        <>
        <section className="padding pt-[1.4in] md:pt-[2in] pb-16 items-center flex flex-col gap-12 relative overflow-hidden">
            <h1 className="font-semibold text-3xl leading-snug md:text-4xl md:leading-snug xl:text-[2.75rem] xl:leading-snug text-center relative z-10">Znajdź <div className="relative inline-block"><span className="relative z-10">dopasowanego</span><img className="absolute bottom-0 w-full underline-animation" src={underline} alt="" /></div> pracownika,<br /> bez tworzenia oferty o pracę!</h1>
            <div className="flex flex-col md:grid grid-cols-2 gap-8">
                <div className="bg-white p-10 flex flex-col gap-4 shadow-[0px_4px_79px_-2px_rgba(56,95,194,0.19)] rounded-3xl relative">
                    <Control className="absolute -z-10 -bottom-[130%] -left-[19vw] hidden md:block" ease='ease-out' opacity={1} x={-20} element={<img className="max-w-[calc(5in+2vw)]" src={bgBoy} alt="" />} />
                    <h2 className="md:text-xl font-bold text-left">BezCV to portal, który...</h2>
                    <p className="text-sm text-[#3C4663] leading-loose max-w-[4in]">zrzesza kandydatów do pracy określając ich kompetencje miękkie. Dzięki wstępnej rekrutacji <span className="font-semibold">nie musisz przeglądać kilkudziesięciu CV</span>, a kandydatów masz w jednym miejscu!</p>
                </div>
                <div className="bg-white p-10 flex flex-col gap-4 shadow-[0px_4px_79px_-2px_rgba(56,95,194,0.19)] rounded-3xl relative">
                    <Control className="absolute -bottom-full -right-[19vw] -z-10 hidden md:block" opacity={1} x={20} ease='ease-out' element={<img className="max-w-[calc(6.5in+2vw)]" src={bgGirl} alt="" />} />
                    <h2 className="md:text-xl font-bold text-left">Nie tylko osoby chętne...</h2>
                    <p className="text-sm text-[#3C4663] leading-loose max-w-[4in]"><span className="font-bold">do pracy</span> - ale także kandydatów o sprecyzowanych umiejętnościach, dopasowanych do <span className="font-semibold">Twoich indywidualnych wymagań.</span></p>
                </div>
            </div>
            <Link to='/rejestracja' className="rounded-full max-w-max text-white text-[.8rem] font-semibold flex items-center py-[14px] px-10 bg-primary">Znajdź pracownika <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" /></Link>
        </section>
        <div className="relative overflow-hidden h-[40vh]">
            <div className="absolute -left-[2in] -right-[8vw] bg-empbg bg-cover -z-10 bg-no-repeat top-0 h-full" />
        </div>
        </>
    )
}