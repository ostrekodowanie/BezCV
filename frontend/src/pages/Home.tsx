import { useContext } from "react";
import { AccountContext } from "../reducers/AccountProvider";
import CandidateLanding from "../components/home/candidate/CandidateLanding";
import EmployerLanding from "../components/home/employer/EmployerLanding";
import Introduction from "../components/home/candidate/Introduction";
import Loader from "../components/Loader";
import Questions from "../components/home/candidate/Questions";

export default function Home() {
    const { account } = useContext(AccountContext)
    if(!account) return <div className="w-screen h-screen flex items-center justify-center"><Loader /></div>
    if(account === 'employer') return (
        <>  
            <EmployerLanding />
        </>
    )
    if(account === 'worker') return (
        <>
            <CandidateLanding />
            <Introduction />
            <Questions />
        </>
    )
    return <></>
}