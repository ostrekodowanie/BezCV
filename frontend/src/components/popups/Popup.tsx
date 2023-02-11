import { useContext, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../main";
import { AccountContext } from "../../reducers/AccountProvider";
import CandidatePopup from "./CandidatePopup";
import EmployerPopup from "./EmployerPopup";

export default function Popup() {
    const { logged } = useAppSelector(state => state.login)
    const [canShow, setCanShow] = useState(false)
    const timer = useRef<any>(null)
    const { account } = useContext(AccountContext)

    useEffect(() => {
        if(!account || logged) return
        timer.current = setTimeout(() => {
            setCanShow(true)
        }, 5000)
        return () => {
            clearTimeout(timer.current)
        }
    }, [account])

    if(!canShow || !account || logged) return <></>

    switch(account) {
        case 'employer':
            return <EmployerPopup setCanShow={setCanShow} />
        case 'worker':
            return <CandidatePopup setCanShow={setCanShow} />
    }
}