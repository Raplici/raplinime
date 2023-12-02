import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const Header = ({ title, linkHref }) => {
  return (
    <div className="flex justify-between items-center text-color-primary">
      <p className=" text-Absolute-White font-bold text-base leading-6 md:text-2xl md:leading-8">
        {title}
      </p>
      {linkHref ? (
        <Link
          href={linkHref}
          className=" text-Absolute-White p-1.5 bg-Black-10 border border-Black-12 rounded-lg md:p-3"
        >
          <ArrowRight size={20} />
        </Link>
      ) : null}
    </div>
  );
};
export default Header;
