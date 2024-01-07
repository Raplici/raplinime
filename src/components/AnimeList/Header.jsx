import Link from "next/link";
import { Play } from "@phosphor-icons/react/dist/ssr";

const Header = ({ title, link }) => {
  return (
    <div className="flex justify-between items-center text-color-primary mb-3 md:h-12">
      <div className="flex items-center gap-3">
        <div className="text-Red-60">
          <Play size={20} weight="fill" />
        </div>

        <p className="text-Absolute-White font-bold text-xl leading-6 md:text-2xl md:leading-8">
          {title}
        </p>
      </div>

      {link && (
        <Link
          href={link}
          className="group py-1 px-3 rounded-3xl border-2 border-Black-12 text-Absolute-White transition-colors hover:bg-Black-15 hover:border-Black-15 "
        >
          <p className="group-hover:text-Absolute-White text-sm text-Grey-60">
            see more
          </p>
        </Link>
      )}
    </div>
  );
};
export default Header;
