import { useContext, useState } from "react"
import { tutorialInterface } from "../../../assets/home/home"
import { candidateAnswers, employerAnswers, TutorialAnswerProps } from "../../../constants/tutorialMenu"
import { AccountContext } from "../../../reducers/AccountProvider"

export default function TutorialInterface() {
    const { account } = useContext(AccountContext)

    return (
        <div className="relative">
            <img className="w-full rounded-3xl" src={tutorialInterface} alt="" />
            {account === 'worker' ? candidateAnswers.map(ans => <AnswerButton {...ans} />) : employerAnswers.map(ans => <AnswerButton {...ans} />)}
        </div>
    )
}

const AnswerButton = ({ title, desc, position }: TutorialAnswerProps) => {
    const { account } = useContext(AccountContext)
    const [active, setActive] = useState(false)

    return (
        <button onClick={() => setActive(prev => !prev)} className={`${account === 'worker' ? 'bg-primary' : 'bg-secondary'} rounded-full text-xl font-semibold flex items-center justify-center h-12 w-12 absolute ${position}`}>
            {active ? '-' : '+'}
            {active && <div className={`absolute left-[120%] -top-8 flex flex-col gap-4 rounded-xl bg-white py-6 px-4 max-w-[10in] ${account === 'worker' ? 'shadow-secondarySmall' : 'shadow-primarySmall'}`}>
                <h3 className="font-semibold text-xl text-font">{title}</h3>
                <p className='text-[#3C4663] text-sm font-medium w-[3in]'>{desc}</p>
            </div>}
        </button>
    )
}