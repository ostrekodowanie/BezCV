import { Link } from "react-router-dom"
import { useResolvedPath, useMatch, useLocation } from 'react-router'
import { useState } from 'react'
import { useAppSelector } from "../main"

export default function Header() {
    const location = useLocation()
    let path = location.pathname
    if(path?.includes('rejestracja') || path?.includes('logowanie')) return <></>
    return (
        <header className="flex items-center shadow-[0px_0px_102px_rgba(15,50,235,0.08)] justify-between h-[5rem] md:h-[6rem] padding fixed left-0 right-0 z-30 top-0 bg-white">
            <Logo />
            <Nav />
        </header>
    )
}

const Logo = () => <Link to='/'>E-Diagnosta</Link>

const lineStyle = 'h-[3px] w-full bg-primary transition rounded-xl'

const Nav = () => {
    const [active, setActive] = useState(false)
    const auth = useAppSelector(state => state.login)
    const { logged } = auth
    const { first_name } = auth.data

    return (
        <>
            <div className={`flex flex-col md:flex-row justify-center items-center bg-white gap-4 text-sm font-medium absolute top-0 md:relative left-full transition-transform ${active && '-translate-x-full'} md:left-auto h-screen md:h-full w-screen md:w-max`}>
                <CustomLink to='/'>Strona Główna</CustomLink>
                <CustomLink to='/skp'>Nasze Stacje</CustomLink>
                { logged ? <Link className="font-bold text-base ml-2" to='/profil'>{first_name}</Link> : 
                <>
                    <Link className="border-[2px] mt-4 md:mt-0 md:ml-4 font-semibold border-primary text-primary rounded flex items-center py-2 px-6" to='/logowanie'>Zaloguj się</Link>
                    <Link className="bg-primary border-[2px] transition-colors hover:border-darkPrimary hover:bg-darkPrimary font-semibold border-primary text-white rounded flex items-center py-2 px-6" to='/rejestracja'>Załóż Konto</Link>
                </>}
            </div>
            <div onClick={() => setActive(prev => !prev)} className='burger flex flex-col relative z-50 sm:hidden h-5 w-8 justify-between cursor-pointer'>
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
    return <Link to={to} className={`${className && className} transition-colors font-semibold ${isActive ? 'text-primary' : 'hover:text-primary'}`}>{children}</Link>
}