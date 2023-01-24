import axios from "axios"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { defaultQuestions, QuestionProps } from "../../constants/findWork"
import { inputStyles } from "../Contact"

export default function WorkForm() {
    const [answers, setAnswers] = useState<any>({})

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const resp = await axios.post('/api/candidate/add', JSON.stringify({ answers }), {
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.status === 200) return
    }

    return (
        <section className="padding py-[1in] md:py-[1.4in] 2xl:py-[2in] bg-white">
            <form onSubmit={handleSubmit} className="mt-8">
                <ol className="flex flex-col gap-8 list-decimal list-inside">
                    {defaultQuestions.map((q, i) => <Question {...q} setAnswers={setAnswers} i={i + 1} key={q.name} />)}
                </ol>
                <button className="bg-primary rounded-full py-3 px-6 max-w-max text-white text-sm mt-12">Dalej</button>
            </form>
        </section>
    )
}

const Question = ({ name, question, type, answers, i, setAnswers }: QuestionProps & { i: number, setAnswers: Dispatch<SetStateAction<any>> }) => {
    return (
        <li className="flex flex-col gap-3">
            <label htmlFor={name}>{i}. {question}</label>
            {type === 'checkbox' || type === 'radio' ?
                answers?.map(ans => <div className="flex items-center gap-3">
                    <input type={type} value={ans} onChange={e => setAnswers((prev: {}) => ({ ...prev, [name]: e.target.value }))} id={ans} name={name} />
                    <label htmlFor={ans}>{ans}</label>
                </div>)
            : <input className={'max-w-[6in] ' + inputStyles.input} type='text' onChange={e => setAnswers((prev: {}) => ({ ...prev, [name]: e.target.value }))} id={name} name='find_work' />}
        </li>
    )
}