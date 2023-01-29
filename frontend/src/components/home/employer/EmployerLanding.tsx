import { useContext } from "react"
import { AccountContext } from "../../../reducers/AccountProvider"

export default function EmployerLanding() {
    const { setAccount } = useContext(AccountContext)
    return (
        <section className="padding py-[1.4in] md:py-[2in] md:items-center flex flex-col gap-8 relative">
            <div className="flex flex-col gap-4">
                <h1>Jesteś pracodawcą!</h1>
                <button className="bg-primary rounded-full py-3 px-6 max-w-max text-white text-sm" onClick={() => setAccount && setAccount('worker')}>Chcę zostać kandydatem do pracy</button>
            </div>
        </section>
    )
}