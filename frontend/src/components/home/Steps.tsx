import Control, { Controller } from "react-control-js"
import { step1, step2, step3, step4 } from "../../assets/home"

interface StepProps {
    image: any,
    subtitle: string,
    title: string,
    desc: string
}

const steps = [
    {
        image: step1,
        subtitle: 'Wyszukaj',
        title: 'online',
        desc: 'Wyszukaj swoją stację po preferowanych filtrach, szybko i przejrzyście. Wybierz datę i godzinę z kalendarza'
    },
    {
        image: step2,
        subtitle: 'Wypełnij',
        title: 'dane',
        desc: 'Bez zbędnych formalności. Wskaż niezbędne dane, dokonaj płatności i ciesz się gwarantowanym przeglądem.'
    },
    {
        image: step3,
        subtitle: 'Przegląd',
        title: 'umówiony',
        desc: 'To my zadbamy o Ciebie i Twój pojazd. Otrzymasz wiadomość SMS przypominającą o przeglądzie 24h wcześniej oraz pełne dane wybranej stacji.'
    },
    {
        image: step4,
        subtitle: 'Kontakt',
        title: 'zapewniony',
        desc: 'Koniec z pilnowaniem daty kolejnego przeglądu. Od nas otrzymasz wiadomość przypominającą na 7 dni przed datą kolejnego przeglądu technicznego.'
    },
]

export default function Steps() {
    return (
        <section className="padding py-[0.8in] md:py-[1.2in]">
            <div className="flex flex-col gap-8">
                <h2 className="flex flex-col gap-2">
                    <span className="text-primary font-semibold">Przegląd twojego pojazdu</span>
                    <span className="font-bold text-4xl">w 4 prostych krokach?</span>
                </h2>
                <Controller className="flex flex-col sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-4" ease='ease-out' onScroll={true} stagger={50} opacity={1}>
                    {steps.map(step => <Control element={<Step {...step} key={step.subtitle} />} />)}
                </Controller>
            </div>
        </section>
    )
}

const Step = (props: StepProps) => {
    return (
        <div className="flex flex-col h-full rounded-t bg-white border-b-4 border-primary gap-4 py-10 px-6 shadow-[0px_0px_93px_rgba(15,50,235,0.09);]">
            <img className="h-[5rem] mb-3 mr-auto" src={props.image} alt={props.subtitle + props.title} />
            <h3 className="flex flex-col">
                <span className="font-semibold">{props.subtitle}</span>
                <span className="text-primary font-bold text-2xl">{props.title}</span>
            </h3>
            <p className="font-medium text-sm leading-relaxed text-[#5C5F6E]">{props.desc}</p>
        </div>
    )
}