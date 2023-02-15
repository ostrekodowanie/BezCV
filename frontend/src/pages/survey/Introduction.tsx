import Control, { Controller } from "react-control-js";
import { Link } from "react-router-dom";
import { arrowRight } from "../../assets/general";
import { surveyIntroductionMan, triangle } from "../../assets/survey/survey";

export default function Introduction() {
    return (
        <section className="padding pt-[1.4in] md:pt-[2in] bg-white md:grid grid-cols-[1fr_2fr] gap-8 overflow-hidden">
            <div className="hidden md:block relative">
                <Control className="w-full xl:h-[8in] h-[6in]" ease='ease-out' x={-20} opacity={1} element={<img className="object-top object-cover" src={surveyIntroductionMan} alt="" />} />
                <Control className="absolute xl:block hidden left-full top-0 max-w-full w-[5in]" delay={200} opacity={1} ease='ease-out' element={<div className="bg-white rounded-3xl shadow-[0px_8px_64px_rgba(199,147,70,0.17)] p-8 flex flex-col gap-2 relative">
                    <small className="text-secondary font-semibold">Cześć!</small>
                    <p className="font-medium"><span className="font-bold">Miło mi Ciebie poznać.</span> Jestem Mariusz i <span className="font-bold">przeprowadzę Cię przez kwestionariusz,</span> który pozwoli mi Cię lepiej poznać.</p>
                    <img className="rotate-90 absolute -left-10 -bottom-8 w-[1in]" src={triangle} alt="" />
                </div>} />
            </div>
            <Controller className="flex flex-col xl:grid grid-cols-2 gap-8 text-[#3C4663] font-medium self-end mb-[1in]" ease="ease-out" delay={200} stagger={100} opacity={1}>
                <Control element={<div className="flex flex-col gap-4">
                    <div className="rounded-full bg-secondary h-12 w-12 font-bold flex items-center justify-center text-white">1</div>
                    <p>Chciałbyś mieć <span className="font-bold">większą satysfakcję z pracy</span> i <span className="font-bold">zarabiać więcej niż teraz?</span> A może chcesz dowiedzieć się, jakie są Twoje mocne strony zawodowe i do których profesji najlepiej pasujesz?</p>
                </div>} />
                <Control element={<div className="flex flex-col gap-4">
                    <div className="rounded-full bg-secondary h-12 w-12 font-bold flex items-center justify-center text-white">2</div>
                    <p><span className="font-bold">Wypełniając</span> tą ankietę możesz <span className="font-bold">rozpędzić</span> swoją zawodową karierę. Będziesz za darmo otrzymywać oferty pracy tylko od firm, które <span className="font-bold">szukają osoby o Twoim profilu.</span></p>
                </div>} />
                <Control element={<div className="flex flex-col gap-4">
                    <div className="rounded-full bg-secondary h-12 w-12 font-bold flex items-center justify-center text-white">3</div>
                    <p><span className="font-bold">Efekt?</span> Większa <span className="font-bold">satysfakcja</span> z pracy i więcej możliwości <span className="font-bold">rozwoju.</span></p>
                </div>} />
                <Control element={<div className="flex flex-col gap-4">
                    <div className="rounded-full bg-secondary h-12 w-12 font-bold flex items-center justify-center text-white">4</div>
                    <p><span className="font-bold">Ankieta</span> zajmie Ci <span className="font-bold">około 9 minut</span> - masz możliwość nie udzielania odpowiedzi. Im więcej nam o sobie opowiesz tym większa szansa, że <span className="font-bold">znajdziemy Ci wymarzoną pracę.</span></p>
                </div>} />
                <Control opacity={1} delay={200} element={<Link to='/praca/ankieta' className="bg-secondary transition-colors font-medium border-primary text-white rounded-full flex items-center text-[.8rem] py-3 px-8 self-start max-w-max">Zaczynajmy! <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" /></Link>} />
            </Controller>
        </section>
    )
}