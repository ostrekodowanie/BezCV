import Control from "react-control-js"
import { bannerMan } from "../../../assets/home/candidate/candidate"
import { scs1, scs2 } from "../../../assets/home/employer/employer"

export default function SoftCandidateSkills() {
    return (
        <section className="padding overflow-hidden relative">
            <h2 className="text-center font-semibold max-w-[10in] text-3xl md:text-4xl md:leading-tight mx-auto">W jaki sposób określamy <span className="font-bold">kompetencje miękkie</span> kandydata do pracy?</h2>
            <div className="relative py-16 mt-8">
                <div className="flex flex-col gap-16 text-[#3C4663]">
                    <Control opacity={1} x={-20} onScroll element={
                        <div className="rounded-3xl p-8 pt-12 bg-white max-w-[30vw] shadow-[2px_42px_58px_rgba(28,87,237,0.11)] relative">
                            <div className="h-14 w-14 rounded bg-[#EEF3FF] absolute left-8 translate-y-[-50%] top-0"><img src={scs1} alt="" /></div>
                            <p className="text-sm leading-relaxed font-medium">Kompetencje miękkie kandydatów do pracy określamy za pomocą <span className="font-semibold">ankiety</span> stworzonej przez doświadczonych psychologów biznesu i headhunterów, których <span className="font-semibold">celem jest zebranie rzetelnych informacji.</span></p>
                        </div>
                    } />
                    <Control opacity={1} x={-20} onScroll element={
                        <div className="rounded-3xl p-8 pt-12 bg-white max-w-[40vw] shadow-[2px_42px_58px_rgba(28,87,237,0.11)] relative">
                            <div className="h-14 w-14 rounded bg-[#EEF3FF] absolute left-8 translate-y-[-50%] top-0"><img src={scs2} alt="" /></div>
                            <p className="text-sm leading-relaxed font-medium">Pytania są ułożone w taki sposób, żeby nie sugerować żadnej odpowiedzi. Natomiast ankietowany nie wie, jaka odpowiedź może zostać odebrana pozytywnie lub negatywnie. <span className="font-semibold">Czas na udzielenie odpowiedzi to 15 sekund. Pozwala to pomóc zweryfikować, czy Twój potencjalny pracownik poradzi sobie z pracą pod presją czasu.</span></p>
                        </div>
                    } />
                </div>
                <Control className="absolute right-0 h-full bottom-0 -z-10" opacity={1} x={20} ease='ease-out' viewPort={0.6} onScroll element={<img src={bannerMan} alt="" />} />
            </div>
        </section>
    )
}