import ReactPaginate from "react-paginate";
import { PaginatorProps } from "../types/general";
import { filtersMenuArrow } from "../assets/offers/offers";

export default function Paginator({
  page,
  totalPages,
  onPageChange,
}: PaginatorProps) {
  return (
    <ReactPaginate
      containerClassName="flex items-center gap-4 font-medium text-[#3C4663] flex-1 self-end mr-[8vw] sm:mr-8 my-8"
      pageCount={totalPages}
      forcePage={page}
      breakLabel="..."
      previousLabel={<Label direction="left" />}
      nextLabel={<Label direction="right" />}
      activeClassName="text-primary"
      pageClassName="transition-colors hover:text-primary"
      onPageChange={onPageChange}
    />
  );
}

const Label = ({ direction }: { direction: "left" | "right" }) => {
  return (
    <div className="w-8 h-8 flex items-center justify-center rounded-xl shadow-[0px_4px_22px_rgba(20,77,153,0.14)]">
      <img
        width={10}
        height={18}
        className={`max-h-[85%] ${
          direction === "left" ? "rotate-90" : "-rotate-90"
        }`}
        src={filtersMenuArrow}
        alt={direction === "left" ? "Poprzednia" : "Następna"}
      />
    </div>
  );
};
