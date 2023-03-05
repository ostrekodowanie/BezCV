import { CandidateProps } from "../../../constants/candidate";
import CandidateRef from "../../offers/CandidateRef";

const Favourites = ({
  followed,
  loading,
}: {
  followed: CandidateProps[];
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col px-6 py-10 shadow-primaryBig rounded-3xl col-[1/3] row-[3/4]">
      <h2 className="font-medium text-xl ml-6 mb-4">Dodane do obserwowanych</h2>
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="flex flex-col gap-6 mt-4 mx-4">
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
          </div>
        ) : followed.length > 0 ? (
          followed.map((cand) => <CandidateRef {...cand} />)
        ) : (
          <h2>Brak ulubionych!</h2>
        )}
      </div>
    </div>
  );
};

export default Favourites;
