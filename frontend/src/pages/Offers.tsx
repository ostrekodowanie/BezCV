import { useEffect, useRef, useState } from "react";
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
  provinces: string[];
}

const CandidateList = () => {
  useDocumentTitle("Znajdź pracownika | bezCV - innowacyjny portal pracy");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, page, totalPages, setPage, isLoading } =
    usePagination<CandidateProps>("/oferty");
  const isFirstRender = useRef(true);
  const [displayPurchased, setDisplayPurchased] = useState(
    searchParams.get("show_purchased") == "False" ? false : true
  );
  const [sort, setSort] = useState(searchParams.get("order") || "");
  const initialFilter = {
    professions: searchParams.get("professions"),
    availability: searchParams.get("availability"),
    salary: searchParams.get("salary"),
    provinces: searchParams.get("provinces"),
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
    provinces: initialFilter.provinces
      ? decodeURIComponent(initialFilter.provinces).split(",")
      : [],
  });

  const changePage = ({ selected }: { selected: number }) => {
    setPage(selected);
    selected <= 0
      ? searchParams.delete("page")
      : searchParams.set("page", (selected + 1).toString());
    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    if (!isFirstRender.current) changePage({ selected: 0 });
    isFirstRender.current = false;
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

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [items]);

  return (
    <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[16vw] py-[1.4in] md:py-[2in] bg-white">
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
          Wyświetlono wyniki od {page * 10 + 1}
          {page + 1 >= totalPages ? "" : ` do ${page * 10 + 10}`}
        </h4>
      </div>
    </section>
  );
};
