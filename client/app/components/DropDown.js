"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FaSpinner, FaBookmark } from "react-icons/fa";

export const DropDown = () => {
  // variable to obtain the users info
  const { user, isLoading } = useUser();
  // variable to determine wither the dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // variable to add a loading when the api is being fetched
  const [loading, setLoading] = useState(true);

  // what to do after the page render
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  // toggles the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex relative">
      {loading ? (
        <div className="flex px-4 items-center">
          <FaSpinner className="animate-spin" />
        </div>
      ) : user ? (
        <button
          onClick={toggleDropdown}
          className="flex items-center px-4 uppercase font-bold hover:bg-neutral-900"
        >
          <img
            className="rounded-md h-10 w-10 items-center flex"
            src={user.picture}
            alt={user.name}
            onError={(e) => {
              e.target.alt = user.name.slice(0, 3);
            }}
          />
        </button>
      ) : (
        <div className="flex uppercase font-bold text-sm">
          <Link
            href="/api/auth/login"
            className="flex items-center px-4 hover:text-orange-600 hover:bg-neutral-900 duration-200"
          >
            Login
          </Link>
        </div>
      )}

      {user && isDropdownOpen && (
        <div className="absolute top-[3.75rem] right-0 w-60 bg-[#171717] text-white font-bold text-sm z-10">
          <Link
            href="/bookmarks"
            className="flex items-center block px-4 py-2 uppercase hover:text-orange-600 hover:bg-neutral-800"
          >
            <FaBookmark className="mr-2 flex" />
            My Bookmarks
          </Link>

          <Link
            href="/profile"
            className="flex items-center block px-4 py-2 uppercase hover:text-orange-600 hover:bg-neutral-800"
          >
            <IoPerson className="mr-2 flex" />
            My Profile
          </Link>

          <Link
            href="/api/auth/logout"
            className="flex items-center block px-4 py-2 uppercase hover:text-orange-600 hover:bg-neutral-800"
          >
            <LuLogOut className="mr-2 flex" />
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};
