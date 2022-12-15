import Control from "react-control-js";

export const inputStyles = 'py-3 px-6 rounded shadow-[0px_6px_132px_rgba(76,101,234,0.08)] bg-white placeholder:text-[#B4BFF7] font-medium text-primary'

interface Search {
    name: string,
    vehicle: string,
    city: string
}

export default function Landing() {
    return (
        <section className="padding py-[1.4in] md:py-[2in] flex flex-col xl:grid xl:gap-8 xl:items-center grid-cols-[4fr_3fr]">
            <Control delay={200} ease='ease-out' opacity={1} element={
            <div className="flex flex-col gap-3 xl:mb-8">
                <span className="font-semibold tracking-wider xl:text-xl">to nie korporacje tworzą sukcesy, <span className="text-primary">lecz ludzie</span></span>
                <h1 className="font-bold text-3xl text-font md:text-[2.5rem] xl:text-[min(calc(1rem+2vw),3rem)] md:leading-tight">BezCV</h1>
            </div>
            } />
            {/* <img className="mt-24 mx-[12vw] xl:mx-0 xl:mt-0 xl:ml-auto" src={landingMain} alt="" /> */}
        </section>
    )
}