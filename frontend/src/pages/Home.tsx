import { useContext } from "react";
import { AccountContext } from "../reducers/AccountProvider";
import CandidateLanding from "../components/home/candidate/CandidateLanding";
import EmployerLanding from "../components/home/employer/EmployerLanding";
import Introduction from "../components/home/candidate/Introduction";
import Loader from "../components/Loader";
import Questions from "../components/home/candidate/Questions";
import CandidateBanner from "../components/home/candidate/Banner";
import WhatNext from "../components/home/candidate/WhatNext";
import HowToFind from "../components/home/employer/HowToFind";
import EmployerBanner from "../components/home/employer/Banner";
import Points from "../components/home/employer/Points";

export default function Home() {
    const { account } = useContext(AccountContext)
    if(account === 'employer') return (
        <>  
            <EmployerLanding />
            <HowToFind />
            <EmployerBanner />
            <Points />
        </>
    )
    if(account === 'worker') return (
        <>
            <CandidateLanding />
            <Introduction />
            <Questions />
            <CandidateBanner />
            <WhatNext />
        </>
    )
    return <div className="w-screen h-screen flex items-center justify-center"><Loader /></div>
}