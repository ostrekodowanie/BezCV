import loader from '../assets/loader.svg'

export default function Loader({ className }: { className?: string }) {
    return <img className={`animate-spin w-8 ${className}`} src={loader} alt='Loading...' />
}