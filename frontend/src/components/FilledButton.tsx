export default function FilledButton({ children, className }: any) {
    return <button className={`bg-primary transition-colors text-sm max-w-max font-medium hover:bg-darkPrimary text-white rounded-3xl flex items-center py-3 px-6 ${className}`}>{children}</button>
}