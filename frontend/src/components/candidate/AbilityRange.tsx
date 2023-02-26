import { percentageTriangle } from "../../assets/candidate/candidate";

export interface AbilityProps {
    name: string,
    percentage: number
}

const AbilityRange = ({ name, percentage }: AbilityProps) => {
    if(!percentage || percentage < 1) return <></>
    return (
        <div className="flex flex-col gap-3">
            <h4 className='w-full max-w-[80%] font-medium text-[.8rem]'>{name}</h4>
            <div className="bg-[#2F66F4]/20 rounded-full h-[1.4rem]">
                <div style={{ width: percentage + '%' }} className='relative bg-[linear-gradient(180deg,#2F66F4_-81.35%,#0D9AE9_100%)] rounded-full h-full'>
                    <div className="rounded-full absolute right-0 translate-x-[50%] h-6 w-6 bottom-[120%] shadow-primarySmall bg-white flex items-center justify-center">
                        <span className="font-medium text-primary right-[125%] -top-1 z-10 absolute">{percentage}%</span>
                        <div className="bg-primary h-[35%] w-[35%] rounded-full" />
                        <img className="absolute top-[50%] left-0 w-full -z-10" src={percentageTriangle} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AbilityRange;