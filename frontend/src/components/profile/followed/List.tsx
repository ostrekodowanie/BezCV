import { CandidateProps } from "../../../constants/candidate";
import CandidateRef from "../../offers/CandidateRef";
import OffersLoader from "../../offers/OffersLoader";
import { useAppSelector } from "../../../main";
import usePagination from "../../../hooks/usePagination";
import Paginator from "../../Paginator";

const Favourites = () => {
  const { id } = useAppSelector((state) => state.login.data);
  const { isLoading, totalPages, page, setPage, items, setItems } =
    usePagination<CandidateProps>("/profile/followed");

  const changePage = ({ selected }: { selected: number }) => setPage(selected);

  const deleteFollowed = () => {
    setItems((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="flex flex-col py-10 shadow-primaryBig sm:rounded-3xl col-[1/3] row-[3/4]">
      <h2 className="font-medium text-xl ml-[calc(24px+8vw)] sm:ml-12 mb-4">
        Dodane do obserwowanych
      </h2>
      <div className="flex flex-col">
        {isLoading ? (
          <OffersLoader />
        ) : items.length > 0 ? (
          items.map((cand) => (
            <CandidateRef
              isFromFollowed={true}
              setFollowed={deleteFollowed}
              {...cand}
              is_followed={true}
            />
          ))
        ) : (
          <h2 className="mx-auto mt-8">Brak ulubionych!</h2>
        )}
        {!isLoading && totalPages > 1 && (
          <Paginator
            page={page - 1 < 0 ? 0 : page - 1}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        )}
      </div>
    </div>
  );
};

export default Favourites;
