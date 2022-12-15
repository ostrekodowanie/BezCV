import axios from "axios"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../main"
import { logout } from "../reducers/login"

export default function Profile() {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.login)
    const { first_name, last_name } = auth.data
    const { refresh } = auth.tokens

    const handleLogout = async () => {
        const resp = await axios.post('/api/logout', refresh, { headers: { 'Content-Type': 'application/json' }})
        if(resp.status === 200) {
            localStorage.removeItem('user')
            dispatch(logout())
        }
    }

    return (
        <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in]">
            <h1 className="font-bold text-2xl">{first_name} {last_name}</h1>
            <div className="flex flex-wrap items-center gap-6">
                <button className="font-medium py-2 px-5 rounded transition-colors bg-red-400 text-white" onClick={handleLogout}>Wyloguj się</button>
            </div>
        </section>
    )
}