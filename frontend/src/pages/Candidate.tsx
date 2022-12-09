export interface CandidateProps {
    id: number,
    name: string,
    slug?: string
}

export default function Candidate({ name }: CandidateProps) {
    return (
        <section className="padding py-[1in]">
            <h1>{name}</h1>
        </section>            
    )
}