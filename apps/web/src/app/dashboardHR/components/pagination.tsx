'use client'
import ReactPaginate from "react-paginate";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

interface PaginationProps {
    total: number;
    take: number;
    onPageChange: ({ selected }: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, take, onPageChange }) => {
    return (
        <ReactPaginate
            breakLabel={<span>...</span>}
            nextLabel={<FaAngleRight />}
            previousLabel={<FaAngleLeft />}
            pageCount={total}
            containerClassName="flex gap-5 w-fit"
            pageLinkClassName="px-4 py-2 rounded-lg text-neutral-600"
            activeLinkClassName="text-black bg-black"
            onPageChange={onPageChange}
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination