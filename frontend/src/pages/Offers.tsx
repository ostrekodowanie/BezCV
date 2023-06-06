import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import CandidateFilter from "../components/offers/CandidateFilter";
import { CandidateProps } from "../constants/candidate";
import Candidate from "./Candidate";
import { useSearchParams } from "react-router-dom";
import CandidateRef from "../components/offers/CandidateRef";
import { RoleType } from "../constants/workForm";
import OffersLoader from "../components/offers/OffersLoader";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Paginator from "../components/Paginator";
import usePagination from "../hooks/usePagination";

export default function Offers() {
  return (
    <Routes>
      <Route path="/:id" element={<Candidate />} />
      <Route path="/" element={<CandidateList />} />
    </Routes>
  );
}

export interface FilterProps {
  professions: RoleType[];
  availability: string[];
  salary: string[];
  province: string[];
}

const CandidateList = () => {
  useDocumentTitle("Oferty | bezCV - innowacyjny portal pracy");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, page, totalPages, setPage, count, isLoading } =
    usePagination<CandidateProps>("/oferty", 15);
  const [displayPurchased, setDisplayPurchased] = useState(
    searchParams.get("show_purchased") == "False" ? false : true
  );
  const [sort, setSort] = useState(searchParams.get("order") || "");
  const initialFilter = {
    professions: searchParams.get("professions"),
    availability: searchParams.get("availability"),
    salary: searchParams.get("salary"),
    province: searchParams.get("province"),
  };
  const [filter, setFilter] = useState<FilterProps>({
    professions: (initialFilter.professions
      ? decodeURIComponent(initialFilter.professions).split(",")
      : []) as RoleType[],
    availability: initialFilter.availability
      ? decodeURIComponent(initialFilter.availability).split(",")
      : [],
    salary: initialFilter.salary
      ? decodeURIComponent(initialFilter.salary).split(",")
      : [],
    province: initialFilter.province
      ? decodeURIComponent(initialFilter.province).split(",")
      : [],
  });

  const changePage = ({ selected }: { selected: number }) => {
    setPage(selected);
    selected <= 0
      ? searchParams.delete("page")
      : searchParams.set("page", selected.toString());
    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    sort ? searchParams.set("order", sort) : searchParams.delete("order");
    !displayPurchased
      ? searchParams.set("show_purchased", "False")
      : searchParams.delete("show_purchased");
    Object.keys(filter).forEach((key) => {
      const filterKey = key as keyof FilterProps;
      filter[filterKey].length > 0
        ? searchParams.set(
            filterKey,
            encodeURIComponent(filter[filterKey].join(","))
          )
        : searchParams.delete(filterKey);
    });
    navigate({ search: searchParams.toString() });
  }, [filter, sort, displayPurchased]);

  return (
    <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[17vw] py-[1.4in] md:py-[2in] bg-white">
      <div className="flex flex-wrap gap-6 items-end justify-between mx-[8vw] sm:mx-0">
        <h1 className="font-medium text-3xl xl:text-4xl">Znajdź pracownika</h1>
        <div className="flex items-center gap-4">
          <h4>Sortuj według:</h4>
          <select
            className="bg-white font-medium max-w-[1.8in]"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Najnowsze oferty</option>
            <option value="oldest">Najstarsze oferty</option>
            <option value="salary_asc">Oczekiwania finansowe - rosnąco</option>
            <option value="salary_desc">
              Oczekiwania finansowe - malejąco
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-col lg:grid grid-cols-[1fr_4fr] mt-8 xl:my-12">
        <CandidateFilter
          displayPurchased={displayPurchased}
          setDisplayPurchased={setDisplayPurchased}
          filter={filter}
          setFilter={setFilter}
        />
        <div className="flex flex-col bg-white shadow-primaryBig sm:rounded-3xl relative flex-1 min-h-[80vh] lg:ml-8">
          {isLoading ? (
            <OffersLoader />
          ) : items.length > 0 ? (
            items.map((candidate) => (
              <CandidateRef {...candidate} key={candidate.id} />
            ))
          ) : (
            <h2 className="mx-auto mt-8">Nie odnaleziono kandytatów!</h2>
          )}
          {!isLoading && totalPages > 1 && (
            <Paginator
              page={page}
              totalPages={totalPages}
              onPageChange={changePage}
            />
          )}
        </div>
      </div>
      <div className="flex items-center w-max ml-auto mb-4">
        <h4 className="text-sm font-medium text-[rgba(23,26,35,0.5)]">
          Wyświetlono {items.length} z {count} wyników
        </h4>
      </div>
    </section>
  );
};
