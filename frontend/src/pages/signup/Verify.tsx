import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import { verified } from "../../assets/signup"
import FilledButton from "../../components/FilledButton"
import Loader from "../../components/Loader"

export default function Verify() {
    const [status, setStatus] = useState({
        ok: false,
        message: ''
    })
    const location = useLocation()
    useEffect(() => {
        const token = location.search.split("=").pop()
        try {
            axios.get(`/api/rejestracja/verify?token=${token}`)
                .then(() => setStatus({...status, ok: true}))
        }
        catch(err: any) {
            setStatus({
                ok: false,
                message: err.response
            })
        }
    }, [])
    return (
        <div className="flex flex-col gap-4 text-center items-center xl:items-start xl:w-max">
            {status.ok ? <>
                <img className="max-w-full sm:max-w-[1in]" src={verified} alt="" />
                <h1 className="font-semibold text-3xl md:text-4xl">Konto założone, gratulacje!</h1>
                <p className="bg-[#74788D]">Możesz teraz w pełni korzystać z naszego serwisu</p>
                <Link to='/logowanie'><FilledButton>Ok, zaczynajmy!</FilledButton></Link>
            </> : <Loader />}
        </div>
    )
}