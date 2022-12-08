import loading from '../assets/loading.svg'

export default function Loader({ className }: { className?: string }) {
    return <img className={`animate-spin w-8 ${className}`} src={loading} alt='Loading...' />
}