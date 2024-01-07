import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";

const Pagination = ({ page, lastPage, setPage }) => {
  const scrollTop = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
    scrollTop();
  };

  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
    scrollTop();
  };

  const handleLastPage = () => {
    setPage(lastPage);
    scrollTop();
  };

  const handleFirstPage = () => {
    setPage(1);
    scrollTop();
  };

  return (
    <div className="flex justify-center py-7 font-semibold text-lg text-color-primary">
      <div className="grid grid-cols-3 gap-3 items-center">
        {page <= 1 ? null : (
          <div className="flex gap-3">
            <button
              onClick={handleFirstPage}
              className="rounded-lg p-3 bg-Black-10 hover:bg-Black-15"
            >
              <CaretDoubleLeft size={20} weight="duotone" />
            </button>

            <button
              onClick={handlePrevPage}
              className="rounded-lg p-3 bg-Black-10 hover:bg-Black-15"
            >
              <CaretLeft size={20} weight="duotone" />
            </button>
          </div>
        )}

        <p
          className={`${
            page <= 1 || page >= lastPage ? "col-start-2" : ""
          } text-center`}
        >
          {page} of {lastPage}
        </p>

        {page >= lastPage ? null : (
          <div className="flex gap-3">
            <button
              onClick={handleNextPage}
              className="rounded-lg p-3 bg-Black-10 hover:bg-Black-15"
            >
              <CaretRight size={20} weight="duotone" />
            </button>

            <button
              onClick={handleLastPage}
              className="rounded-lg p-3 bg-Black-10 hover:bg-Black-15"
            >
              <CaretDoubleRight size={20} weight="duotone" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
