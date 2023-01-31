import { bannerMan, minutesUnderline, triangle } from "../../../assets/home/candidate/candidate";

export default function Banner() {
    return (
        <section className="padding pt-[1in] md:pt-[1.4in] 2xl:pt-[1.8in] items-center relative">
            <div className="font-bold bg-secondary rounded-3xl px-10 overflow relative xl:px-20 py-8 xl:py-16 pt-12 xl:pt-20 text-white">
                <h2 className="text-3xl leading-tight xl:text-[2.5rem] xl:leading-tight"><div className="text-2xl xl:text-2xl mb-2">W <div className="inline-block relative"><span className="relative z-10">9 minut</span><img className="absolute bottom-0 right-0 left-0" src={minutesUnderline} alt="" /></div></div><span>stworzymy Ci<br />profesjonalny profil.</span></h2>
                <h2 className="text-xl xl:text-2xl mt-4">Koniec ze żmudnym tworzeniem CV.</h2>
                <div className="absolute right-10 xl:right-20 bottom-0">
                    <img className="max-h-[4.6in]" src={bannerMan} alt="" />
                    <div className="absolute rounded-full -z-10 left-16 -right-16 top-8 -bottom-8 h-full w-full bg-[#FAC63F] blur-[146.5px]" />
                    <div className="absolute top-0 left-0 bg-white px-12 py-3 rounded-xl">
                        <h4 className="font-bold text-xl md:text-2xl text-font">To tyle!</h4>
                        <img className="absolute right-3 top-[90%] max-h-[55%]" src={triangle} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}