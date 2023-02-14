import Control from "react-control-js"
import { bigTriangle } from "../../../assets/general"
import { underline } from "../../../assets/home/candidate/candidate"
import { isEnoughMan, isEnoughWoman } from '../../../assets/home/employer/employer'

export default function IsEnough() {
    return (
        <section className="padding pt-[1in] overflow-visible lg:overflow-hidden relative">
            <h2 className="text-center font-semibold max-w-[10in] text-3xl md:text-4xl md:leading-tight mx-auto">Czy taki formularz wystarczy do sprawdzenia <span className="font-bold">kompetencji miękkich</span> <div className="relative inline-block"><span className="relative z-10">kandydata</span><Control onScroll x={-30} opacity={1} className="absolute bottom-0 w-full" element={<img className="max-w-full" src={underline} alt="" />} /></div> do pracy?</h2>
            <div className="relative pt-16 lg:pt-[3in] flex flex-col md:grid md:grid-cols-2 xl:grid-cols-[4fr_5fr] gap-8 lg:gap-[1in] text-[#3C4663] lg:items-end">
                <div className="relative">
                    <img className="hidden lg:block" src={isEnoughMan} alt="" />
                    <Control className="lg:absolute lg:bottom-[117%] lg:-right-[30%]" opacity={1} x={-20} onScroll element={
                        <div className="rounded-3xl p-8 bg-white shadow-[2px_42px_58px_rgba(28,87,237,0.11)] relative md:max-w-[5in]">
                            <div className="text-5xl absolute left-8 translate-y-[-20%] top-0 text-primary font-bold">“</div>
                            <p className="text-sm leading-relaxed font-medium relative z-10">Oczywiście, że nie. BezCV jest pierwszym etapem rekrutacji, pozwala Ci oszczędzić czas i pieniądze. Koniec z przeglądaniem setek CV.</p>
                            <img className="absolute left-[calc(1in-2vw)] top-[70%] hidden lg:block" src={bigTriangle} alt="" />
                        </div>
                    } />
                </div>
                <div className="relative">
                    <img className="hidden lg:block" src={isEnoughWoman} alt="" />
                    <Control className="lg:absolute lg:bottom-[80%] lg:-left-[30%]" opacity={1} x={-20} onScroll element={
                        <div className="rounded-3xl p-8 bg-white w-full shadow-[2px_42px_58px_rgba(28,87,237,0.11)] relative md:max-w-[5in]">
                            <div className="text-5xl absolute left-8 translate-y-[-20%] top-0 text-primary font-bold">“</div>
                            <p className="text-sm leading-relaxed font-medium relative z-10">Sam wybierasz, do jakiego kandydata się odezwiesz i z jakim nawiążesz relacje biznesową! Odwracamy proces, tworząc bazę wstępnie przygotowanych osób, które z dużym prawdopodobieństwem spełnią Twoje oczekiwania względem stanowiska.</p>
                            <img className="absolute right-[calc(3in-10vw)] scale-x-[-1] top-[70%] hidden lg:block" src={bigTriangle} alt="" />
                        </div>
                    } />
                </div>
            </div>
        </section>
    )
}