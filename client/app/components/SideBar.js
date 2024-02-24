"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { ImHappy2 } from "react-icons/im";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MdLogout, MdPerson } from "react-icons/md";
import { FaSpinner, FaBookmark } from "react-icons/fa";

export const SideBar = () => {
  // variable to obtain the users info
  const { user, isLoading } = useUser();
  // variable to determine wither the sidebar is open
  const [nav, setNav] = useState(false);
  // variable to add a loading when the api is being fetched
  const [loading, setLoading] = useState(true);

  // toggles the navbar
  const handleNav = () => {
    setNav(!nav);
  };

  // what to do after the page render
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <div className="pt-4 p-4 text-sm font-bold">
        <Link
          href="/search"
          className="py-2 flex uppercase text-bold items-center"
          onClick={handleNav}
        >
          <FaSearch className="mr-2 flex" />
          Search
        </Link>
        <Link
          href="/popular"
          className="py-2 flex uppercase text-bold items-center"
          onClick={handleNav}
        >
          <FaArrowTrendUp className="mr-2 flex" />
          Popular
        </Link>
        <Link
          href="/recommendations"
          className="py-2 flex uppercase text-bold items-center"
          onClick={handleNav}
        >
          <ImHappy2 className="mr-2 flex" />
          Recommendations
        </Link>
        <p className="border-b border-solid border-[#2a2a2a] uppercase my-4"></p>
        {loading ? (
          <div className="flex items-center">
            <FaSpinner className="animate-spin" />
          </div>
        ) : user ? (
          <div>
            <Link
              href="/bookmarks"
              className="flex items-center py-2 uppercase"
            >
              <FaBookmark className="mr-2 flex" />
              My Bookmarks
            </Link>

            <Link
              href="/profile"
              className="flex items-center py-2 uppercase"
            >
              <MdPerson className="mr-2 flex" />
              My Profile
            </Link>

            <Link
              href="/api/auth/logout"
              className="flex items-center py-2 uppercase"
              onClick={handleNav}
            >
              <MdLogout className="mr-2 flex" />
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex uppercase font-bold text-sm">
            <Link
              href="/api/auth/login"
              className="flex items-center py-2 uppercase"
              onClick={handleNav}
            >
              <MdPerson className="mr-2 flex" />
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
