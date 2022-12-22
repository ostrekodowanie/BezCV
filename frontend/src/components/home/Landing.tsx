import Control from "react-control-js";
import { Link } from "react-router-dom";
import { arrowRight } from "../../assets/general";
import { landingShadow } from "../../assets/home/home";

export const inputStyles = 'py-3 px-6 rounded shadow-[0px_6px_132px_rgba(76,101,234,0.08)] bg-white placeholder:text-[#B4BFF7] font-medium text-primary'

interface Search {
    name: string,
    vehicle: string,
    city: string
}

export default function Landing() {
    return (
        <section className="padding py-[1.4in] md:py-[2in] flex flex-col min-h-screen xl:grid xl:gap-8 xl:items-center grid-cols-[4fr_3fr] relative">
            <Control delay={200} ease='ease-out' opacity={1} element={
            <div className="flex flex-col gap-3 xl:mb-8 max-w-[5.8in]">
                <h2 className="flex items-center tracking-widest gap-4 text-sm md:text-base">
                    <span className="px-2 bg-lightPrimary text-primary rounded-full">BEZCV</span>
                    TO NUMER 1 NA RYNKU OFERT PRACY
                </h2>
                <h1 className="font-bold text-3xl text-font md:text-[2.5rem] xl:text-[min(calc(1rem+2vw),3.4rem)] md:leading-tight">To nie <span className="relative inline-flex items-center">korporacje<div className="bg-primary rounded-full h-[5px] mt-2 -right-2 -left-2 absolute" /></span><br /> tworzą wielkie sukcesy,<br />lecz <span className="relative">ludzie <div className="absolute -z-10 right-0 -left-2 h-[0.6em] rounded-tl-full rounded-br-full rounded-tr rounded-bl bottom-0 bg-[#FEEDE0]" /></span></h1>
                <p className="text-[rgba(23,26,35,0.63)] mt-4 leading-loose max-w-[90%]">Lorem ipsum dolor sit amet consectetur. Elit a nisi pharetra est vulputate. Nunc dolor elementum nunc imperdiet ut enim proin. Vitae sit convallis nulla neque enim diam.</p>
                <div className="flex items-center flex-wrap gap-6 mt-6 text-sm font-bold">
                    <a href='#zgloszenia' className="py-3 px-6 text-white bg-secondary hover:bg-darkSecondary transition-colors rounded-full flex items-center">Szukam pracy<img className="ml-2 max-h-[1em]" src={arrowRight} alt='' /></a>
                    <Link to='/rejestracja' className="py-3 px-6 text-white bg-primary hover:bg-darkPrimary transition-colors rounded-full flex items-center">Jestem pracodawcą<img className="ml-2 max-h-[1em]" src={arrowRight} alt='' /></Link>
                </div>
            </div>
            } />
            <img className="absolute right-0 bottom-0 max-w-[50vw]" src={landingShadow} alt="" />
            {/* <img className="mt-24 mx-[12vw] xl:mx-0 xl:mt-0 xl:ml-auto" src={landingMain} alt="" /> */}
        </section>
    )
}