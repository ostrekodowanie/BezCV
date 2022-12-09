import FilledButton from "../../components/FilledButton";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function ChooseAccount({ setStep }: { setStep: any }) {
    const [form, setForm] = useState<1 | 2>(1)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!form) return
        if(form === 2) return
        return setStep(form)
    }

    return (
        <div className="flex flex-col text-center items-center xl:items-start xl:w-max">
            <h2 className="font-semibold text-3xl mb-4 w-full xl:mb-8 xl:text-4xl">Kim jesteś?</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center text-center gap-6">
                <div className="relative">
                    <input className="peer absolute right-4 top-4 z-10" type="radio" defaultChecked={true} onChange={() => setForm(1)} name='account' id='client' />
                    <label className="flex items-center text-left px-7 py-5 cursor-pointer peer-checked:border-primary border-2 border-[#E4E4E9] rounded-lg gap-6" htmlFor="client">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-medium px-6">Kandydat na pracownika</h3>
                        </div>
                    </label>
                </div>
                <div className="relative">
                    <input className="peer absolute right-4 top-4 z-10" type="radio" onChange={() => setForm(2)} name='account' id='skp' />
                    <label className="flex items-center text-left px-7 py-5 cursor-pointer peer-checked:border-primary border-2 border-[#E4E4E9] rounded-lg gap-6" htmlFor="skp">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-medium px-6">Pracodawca</h3>
                        </div>
                    </label>
                </div>
                <span className="my-3">Już posiadasz konto? <Link className="text-primary font-medium" to='/logowanie'>Zaloguj się</Link></span>
                <FilledButton>Dalej</FilledButton>
            </form>
        </div>
    )
}