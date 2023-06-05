import { NonPercentageAbilitiesCandidateProps } from "../../../constants/candidate";
import CandidatePurchased from "./Candidate";

const Purchased = ({
  purchased,
  loading,
}: {
  purchased: NonPercentageAbilitiesCandidateProps[];
  loading: boolean;
}) => {
  return (
    <div
      className="px-[8vw] sm:px-6 py-10 shadow-primaryBig flex flex-col sm:rounded-3xl col-[3/4] row-[1/4]"
      id="pc"
    >
      <h2 className="font-medium text-xl ml-6 mb-4">Zakupione kontakty</h2>
      <div className="flex flex-col">
        {loading ? (
          <div className="flex flex-col gap-6 mt-4 mx-4">
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
          </div>
        ) : purchased.length > 0 ? (
          purchased.map((cand) => (
            <CandidatePurchased {...cand} key={cand.id} />
          ))
        ) : (
          <h2 className="mx-auto mt-8">Brak zakupionych kontaktów!</h2>
        )}
      </div>
    </div>
  );
};

export default Purchased;
