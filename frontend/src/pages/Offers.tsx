import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import CandidateFilter from "../components/offers/CandidateFilter";
import { CandidateProps } from "../constants/candidate";
import Candidate from "./Candidate";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../main";
import InfiniteScroll from "react-infinite-scroll-component";
import CandidateRef from "../components/offers/CandidateRef";
import { RoleType } from "../constants/workForm";

export default function Offers() {
  return (
    <Routes>
      <Route path="/:id" element={<Candidate />} />
      <Route path="/" element={<CandidateList />} />
    </Routes>
  );
}

export interface FilterProps {
  // abilities: string[],
  professions: RoleType[];
  availability: string[];
  salary: string[];
}

const CandidateList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstRender = useRef(true);
  const auth = useAppSelector((state) => state.login);
  const { access } = auth.tokens;
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [candidates, setCandidates] = useState<CandidateProps[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<FilterProps>({
    // abilities: searchParams.get('a')?.split(',') || [],
    professions:
      (searchParams.get("professions")?.split(",") as RoleType[]) || [],
    availability: searchParams.get("availability")?.split(",") || [],
    salary: searchParams.get("salary")?.split(",") || [],
  });
  const [sort, setSort] = useState("");

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    let url = "/oferty";
    let searchArr = [];
    if (filter.availability.length > 0 || filter.professions.length > 0) {
      searchArr.push(
        filter.availability.length > 0 &&
          "availability=" + filter.availability.map((av) => av).join(","),
        filter.professions.length > 0 &&
          "professions=" + filter.professions.map((role) => role).join(",")
      );
    }
    if (sort) searchArr.push("sort_by=" + sort);
    url =
      searchArr.length > 0
        ? `/oferty?${searchArr.filter((item) => item).join("&")}`
        : "/oferty";
    if (firstRender.current) url = location.pathname + location.search;
    firstRender.current = false;
    return navigate(url);
  }, [filter, sort]);

  useEffect(() => {
    setLoading(true);
    let isCancelled = false;
    let url = "/api" + location.pathname + location.search;
    axios
      .get(url, { headers: { Authorization: "Bearer " + access } })
      .then((res) => res.data)
      .then((data) => {
        setCount(data.count);
        return data;
      })
      .then((data) => !isCancelled && setCandidates(data.results))
      .catch(() => setHasMore(false))
      .finally(() => setLoading(false));
    return () => {
      isCancelled = true;
    };
  }, [location.search]);

  useEffect(() => {
    if (page === 1) return;
    let url =
      "/api" +
      location.pathname +
      (location.search ? location.search + "&page=" + page : "?page=" + page);
    axios
      .get(url, { headers: { Authorization: "Bearer " + access } })
      .then((res) => res.data)
      .then((data) => {
        setCount(data.count);
        return data;
      })
      .then((data) =>
        setCandidates((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        )
      )
      .catch(() => setHasMore(false));
  }, [page]);

  return (
    <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[17vw] py-[1.4in] md:py-[2in] bg-white">
      <div className="flex flex-wrap gap-6 items-end justify-between mx-[8vw] sm:mx-0">
        <h1 className="font-medium text-3xl xl:text-4xl">Znajdź pracownika</h1>
        <div className="flex items-center gap-4">
          <h4>Sortuj według:</h4>
          <select
            className="bg-white font-medium max-w-[1.8in]"
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
        <CandidateFilter setFilter={setFilter} />
        <InfiniteScroll
          className={`flex flex-col bg-white shadow-primaryBig sm:rounded-3xl relative flex-1 min-h-[80vh] lg:ml-8 px-[8vw] py-4 sm:p-4`}
          next={() => setPage((prev) => prev + 1)}
          hasMore={hasMore}
          loader={<OffersLoader />}
          dataLength={candidates.length}
        >
          {loading ? (
            <OffersLoader />
          ) : candidates.length > 0 ? (
            candidates.map((candidate) => (
              <CandidateRef {...candidate} key={candidate.id} />
            ))
          ) : (
            <h2 className="mx-auto mt-8">Nie odnaleziono kandytatów!</h2>
          )}
        </InfiniteScroll>
      </div>
      <div className="flex items-center w-max ml-auto mb-4">
        <h4 className="text-sm font-medium text-[rgba(23,26,35,0.5)]">
          Wyświetlono {candidates.length} z {count} wyników
        </h4>
      </div>
    </section>
  );
};

const OffersLoader = () => (
  <div className="m-6 flex flex-col gap-6">
    <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[1in]" />
    <div className="bg-[#f8f8f8] rounded-full min-h-[1in]" />
    <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[1in]" />
    <div className="bg-[#f8f8f8] rounded-full min-h-[1in]" />
  </div>
);
