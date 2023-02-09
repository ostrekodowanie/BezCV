import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { bestseller, package1, package2, package3, priceUnderline, titleUnderline } from '../assets/points/points'
import { arrowRight } from '../assets/general'
import Loader from '../components/Loader'
import { useAppDispatch, useAppSelector } from '../main'
import { addPoints } from '../reducers/login'
import Control, { Controller } from 'react-control-js'

interface PackageProps {
    image: string,
    points: number,
    price: number
}

const packages: PackageProps[] = [
    {
        image: package1,
        points: 10,
        price: 499
    },
    {
        image: package2,
        points: 15,
        price: 699
    },
    {
        image: package3,
        points: 20,
        price: 899
    }
]

export default function Points() {
    const [chosen, setChosen] = useState<PackageProps | null>(null)
    
    return (
        <section className="padding py-[1.4in] 2xl:py-[1.8in] bg-white min-h-screen">
            <h1 className='flex flex-col gap-3 mb-12'>
                <span className='text-[0.95rem]'>Doładuj swoje konto w punkty</span>
                <span className='text-3xl md:text-4xl font-medium'>i zdobądź <span className='relative'><span className='relative z-10'>pracowników!</span><img className='absolute -bottom-1 -right-3 -left-3 min-w-[115%]' src={titleUnderline} alt='' /></span></span>
            </h1>
            {!chosen ?
                <Controller stagger={50} opacity={1} ease='ease-out' delay={500} className="flex flex-wrap justify-center gap-8 xl:grid grid-cols-3">
                    {packages.map(pack => <Control className='control-package' element={<Package {...pack} setChosen={setChosen} key={pack.points} />} />)} 
                </Controller>
            : 
            <PayPalScriptProvider options={{ "client-id": 'AdORToXVjx2A9wjRlvRmuu93SboFo1PgQWSYQhZ3bCDm8x_KhHMDkYHDML4kYWXjFYdHAsmm08KS6XSV', currency: 'PLN'}}>
                <ChosenPackage {...chosen} setChosen={setChosen} />
            </PayPalScriptProvider>}
        </section>
    )
}

const Package = ({ setChosen, ...rest }: PackageProps & { setChosen: Dispatch<SetStateAction<PackageProps | null>> }) => {
    const { points, price, image } = rest
    return (
        <div className="flex flex-col self-stretch h-full justify-end gap-4 rounded-3xl relative items-center p-12 bg-white shadow-primaryBig flex-1">
            {points === 15 && <div className='absolute -top-6 rounded-t-full text-sm rounded-br-full -right-6 h-12 pl-8 pr-16 font-medium flex items-center bg-white'>
                Bestseller
                <div className='absolute h-12 w-12 right-0 p-2 flex items-center justify-center bg-secondary rounded-full'>
                    <img src={bestseller} alt="" />
                </div>    
            </div>}
            <img className='mb-4 max-w-[1.8in] max-h-[1.3in]' src={image} alt="" />
            <h3 className='font-medium relative flex flex-col items-center'>
                <span className='relative z-10'>{price} zł</span>
                <img className='absolute bottom-[2px] min-w-[120%]' src={priceUnderline} alt="" />
            </h3>
            <h2 className="font-medium text-3xl w-max">{points} kontaktów</h2>
            <ul className='list-outside list-disc marker:text-[#F9AE3D] sm:w-max mt-4 text-sm flex flex-col gap-3'>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
            <button onClick={() => setChosen(rest)} className='bg-primary font-medium transition-colors text-[.75rem] max-w-max hover:bg-darkPrimary text-white rounded-full flex items-center py-4 px-8 mt-8'>Wybierz pakiet <img className='max-h-[1em] ml-2' src={arrowRight} alt="" /></button>
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
        if(resp.status === 201) dispatch(addPoints(points))
        setLoading(false)
        setStatus(resp.status)
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