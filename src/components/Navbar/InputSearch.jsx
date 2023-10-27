"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (e) => {
    const keyword = searchRef.current.value;

    if (!keyword) return;

    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative">
      <input
        ref={searchRef}
        placeholder="search.."
        className="w-full p-2 rounded"
        onKeyDown={handleSearch}
      />
      <button onClick={handleSearch} className="absolute top-2 end-2 text-Black-8">
        <MagnifyingGlass size={24} className="invisible md:visible" />
      </button>
    </div>
  );
};

export default InputSearch;
