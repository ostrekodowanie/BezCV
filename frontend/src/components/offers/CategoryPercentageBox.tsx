import { OffersCategoryPercantageBox } from "../../constants/candidate"

const CategoryPercantageBox = ({ text, percentage }: OffersCategoryPercantageBox & { percentage: number }) => {
    return (
        <div className="flex items-center gap-2 w-max rounded-full py-2 px-4 bg-[#EBF0FE]">
            <h4 className="text-primary text-[.75rem] font-medium">{`Umiejętności ${text} ${percentage}%`}</h4>
        </div>
    )
}

export default CategoryPercantageBox