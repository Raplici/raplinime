const Group = ({ title, children }) => {
  return (
    <div className=" relative rounded-2xl p-14 mt-4 border border-Black-15 px-4 md:px-8 pb-5 md:pb-9 pt-9 md:pt-12 flex flex-col gap-5 w-full">
      {title ? (
        <label className="text-lg leading-6 absolute -top-3.5 left-4 rounded-lg bg-Red-45 px-6 py-2.5 font-bold text-Absolute-White md:text-xl md:leading-7 md:-top-5 md:left-8">
          {title}
        </label>
      ) : null}

      {children}
    </div>
  );
};

export default Group;
