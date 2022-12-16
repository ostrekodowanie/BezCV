export interface CandidateProps {
    id: number,
    first_name: string,
    last_name: string,
    abilities?: [],
    phone?: string,
    email?: string,
    slug?: string
}

export default function Candidate({ first_name }: CandidateProps) {
    return (
        <>
            <h1>{first_name}</h1>
        </>            
    )
}