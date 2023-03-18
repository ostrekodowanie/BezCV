import { CandidateProps } from "../../../constants/candidate";
import CandidateRef from "../../offers/CandidateRef";
import OffersLoader from "../../offers/OffersLoader";

const Favourites = ({
  followed,
  loading,
}: {
  followed: CandidateProps[];
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col py-10 shadow-primaryBig rounded-3xl col-[1/3] row-[3/4]">
      <h2 className="font-medium text-xl ml-[calc(24px+8vw)] sm:ml-6 mb-4">
        Dodane do obserwowanych
      </h2>
      <div className="flex flex-col gap-4">
        {loading ? (
          <OffersLoader />
        ) : followed.length > 0 ? (
          followed.map((cand) => <CandidateRef {...cand} />)
        ) : (
          <h2 className="mx-auto mt-8">Brak ulubionych!</h2>
        )}
      </div>
    </div>
  );
};

export default Favourites;
