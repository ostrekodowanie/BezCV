import ReactPaginate from "react-paginate";
import { arrowRight } from "../assets/general";
import { PaginatorProps } from "../types/general";

export default function Paginator({
  page,
  totalPages,
  onPageChange,
}: PaginatorProps) {
  return (
    <ReactPaginate
      containerClassName="flex items-center gap-4 font-medium text-p mt-8 self-end"
      pageCount={totalPages}
      breakLabel="..."
      forcePage={page}
      previousLabel={
        <img
          width={10}
          height={18}
          className="mr-2 max-h-[1.2em] rotate-180"
          src={arrowRight}
          alt="Poprzednia"
        />
      }
      nextLabel={
        <img
          width={10}
          height={18}
          className="ml-2 max-h-[1.2em]"
          src={arrowRight}
          alt="Następna"
        />
      }
      activeClassName="text-primary"
      pageClassName="transition-colors hover:text-primary"
      onPageChange={onPageChange}
    />
  );
}
