const Group = ({ title, children, className, ...rest }) => {
  const containerClassName = title
    ? "w-full relative rounded-2xl border border-Black-15 px-4 pb-4 pt-8 flex flex-col gap-4 md:p-12 md:gap-5"
    : "w-full relative rounded-2xl border border-Black-15 px-4 pb-4 pt-4 flex flex-col gap-4 md:p-12 md:gap-5";

  return (
    <div className={`${containerClassName} ${className}`} {...rest}>
      {title ? (
        <div className="text-base leading-6 absolute -top-3.5 left-4 rounded-lg bg-Red-45 px-4 py-2 md:px-6 md:py-2.5 font-bold text-Absolute-White md:text-xl md:leading-7 md:-top-5 md:left-8">
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Group;
