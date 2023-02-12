import Control from "react-control-js";
import { bannerGirl, bannerMan, minutesUnderline, triangle } from "../../../assets/home/candidate/candidate";

export default function Banner() {
    return (
        <section className="padding pt-[2.2in] sm:pt-[1.4in] xl:pt-[calc(2.2in+3vw)] items-center relative">
            <div className="font-bold bg-secondary rounded-t-3xl px-10 relative xl:px-16 py-8 xl:py-12 pt-12 text-white">
                <h2 className="text-2xl xl:text-3xl xl:leading-normal relative">
                    W <div className="inline-block relative">
                        <span className="relative z-10">9 minut</span>
                        <img className="absolute bottom-0 right-0 left-0" src={minutesUnderline} alt="" />
                    </div>
                    <span> stworzymy Ci <br />profesjonalny profil.</span>
                </h2>
                <h2 className="text-3xl xl:text-[2.5rem] font-extrabold mt-4 relative z-10">Koniec ze żmudnym tworzeniem CV.</h2>
                <div className="absolute right-10 xl:right-20 bottom-0 hidden xl:block">
                    <img className="max-h-[4.6in]" src={bannerMan} alt="" />
                    <Control className="absolute top-0 left-0" onScroll opacity={1} x={20} viewPort={0.5} ease='ease-out' element={<div className="bg-white px-8 py-4 rounded-3xl shadow-[0px_41px_122px_rgba(0,10,20,0.3)]">
                        <h4 className="font-bold text-xl md:text-2xl text-font">To tyle!</h4>
                        <img className="absolute right-3 top-[90%] max-h-[55%]" src={triangle} alt="" />
                    </div>} />
                </div>
                <div className="absolute xl:w-[26%] w-[2in] left-2 sm:left-8 -top-[1.5in] -z-10 xl:top-auto xl:bottom-[86%] ">
                    <img className="w-full" src={bannerGirl} alt="" />
                    <Control onScroll opacity={1} x={-20} ease='ease-out' className="absolute -top-[50%] sm:-top-2 -right-[50%] sm:-right-full xl:-right-[60%] max-w-max" element={<div className="bg-white py-3 px-6 rounded-3xl shadow-[0px_41px_122px_rgba(0,10,20,0.3)]">
                        <h4 className="font-bold xl:text-xl text-font max-w-[2in] xl:max-w-[2.2in]">W tej chwili ankietę wypełnia <span className="text-secondary">{((Math.random() * 10) + 1).toFixed(0)} osób</span></h4>
                        <img className="absolute left-3 scale-x-[-1] top-[90%] max-h-[55%]" src={triangle} alt="" />
                    </div>} />
                </div>
            </div>
        </section>
    )
}