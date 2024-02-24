"use client";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiChicken } from "react-icons/gi";
import { DropDown } from "./DropDown";
import { SideBar } from "./SideBar";

export const Header = () => {
// variable to determine wither the nav is open
  const [nav, setNav] = useState(false);

  // toggles the navbar
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="bg-[#1f1f1f] z-20 sticky text-white top-0 h-[3.75rem]">
      <div className="flex justify-between">
        <div className="h-[3.75rem] flex">
          <div
            onClick={handleNav}
            className="flex items-center text-xl cursor-pointer px-4 duration-200 hover:bg-zinc-900 duration-300 lg:hidden"
          >
            <GiHamburgerMenu />
          </div>
          <Link
            href="/"
            className="flex items-center uppercase text-orange-600 font-bold text-lg md:text-2xl px-4 hover:text-white duration-500"
          >
            Teriyaki Anime
            <GiChicken className="ml-2 flex" />
          </Link>
        </div>

        <div className="flex">
          <div className="hidden lg:flex font-bold uppercase text-sm">
          <Link
              href="/search"
              className="flex items-center px-4 hover:text-orange-600 hover:bg-neutral-900 duration-200"
            >
              Search
            </Link>
            <Link
              href="/genres"
              className="flex items-center px-4 hover:text-orange-600 hover:bg-neutral-900 duration-200"
            >
              Genres
            </Link>
            <Link
              href="/popular"
              className="flex items-center px-4 hover:text-orange-600 hover:bg-neutral-900 duration-200"
            >
              Popular
            </Link>
            <Link
              href="/recommendation"
              className="flex items-center px-4 hover:text-orange-600 hover:bg-neutral-900 duration-200"
            >
              Recommendations
            </Link>
          </div>
          <DropDown />
        </div>
        <div
          className={
            nav
              ? "fixed top-[3.75rem] left-0 w-[250px] h-screen bg-neutral-900"
              : "fixed top-0 right-[-100%] w-[250px] h-screen"
          }
        >
          <SideBar />
        </div>
      </div>
    </nav>
  );
};
