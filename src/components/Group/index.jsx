const Group = ({ title, children }) => {
  return (
    <div className="relative rounded-2xl p-14 mt-4 border border-Black-15 flex flex-col gap-5 w-full">
      {title ? (
        <label className="absolute -top-3.5 left-4 rounded-lg bg-Red-45 px-6 py-2.5 font-semibold text-Absolute-White md:-top-5 md:left-14">
          {title}
        </label>
      ) : null}

      {children}
    </div>
  );
};

export default Group;
