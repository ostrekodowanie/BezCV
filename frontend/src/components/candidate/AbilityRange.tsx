import { percentageTriangle } from "../../assets/candidate/candidate";

export interface AbilityProps {
    name: string,
    percentage: number
}

const AbilityRange = ({ name, percentage, color }: AbilityProps & { color: string }) => {
    if(!percentage || percentage < 1) return <></>
    return (
        <div className="flex flex-col gap-3">
            <h4 className='w-full max-w-[80%] font-medium text-[.8rem] flex items-center'>{name} <span style={{ backgroundImage: color }} className="ml-2 bg-clip-text text-transparent">{percentage}%</span></h4>
            <div className="bg-[#2F66F4]/20 rounded-full h-[1.4rem]">
                <div style={{ width: percentage + '%' }} className='relative bg-[#F8F9FB] rounded-full h-full'>
                    <div className="rounded-full absolute right-0 translate-x-[50%] h-6 w-6 bottom-[120%] shadow-primarySmall bg-white flex items-center justify-center">
                        <div className="bg-primary h-[35%] w-[35%] rounded-full" />
                        <img className="absolute top-[50%] left-0 w-full -z-10" src={percentageTriangle} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AbilityRange;