import { useEffect } from "react"
import { BsThreeDots } from "react-icons/bs"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  scrollToTop,
  scrollToLeft,
}) => {
  useEffect(() => {
    window.scrollTo(scrollToTop, scrollToLeft)
  }, [currentPage, scrollToTop, scrollToLeft])

  if (totalPages <= 1) return null

  const start = Math.min(Math.max(1, currentPage), Math.max(1, totalPages - 2))
  const windowPages = [start, start + 1, start + 2].filter(
    (page) => page <= totalPages
  )

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-2 rounded-full border-[1px] border-black hover:bg-gray-200 disabled:opacity-50"
        aria-label="Previous Page"
      >
        <MdArrowBackIos />
      </button>

      {windowPages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-full transition-colors duration-200 border-[1px] border-black ${
            page === currentPage
              ? "bg-black border-none text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {windowPages[windowPages.length - 1] < totalPages && (
        <>
          <span className="flex justify-center items-center p-2 py-1 rounded-full w-8 h-8 border-[1px] border-black">
            <BsThreeDots />
          </span>
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 rounded-full transition-colors duration-200 border-[1px] border-black ${
              currentPage === totalPages
                ? "bg-black border-none text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border-[1px] border-black hover:bg-gray-200 disabled:opacity-50"
        aria-label="Next Page"
      >
        <MdArrowForwardIos />
      </button>
    </div>
  )
}
export default Pagination
