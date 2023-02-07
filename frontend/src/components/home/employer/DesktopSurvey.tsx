import { orangeArrowBottom } from "../../../assets/general";
import { desktopSurvey } from "../../../assets/home/home";

export default function DesktopSurvey() {
    return (
        <section className="padding py-[1in] md:py-[1.4in] relative overflow-hidden">
            <div className="flex items-center gap-6 absolute left-[5vw] hidden md:flex xl:left-[8vw] top-[1in]">
                <img className="max-h-[1in] xl:max-h-[20vh]" src={orangeArrowBottom} alt='' />
                <img className="max-h-[1in] xl:max-h-[20vh]" src={orangeArrowBottom} alt='' />
            </div>
            <img className="w-full" src={desktopSurvey} alt="" />
            <div className="bg-[linear-gradient(180deg,rgba(217,217,217,0)_0%,rgba(47,102,244,0.1)_100%)] absolute bottom-0 right-0 left-0 h-[50vh]" />
        </section>
    )
}