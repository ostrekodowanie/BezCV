import { useEffect, useState } from "react";
import { NonPercentageAbilitiesCandidateProps } from "../../../constants/candidate";
import { useAppSelector } from "../../../main";
import CandidatePurchased from "./Candidate";

const Purchased = ({
  purchased,
}: {
  purchased: NonPercentageAbilitiesCandidateProps[];
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="px-6 py-10 shadow-primaryBig flex flex-col gap-6 rounded-3xl col-[3/4] row-[1/4]">
      <h2 className="font-medium text-xl ml-6 mb-2">Zakupione kontakty</h2>
      <div className="flex flex-col gap-2">
        {loading ? (
          <>
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
          </>
        ) : purchased.length > 0 ? (
          purchased.map((cand) => (
            <CandidatePurchased {...cand} key={cand.id} />
          ))
        ) : (
          <h2>Brak zakupionych kontaktów!</h2>
        )}
      </div>
    </div>
  );
};

export default Purchased;
