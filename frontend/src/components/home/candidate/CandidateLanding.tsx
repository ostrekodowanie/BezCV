import Control from "react-control-js"
import { Link } from "react-router-dom"
import { arrowRight } from "../../../assets/general"
import { bgBoy, bgGirl, underline } from "../../../assets/home/candidate/candidate"

export default function CandidateLanding() {
    return (
        <section className="padding pt-[1.4in] md:pt-[2in] pb-16 items-center flex flex-col gap-12 relative text-center overflow-hidden">
            <h1 className="font-semibold text-3xl leading-snug md:text-4xl md:leading-snug xl:text-[2.75rem] xl:leading-snug">Znajdź <div className="relative inline-block"><span className="relative z-10">wymarzoną pracę</span><img className="absolute -bottom-1 left-0 w-full underline-animation" src={underline} alt="" /></div><br />bez tworzenia CV!</h1>
            <div className="flex flex-col md:grid grid-cols-2 gap-8">
                <div className="bg-white p-10 flex flex-col gap-4 shadow-primaryBig rounded-3xl relative">
                    <Control className="absolute -bottom-[120%] -left-[19vw] -z-10 hidden md:block" ease='ease-out' opacity={1} x={-20} element={<img className="max-w-[calc(5.6in+2vw)]" src={bgGirl} alt="" />} />
                    <h2 className="md:text-xl font-bold text-left">BezCV to portal, który...</h2>
                    <p className="text-sm text-[#3C4663] leading-loose max-w-[4in] text-left">określi Twoje kompetencje miękkie i <span className="font-semibold">znajdzie Ci pracę marzeń.</span> Nie musisz tworzyć swojego CV, my stworzymy Twój profil <span className="font-semibold">zupełnie za darmo.</span></p>
                </div>
                <div className="bg-white p-10 flex flex-col gap-4 shadow-primaryBig rounded-3xl relative">
                    <Control className="absolute -bottom-[120%] -right-[19vw] -z-10 hidden md:block" opacity={1} x={20} ease='ease-out' element={<img className="max-w-[calc(5in+2vw)]" src={bgBoy} alt="" />} />
                    <h2 className="md:text-xl font-bold text-left">Codziennie pozyskujemy...</h2>
                    <p className="text-sm text-[#3C4663] leading-loose max-w-[4in] text-left"><span className="font-semibold">pracodawców,</span> którzy nawet tego samego dnia mogą się do Ciebie zgłosić. Dzięki temu już jutro możesz dostać propozycję, o której <span className="font-semibold">zawsze marzyłeś.</span></p>
                </div>
            </div>
            <Link to='/praca' className="rounded-full max-w-max text-white text-[.8rem] font-semibold flex items-center py-[14px] px-10 bg-secondary">Znajdź pracę <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" /></Link>
        </section>
    )
}