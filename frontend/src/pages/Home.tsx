import Landing from "./ChooseAccount";
import CandidateForm from "../components/home/candidate/CandidateForm";
import { useContext } from "react";
import { AccountContext } from "../reducers/AccountProvider";
import CandidateLanding from "../components/home/candidate/CandidateLanding";
import EmployerLanding from "../components/home/employer/EmployerLanding";

export default function Home() {
    const { account } = useContext(AccountContext)
    if(!account) return <></>
    return (
        <>
            {account === 'employer' ? <EmployerLanding /> : <CandidateLanding />}
            <CandidateForm />
        </>
    )
}