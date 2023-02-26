import { professionColorMap } from "../../constants/professionColorMap"
import { RoleType } from "../../constants/workForm"

type CircleChartProps = {
    profession: RoleType,
    percentage: number
}

const professionTitle = (profession: RoleType): string => {
    switch(profession) {
        case 'sales':
            return 'sprzedażowe'
        case 'office_administration':
            return 'administracyjne'
        case 'customer_service':
            return 'obsługi klienta'
    }
}

export default function CircleChart({ profession, percentage }: CircleChartProps) {
    const color = professionColorMap[profession]
    const title = professionTitle(profession)
    return (
        <div className="flex justify-center items-center mx-auto relative rounded-full bg-[#F8F9FB] h-[340px] w-[340px]">
            <div className="rounded-full h-[280px] w-[280px] bg-white" />
            <div className="absolute top-[22%] bottom-[18%] right-16 left-16 flex flex-col items-center gap-4">
                <h3 className="flex flex-col items-center relative z-10">
                    <small className="font-medium text-[.75rem]">Umiejętności</small>
                    <span className="text-lg font-bold">{title}</span>
                </h3>
                <strong style={{ color }} className='text-[1.75rem] font-black relative z-10'>{'>'}{percentage}%</strong>
                <div className="absolute inset-0 bg-[#F8F9FB] rounded-full flex flex-col items-center text-center justify-end py-6">
                    <div className="bg-white absolute top-0 left-0 right-0 bottom-[40%]" />
                    <p className="font-medium w-full max-w-[2in] text-[.8rem]">większe niż <strong>70% ankietowanych</strong></p>
                </div>
            </div>
            <svg className="absolute left-0 top-0" xmlns="https://www.w3.org/2000/svg" version="1.1" width={340} height={340}>
                <defs>
                    <linearGradient>
                        <stop></stop>
                        <stop></stop>
                    </linearGradient>
                </defs>
                <circle 
                    className="circle-chart" 
                    cx={170} cy={170} r={155} 
                    strokeWidth={30} 
                    stroke={color}
                    strokeDasharray={1200}
                    strokeDashoffset={400} 
                    fill='none'
                />
            </svg>
        </div>
    )
}