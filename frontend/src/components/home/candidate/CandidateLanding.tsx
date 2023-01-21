import { useContext } from "react"
import { AccountContext } from "../../../reducers/AccountProvider"

export default function CandidateLanding() {
    const { setAccount } = useContext(AccountContext)
    return (
        <section className="padding py-[1.4in] md:py-[2in] md:items-center flex flex-col min-h-screen xl:grid xl:gap-8 grid-cols-[1fr_1fr] relative">
            <div className="flex flex-col gap-4">
                <h1>Jesteś kandydatem do pracy!</h1>
                <button className="bg-primary rounded-full py-3 px-6 max-w-max text-white text-sm" onClick={() => setAccount && setAccount('employer')}>Chcę zostać pracodawcą</button>
            </div>
        </section>
    )
}