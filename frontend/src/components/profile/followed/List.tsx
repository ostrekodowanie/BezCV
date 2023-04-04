import { CandidateProps } from "../../../constants/candidate";
import CandidateRef from "../../offers/CandidateRef";
import OffersLoader from "../../offers/OffersLoader";

const Favourites = ({
  followed,
  loading,
  setFollowed,
}: {
  followed: CandidateProps[];
  loading: boolean;
  setFollowed: (userId: number) => void;
}) => {
  return (
    <div className="flex flex-col py-10 shadow-primaryBig rounded-3xl col-[1/3] row-[3/4]">
      <h2 className="font-medium text-xl ml-[calc(24px+8vw)] sm:ml-12 mb-4">
        Dodane do obserwowanych
      </h2>
      <div className="flex flex-col">
        {loading ? (
          <OffersLoader />
        ) : followed.length > 0 ? (
          followed.map((cand) => (
            <CandidateRef
              isFromFollowed={true}
              setFollowed={setFollowed}
              {...cand}
              is_followed={true}
            />
          ))
        ) : (
          <h2 className="mx-auto mt-8">Brak ulubionych!</h2>
        )}
      </div>
    </div>
  );
};

export default Favourites;
