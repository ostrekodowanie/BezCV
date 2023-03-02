import { OffersCategoryPercantageBox } from "../../constants/candidate"
import { professionColorMap } from "../../constants/professionColorMap"
import { RoleType } from "../../constants/workForm"

const CategoryPercantageBox = ({ name, text, percentage, profession }: OffersCategoryPercantageBox & { percentage: number, profession?: RoleType }) => {
    const isActive = profession === name
    const { gradient } = profession ? professionColorMap[profession] : { gradient: '' }
    return (
        <div className={`${isActive ? 'order-first' : 'order-last'} flex items-center gap-2 w-max rounded-full py-2 px-4 bg-[#F5F5F5]`}>
            <h4 className="text-[.75rem] font-medium">Umiejętności {isActive ? <span style={{ backgroundImage: gradient }} className='bg-clip-text text-transparent'>{`${text} ${percentage}%`}</span> : `${text} ${percentage}%`}</h4>
        </div>
    )
}

export default CategoryPercantageBox