import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function usePagination<T>(route: string, size?: number) {
  const [searchParams] = useSearchParams();
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "0"));
  const { search } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    axios
      .get(`/api${route}${search}`)
      .then((res) => {
        setItems(res.data.results);
        setTotalPages(Math.floor(res.data.count / (size || 10)) + 1);
        setCount(res.data.count);
      })
      .finally(() => setIsLoading(false));
  }, [search]);

  return {
    isLoading,
    items,
    setItems,
    totalPages,
    page,
    setPage,
    count,
  };
}
