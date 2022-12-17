import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { useAppDispatch, useAppSelector } from '../main'
import { addPoints } from '../reducers/login'

interface PackageProps {
    points: number,
    price: number
}

const packages: PackageProps[] = [
    {
        points: 10,
        price: 499
    },
    {
        points: 15,
        price: 699
    },
    {
        points: 20,
        price: 899
    }
]

export default function Points() {
    const [chosen, setChosen] = useState<PackageProps | null>(null)
    
    return (
        <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in]">
            {!chosen ?
                <div className="flex flex-wrap justify-center gap-6 md:grid grid-cols-3">
                    {packages.map(pack => <Package {...pack} setChosen={setChosen} key={pack.points} />)} 
                </div>
            : 
            <PayPalScriptProvider options={{ "client-id": 'AdORToXVjx2A9wjRlvRmuu93SboFo1PgQWSYQhZ3bCDm8x_KhHMDkYHDML4kYWXjFYdHAsmm08KS6XSV', currency: 'PLN'}}>
                <ChosenPackage {...chosen} setChosen={setChosen} />
            </PayPalScriptProvider>}
        </section>
    )
}

const Package = ({ points, price, setChosen }: PackageProps & { setChosen: Dispatch<SetStateAction<PackageProps | null>> }) => {
    return (
        <div className="flex flex-col gap-4 rounded items-center p-6 shadow">
            <h2>{points} kontaktów</h2>
            <h3 className="font-bold text-3xl">{price} zł</h3>
            <button onClick={() => setChosen({ points, price })} className='bg-primary transition-colors max-w-max font-medium hover:bg-darkPrimary text-white rounded flex items-center py-2 px-6'>Wybierz pakiet</button>
        </div>
    )
}

const ChosenPackage = ({ points, price, setChosen }: PackageProps & { setChosen: Dispatch<SetStateAction<PackageProps | null>> }) => {
    const { id } = useAppSelector(state => state.login.data)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(0)

    const handleSuccess = async (points: number) => {
        setLoading(true)
        const resp = await axios.post('/api/points/purchase', JSON.stringify({ employer: id, amount: points, price }), { headers: { 'Content-Type': 'application/json'} })
        setLoading(false)
        setStatus(resp.status)
        if(status === 201) dispatch(addPoints(points))
    }

    if(loading) return <div className='h-full w-full flex items-center justify-center'>
        <span className='flex items-center gap-4'>Przetwarzanie płatności <Loader /></span>
    </div>

    if(status) return (
        <div className='h-full w-full flex items-center justify-center'>
            {status === 201 ? <h1 className='text-3xl'>Dziękujemy za zakup!</h1> : <span className='text-red'>Wystąpił błąd. Skontaktuj się z obsługą.</span>}
        </div>
    )

    return (
        <div className="flex flex-col gap-4 rounded items-center p-6 shadow">
            <h2>{points} kontaktów</h2>
            <h3 className="font-bold text-3xl">{price} zł</h3>
            <button onClick={() => setChosen(null)}>Cofnij</button>
            <PayPalButtons 
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: price.toString()
                                }
                            }
                        ]
                    })
                }}
                onApprove={(data, actions) => {
                    //@ts-ignore
                    return actions.order.capture().then(() => handleSuccess(points))
                }}
            />
        </div>
    )
}