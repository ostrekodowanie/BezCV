import { Link } from "react-router-dom"
import { useResolvedPath, useMatch, useLocation } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import { useAppSelector } from "../main"
import { AccountContext } from "../reducers/AccountProvider"

export default function Header() {
    const [down, setDown] = useState(false)
    
    useEffect(() => {
        const cb = () => setDown(window.scrollY > 100);
        window.addEventListener("scroll", cb)
        return () => window.removeEventListener("scroll", cb)
    }, [])

    return (
        <header className={`flex items-center justify-between min-h-[5rem] padding fixed left-0 right-0 z-30 top-0 transition-all bg-white ${down ? 'shadow-primarySmall md:min-h-[5rem]' : 'md:min-h-[6rem]'}`}>
            <Logo />
            <Nav />
        </header>
    )
}

const Logo = () => <Link to='/'>BezCV</Link>

const lineStyle = 'h-[3px] w-full bg-primary transition rounded-xl'

const Nav = () => {
    const { account } = useContext(AccountContext)
    const [active, setActive] = useState(false)
    const auth = useAppSelector(state => state.login)
    const location = useLocation()
    const { logged } = auth
    const { first_name, points } = auth.data

    useEffect(() => {
        setActive(false)
    }, [location])

    return (
        <>
            <div className={`flex flex-col md:flex-row justify-center items-center bg-white gap-4 text-sm font-medium absolute top-0 md:relative left-full transition-transform ${active && '-translate-x-full'} md:left-auto h-screen md:h-full w-screen md:w-max`}>
                <CustomLink to='/'>Strona Główna</CustomLink>
                {logged && account === 'employer' && <CustomLink to='/oferty'>Oferty</CustomLink>}
                {account === 'worker' && <CustomLink to='/m'>Znajdź pracę</CustomLink>}
                <CustomLink to='/kontakt'>Kontakt</CustomLink>
                {account === 'employer' && (
                    logged ? <>
                        <Link className="font-bold text-base md:ml-2" to='/profil'>{first_name}</Link>
                        <Link className="font-bold text-base" to='/punkty'>{points} pkt.</Link>
                    </> : 
                    <>
                        <Link className="mt-4 md:mt-0 md:ml-4 font-semibold transition-colors flex items-center p-2 text-[#2F66F4] hover:text-darkPrimary" to='/logowanie'>Zaloguj się</Link>
                        <Link className="bg-primary transition-colors font-semibold border-primary text-white rounded-full flex items-center py-2 px-6" to='/rejestracja'>Zarejestruj się</Link>
                    </>
                )}
            </div>
            <div onClick={() => setActive(prev => !prev)} className='burger flex flex-col relative z-50 md:hidden h-5 w-8 justify-between cursor-pointer'>
                <div style={active ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(45deg)', maxWidth: '100%'} : { maxWidth: '60%' }} className={lineStyle}></div>
                <div style={active ? {opacity: 0} : {}} className={lineStyle}></div>
                <div style={active ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(-45deg)', maxWidth: '100%'} : { maxWidth: '60%', marginLeft: 'auto'}} className={lineStyle}></div>
            </div>
        </>
    )
}

type CustomLink = {
    children: JSX.Element | string,
    to: string,
    className?: string
}

const CustomLink = ({children, to, className}: CustomLink) => {
    const activePath = useResolvedPath(to)
    const isActive = useMatch({path: `${activePath.pathname}/*`, end: true})
    return <Link to={to} className={`${className && className} transition-colors font-semibold ${isActive ? 'text-[#2F66F4]' : 'hover:text-[#2F66F4]'}`}>{children}</Link>
}