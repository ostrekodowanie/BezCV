import { Link } from "react-router-dom";
import { arrow, location, rating } from "../../assets/skp";
import { StationProps } from "../../pages/SKP";

export default function StationRef(props: StationProps) {
    return (
        <div className="flex flex-col gap-6 rounded p-6 border-[#E4E4E9] border-[1px]">
            <div className="flex items-center gap-5">
                <img className="rounded h-16 w-16 object-contain" src={`/images/skp/${props.image.split('/').pop()}`} alt="" />
                <div className="h-full flex flex-col justify-between">
                    <h3 className="font-bold">{props.name}</h3>
                    <h4 className="text-[#74788D] font-medium text-sm">{props.rating_count} opinii</h4>
                    <h4 className="flex items-center font-semibold text-lg"><img className="max-h-[1em] mr-2" src={rating} alt="" />{props.avg_rating}</h4>
                </div>
            </div>
            <p className="text-[#74788D] text-sm">{props.desc}</p>
            <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center"><img className="max-h-[1.3em] mr-[0.6rem]" src={location} alt='' />{props.city}</h4>
                <h4 className="font-semibold">10 - 18</h4>
                <Link to={`/skp/${props.slug}`} className="text-primary font-semibold flex items-center">Wyświetl <img className="max-h-[0.8em] ml-2" src={arrow} alt="->" /></Link>
            </div>
        </div>
    )
}