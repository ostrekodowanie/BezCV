import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react"
import { RoleProps, roles } from "../../constants/workForm"
import { AccountContext } from "../../reducers/AccountProvider"
import TutorialInterface from "./tutorial/Interface"
import RoleButton from "./tutorial/RoleButton"

type RoleStateContextType = {
    setRole: Dispatch<SetStateAction<RoleProps>>,
    role: RoleProps
}

export const RoleStateContext = createContext<RoleStateContextType>(null!)

export default function TutorialMenu() {
    const [role, setRole] = useState<RoleProps>(roles[0])
    const { account } = useContext(AccountContext)

    const contextValue = useMemo(() => ({
        role,
        setRole
    }), [role, setRole])

    return (
        <section className='padding pb-[1in] md:pb-[1.4in] 2xl:pb-[1.8in] hidden xl:block text-white'>
            <RoleStateContext.Provider value={contextValue}>
                <div className={`${account === 'worker' ? 'bg-secondary' : 'bg-primary'} rounded-3xl p-10 md:p-16 flex flex-col gap-4`}>
                    <h2 className="text-3xl md:text-4xl font-semibold leading-snug md:leading-snug relative max-w-[6.2in]">{account === 'worker' ?  'Jak będzie wyglądał Twój profil i czego pracodawca będzie mógł się o Tobie dowiedzieć?' : 'Jak wygląda profil kandydata i czego mogę się o nim dowiedzieć?'}</h2>
                    <p className={`${account === 'worker' ? 'text-[#FEE9CB]' : 'text-[#D2E4FD]'} font-medium max-w-[6.2in]`}>{account === 'worker' ? 'Wybierz stanowisko, na jakie chcesz kandydować i zobacz jak wyglądać będzie Twój profil dla pracodawców.' : 'Wybierz stanowisko, na jakie szukasz pracownika i zobacz jak wygląda przykładowy profil kandydata.'}</p>
                    <div className={`flex items-center gap-3 py-1 px-[.3rem] ${account === 'worker' ? 'bg-[rgba(249,191,123,0.61)]' : 'bg-[rgba(255,255,255,0.3)]'} my-8 w-max rounded-full`}>
                        {roles.map(role => <RoleButton {...role} />)}
                    </div>
                    <TutorialInterface />
                </div>
            </RoleStateContext.Provider>
        </section>
    )
}