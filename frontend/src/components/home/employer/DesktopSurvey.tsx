import { orangeArrowBottom } from "../../../assets/general";
import { surveyVideo } from "../../../assets/home/home";
import { desktop } from "../../../assets/home/home";

export default function DesktopSurvey() {
  return (
    <section className="padding py-[1in] md:py-[1.4in] relative overflow-hidden">
      <div className="items-center gap-2 xl:gap-6 absolute left-[5vw] sm:left-[12vw] hidden md:flex xl:left-[10vw] 2xl:left-[14vw] top-[1in]">
        <img
          className="max-h-[1in] xl:max-h-[20vh] relative bottom-4"
          src={orangeArrowBottom}
          alt=""
        />
        <img
          className="max-h-[1in] xl:max-h-[20vh]"
          src={orangeArrowBottom}
          alt=""
        />
      </div>
      <div className="relative w-full sm:w-[80%] sm:mx-auto">
        <div className="absolute top-[4%] bottom-[10%] left-[12%] right-[12%] overflow-hidden max-w-[95%] flex flex-col items-center justify-center">
          <video
            className="min-w-[70vw] md:min-w-[50vw]"
            autoPlay
            loop
            src={surveyVideo}
          ></video>
        </div>
        <img className="w-full" src={desktop} alt="" />
      </div>
      <div className="bg-[linear-gradient(180deg,rgba(217,217,217,0)_0%,rgba(47,102,244,0.1)_100%)] absolute bottom-0 right-0 left-0 h-[50vh] -z-10" />
    </section>
  );
}
