const Group = ({ title, children }) => {
  return (
    <div className="w-full relative rounded-2xl p-14 mt-4 border border-Black-15 px-4 md:px-8 pb-5 md:pb-9 pt-9 md:pt-12 flex flex-col gap-4 md:gap-5">
      {title ? (
        <label className="text-base leading-6 absolute -top-3.5 left-4 rounded-lg bg-Red-45 px-4 py-2 md:px-6 md:py-2.5 font-bold text-Absolute-White md:text-xl md:leading-7 md:-top-5 md:left-8">
          {title}
        </label>
      ) : null}

      {children}
    </div>
  );
};

export default Group;
