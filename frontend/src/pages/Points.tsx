import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { useAppSelector } from '../main'

export default function Points() {
    const { id } = useAppSelector(state => state.login.data)
    const handleSuccess = (points: number) => {
        axios.post('/api/points/add', JSON.stringify({ user_id: id, amount: points }), { headers: { 'Content-Type': 'application/json'} })
            .then(res => res.data)
            .then(data => console.log(data))
    }
    
    return (
        <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in]">
            <div className="flex flex-wrap justify-center gap-6 md:grid grid-cols-3">
                <PayPalScriptProvider options={{ "client-id": 'AdORToXVjx2A9wjRlvRmuu93SboFo1PgQWSYQhZ3bCDm8x_KhHMDkYHDML4kYWXjFYdHAsmm08KS6XSV', currency: 'PLN'}}>
                    <div className="flex flex-col gap-4 rounded items-center p-6 shadow">
                        <h2>10 kontaktów</h2>
                        <h3 className="font-bold text-3xl">499 zł</h3>
                        <PayPalButtons 
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: '499'
                                            }
                                        }
                                    ]
                                })
                            }}
                            onApprove={(data, actions) => {
                                // @ts-ignore
                                return actions.order.capture().then(() => handleSuccess(10))
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-4 rounded items-center p-6 shadow">
                        <h2>15 kontaktów</h2>
                        <h3 className="font-bold text-3xl">699 zł</h3>
                        <PayPalButtons 
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: '699'
                                            }
                                        }
                                    ]
                                })
                            }}
                            onApprove={(data, actions) => {
                                // @ts-ignore
                                return actions.order.capture().then(() => handleSuccess(15))
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-4 rounded items-center p-6 shadow">
                        <h2>20 kontaktów</h2>
                        <h3 className="font-bold text-3xl">899 zł</h3>
                        <PayPalButtons 
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: '899'
                                            }
                                        }
                                    ]
                                })
                            }}
                            onApprove={(data, actions) => {
                                // @ts-ignore
                                return actions.order.capture().then(() => handleSuccess(20))
                            }}
                        />
                    </div>
                </PayPalScriptProvider>
            </div>
        </section>
    )
}