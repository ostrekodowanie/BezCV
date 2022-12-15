export interface AbilityProps {
    id: number,
    name: string
}

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
        <section className="padding py-[1in]">
            <h1>{first_name}</h1>
        </section>            
    )
}