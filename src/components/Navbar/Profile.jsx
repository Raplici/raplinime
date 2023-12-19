"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Profile = ({ imgSrc }) => {
  const dropdownRef = useRef(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const onToggleMenu = useCallback(() => {
    setDropdownVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        isDropdownVisible
      ) {
        setDropdownVisible(false);
      }

      return;
    };

    document.addEventListener("click", onClickOutside);

    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className="relative inline-block text-left text-Absolute-White">
      <Image
        src={imgSrc}
        alt=""
        width={40}
        height={40}
        onClick={onToggleMenu}
        className="aspect-square h-10 w-10 shrink-0 object-cover object-center rounded-lg cursor-pointer md:rounded-full"
      />

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-3 w-44 origin-top-right rounded-md border border-Black-15 bg-Black-10"
        >
          <div className="py-1">
            <Link
              href="/users/dashboard"
              className="block px-4 py-2 text-sm hover:bg-Black-20"
            >
              Dashboard
            </Link>
            <Link
              href="/api/auth/signout"
              className="text-Grey-60 block w-full px-4 py-2 text-left text-sm hover:text-Red-60 hover:bg-Black-20"
            >
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
