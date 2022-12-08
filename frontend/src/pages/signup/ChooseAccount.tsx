import FilledButton from "../../components/FilledButton";
import { skp, client } from "../../assets/signup";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function ChooseAccount({ setStep }: { setStep: any }) {
    const [form, setForm] = useState<1 | 2>(1)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!form) return
        return setStep(form)
    }

    return (
        <div className="flex flex-col text-center items-center xl:items-start xl:w-max">
            <h2 className="font-semibold text-3xl mb-4 w-full xl:text-4xl">Jaki typ konta wybierasz?</h2>
            <p className="text-[#74788D] font-medium mb-16 w-full">Wybierz spośród dostępnych opcji poniżej.</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center text-center gap-6">
                <div className="relative">
                    <input className="peer absolute right-4 top-4 z-10" type="radio" defaultChecked={true} onChange={() => setForm(1)} name='account' id='client' />
                    <label className="flex items-center text-left px-7 py-5 cursor-pointer peer-checked:border-primary border-2 border-[#E4E4E9] rounded-lg gap-6" htmlFor="client">
                        <div className="h-12 w-12 p-4 bg-[#F3F5FE] rounded">
                            <img src={client} alt="" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold">Chcę dołączyć jako klient</h3>
                            <p className="text-[#74788D]">Standardowy typ konta, możliwość rezerwacji</p>
                        </div>
                    </label>
                </div>
                <div className="relative">
                    <input className="peer absolute right-4 top-4 z-10" type="radio" onChange={() => setForm(2)} name='account' id='skp' />
                    <label className="flex items-center text-left px-7 py-5 cursor-pointer peer-checked:border-primary border-2 border-[#E4E4E9] rounded-lg gap-6" htmlFor="skp">
                        <div className="h-12 w-12 p-4 bg-[#F3F5FE] rounded">
                            <img src={skp} alt="" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold">Chcę dołączyć jako SKP</h3>
                            <p className="text-[#74788D]">Typ konta stacji, możliwość zarządzania stacją</p>
                        </div>
                    </label>
                </div>
                <span className="my-3">Już posiadasz konto? <Link className="text-primary font-semibold" to='/logowanie'>Zaloguj się</Link></span>
                <FilledButton>Dalej</FilledButton>
            </form>
        </div>
    )
}