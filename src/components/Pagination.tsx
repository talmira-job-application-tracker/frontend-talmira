"use client"

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
     return (
    <div className="flex gap-2 mt-6 items-center">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-3 py-1 text-white">
        {page} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;