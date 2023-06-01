import { useState } from "react";
import { CandidateProps } from "../../constants/candidate";
import Paginator from "../Paginator";
import CandidateRef from "../offers/CandidateRef";
import OffersLoader from "../offers/OffersLoader";

type Props = {
  isLoading: boolean;
  candidates?: CandidateProps[];
};

export default function SuggestedCandidates({ isLoading, candidates }: Props) {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  return (
    <div className="bg-white sm:rounded-3xl flex flex-wrap py-10 shadow-primaryBig min-h-max gap-4 overflow-hidden print:hidden">
      <div className="flex flex-col w-full">
        <h2 className="font-bold text-lg ml-[8vw] sm:ml-10">
          Ci kandydaci mogą Cię zainteresować
        </h2>
        <div className="flex flex-col w-full">
          {!isLoading ? (
            candidates?.map((cand) => <CandidateRef {...cand} key={cand.id} />)
          ) : (
            <OffersLoader />
          )}
          <Paginator
            page={page - 1 < 0 ? 0 : page - 1}
            totalPages={totalPages}
            onPageChange={({ selected }) => setPage(selected)}
          />
        </div>
      </div>
    </div>
  );
}
