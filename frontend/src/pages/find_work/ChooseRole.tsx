import { Dispatch, SetStateAction } from "react";
import { buttonArrow } from "../../assets/account/account";

const roles = [
    {
        name: 'office_administration',
        title: 'Administracja biurowa',
        image: ''
    },
    {
        name: 'customer_service',
        title: 'Obsługa klienta',
        image: ''
    },
    {
        name: 'selling',
        title: 'Sprzedaż',
        image: ''
    },
]

export default function ChooseRole({ setQuestion }: { setQuestion: Dispatch<SetStateAction<number>>}) {
    return (
        <>
            <h2 className="text-3xl font-bold">Wybierz zawód</h2>
            <div className="flex flex-col items-stretch w-full gap-6 mt-8">
                {roles.map(role => 
                    <label className='' htmlFor={role.name} key={'label:' + role.name}>
                        <input value={role.name} type='radio' key={role.name} id={role.name} name='role' />
                        {role.title}
                    </label>
                )}
            </div>
            <button onClick={() => setQuestion(prev => prev + 1)} className="rounded-full text-[.8rem] text-white ml-auto self-end font-bold py-4 px-8 bg-secondary flex items-center">Następne pytanie <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="" /></button>
        </>
    )
}