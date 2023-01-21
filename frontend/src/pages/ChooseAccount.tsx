import Control from "react-control-js";
import { arrowRight } from "../assets/general";
import { landingMain, orangeArrowRight } from "../assets/home/home";
import { AccountType } from "../reducers/AccountProvider";

export const inputStyles = 'py-3 px-6 rounded shadow-[0px_6px_132px_rgba(76,101,234,0.08)] bg-white placeholder:text-[#B4BFF7] font-medium text-primary'

export default function ChooseAccount({ setAccount }: { setAccount: (account: AccountType) => void }) {
    return (
        <section className="padding py-[1.4in] md:py-[2in] md:items-center flex flex-col min-h-screen xl:grid xl:gap-8 grid-cols-[1fr_1fr] relative">
            <Control delay={200} ease='ease-out' opacity={1} element={
            <div className="flex flex-col gap-3 md:text-center md:items-center xl:items-start xl:text-left xl:mb-8 max-w-[5.8in]">
                <h2 className="flex items-center tracking-widest gap-4 text-sm md:text-base">
                    <span className="px-2 bg-lightPrimary text-primary rounded-full">BEZCV</span>
                    TO NUMER 1 NA RYNKU OFERT PRACY
                </h2>
                <h1 className="font-bold text-4xl text-font md:text-5xl md:text-[min(calc(1rem+2.5vw),3.4rem)] md:leading-tight">To nie <span className="relative inline-flex items-center">korporacje<div className="bg-primary rounded-full animation-scale h-[5px] mt-2 -right-2 -left-2 absolute" /></span><br /> tworzą wielkie<br />sukcesy, lecz <span className="relative">ludzie <div className="absolute -z-10 right-0 -left-2 h-[0.6em] rounded-tl-full rounded-br-full rounded-tr rounded-bl bottom-0 bg-[#FEEDE0] animation-scale-y" /></span></h1>
                <p className="text-[rgba(23,26,35,0.63)] text-sm xl:text-base mt-4 leading-loose xl:leading-loose sm:max-w-[65%] xl:max-w-[88%]">Lorem ipsum dolor sit amet consectetur. Elit a nisi pharetra est vulputate. Nunc dolor elementum nunc imperdiet ut enim proin. Vitae sit convallis nulla neque enim diam.</p>
                <div className="flex items-center flex-wrap gap-6 mt-6 text-sm font-bold">
                    <button onClick={() => setAccount('employer')} className="py-3 px-6 text-white bg-primary hover:bg-darkPrimary transition-colors rounded-full flex items-center">Jestem pracodawcą<img className="ml-2 max-h-[1em]" src={arrowRight} alt='' /></button>
                    <button onClick={() => setAccount('worker')} className="py-3 px-6 rounded-full hover:text-secondary transition duration-300 bg-white shadow-[0px_25px_63px_rgba(138,138,138,0.16)] hover:shadow-[0px_38px_69px_rgba(249,141,61,0.14)] flex items-center">Szukam pracy<img className="ml-2 max-h-[1em]" src={orangeArrowRight} alt='' /></button>
                </div>
            </div>
            } />
            {/* <img className="absolute right-0 bottom-0 max-w-[50vw]" src={landingShadow} alt="" /> */}
            <img className="mt-24 mx-[12vw] xl:mx-0 xl:mt-0" src={landingMain} alt="" />
        </section>
    )
}