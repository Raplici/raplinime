const Group = ({ title, children }) => {
  return (
    <div>
      {title ? (
        <div className="w-full relative rounded-2xl mt-4 border border-Black-15 px-4 md:px-8 pb-4 md:py-9 pt-9 flex flex-col gap-4 md:gap-5">
          <label className="text-base leading-6 absolute -top-3.5 left-4 rounded-lg bg-Red-45 px-4 py-2 md:px-6 md:py-2.5 font-bold text-Absolute-White md:text-xl md:leading-7 md:-top-5 md:left-8">
            {title}
          </label>
          {children}
        </div>
      ) : (
        <div className="w-full relative rounded-2xl mt-4 border border-Black-15 px-4 md:p-8 pb-4 pt-4 flex flex-col gap-4 md:gap-5">
          {children}
        </div>
      )}
    </div>
  );
};

export default Group;
