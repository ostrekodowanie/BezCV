export type PaginatorProps = {
    page: number;
    totalPages: number,
    onPageChange: ({ selected }: { selected: number }) => void 
}