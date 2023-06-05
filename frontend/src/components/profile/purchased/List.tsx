import { NonPercentageAbilitiesCandidateProps } from "../../../constants/candidate";
import usePagination from "../../../hooks/usePagination";
import Paginator from "../../Paginator";
import CandidatePurchased from "./Candidate";

const Purchased = () => {
  const { isLoading, totalPages, page, setPage, items } =
    usePagination<NonPercentageAbilitiesCandidateProps>(
      "/profile/purchased",
      20
    );
  const changePage = ({ selected }: { selected: number }) => setPage(selected);
  return (
    <div
      className="px-[8vw] sm:px-6 py-10 shadow-primaryBig flex flex-col sm:rounded-3xl col-[3/4] row-[1/4]"
      id="pc"
    >
      <h2 className="font-medium text-xl ml-6 mb-4">Zakupione kontakty</h2>
      <div className="flex flex-col">
        {isLoading ? (
          <div className="flex flex-col gap-6 mt-4 mx-4">
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
            <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
          </div>
        ) : items.length > 0 ? (
          items.map((cand) => <CandidatePurchased {...cand} key={cand.id} />)
        ) : (
          <h2 className="mx-auto mt-8">Brak zakupionych kontaktów!</h2>
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

export default Purchased;
