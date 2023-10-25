const Pagination = ({ page, lastPage, setPage }) => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
    scrollTop();
  };
  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
    scrollTop();
  };

  return (
    <div className="flex justify-center items-centerpx-2 py-4 gap-4 text-color-primary text-xl">
      {page <= 1 ? null : (
        <button
          onClick={handlePrevPage}
          className=" transition-all hover:text-color-accent"
        >
          PREV
        </button>
      )}
      <p>
        {page} of {lastPage}
      </p>
      {page >= lastPage ? null : (
        <button
          onClick={handleNextPage}
          className="transition-all hover:text-color-accent"
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Pagination;
