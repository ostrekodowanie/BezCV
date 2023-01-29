import { useContext } from "react"
import { underline } from "../../../assets/home/candidate/candidate"
import { AccountContext } from "../../../reducers/AccountProvider"

export default function CandidateLanding() {
    const { setAccount } = useContext(AccountContext)
    return (
        <section className="padding pt-[1.4in] md:pt-[2in] items-center flex flex-col gap-16 relative text-center">
            <h1 className="font-semibold text-3xl leading-snug md:text-4xl md:leading-snug xl:text-5xl xl:leading-snug">Znajdź <div className="relative inline-block"><span className="relative z-10">wymarzoną pracę</span><img className="absolute bottom-1" src={underline} alt="" /></div><br />bez tworzenia CV!</h1>
            <div className="bg-white p-10 pb-14 flex flex-col items-center gap-6 shadow-secondaryBig rounded-t-3xl">
                <strong className="text-xl">BezCV to portal, który...</strong>
                <p className="text-sm text-[#3C4663] leading-loose max-w-[9in]">określi Twoje kompetencje miękkie i znajdzie Ci pracę marzeń. Nie musisz tworzyć swojego CV, my stworzymy Twój profil zupełnie za darmo. Codziennie pozyskujemy pracodawców, którzy nawet tego samego dnia mogą się do Ciebie zgłosić. Dzięki temu już jutro możesz dostać propozycję, o której zawsze marzyłeś.</p>
                {/* <button className="bg-primary mt-4 rounded-full py-3 px-6 max-w-max text-white text-sm" onClick={() => setAccount && setAccount('worker')}>Chcę zostać kandydatem do pracy</button> */}
            </div>
        </section>
    )
}