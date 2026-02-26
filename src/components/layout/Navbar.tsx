"use client";
import { useEffect, useRef, useState } from "react";
import { NavbarContainer } from "./NavbarContainer";
import TopIntroduction from "./TopIntroduction";

// -------------------------- Component -----------------
export default function Navbar() {
  const navbarEl = useRef<HTMLElement>(null);
  const topIntroEl = useRef<HTMLElement>(null);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarEl.current && topIntroEl.current) {
        const navbarHeight = navbarEl.current.getBoundingClientRect().height;
        const topRegisHeight =
          topIntroEl.current.getBoundingClientRect().height;
        setIsFixed(window.scrollY > navbarHeight + topRegisHeight);
      } else {
        setIsFixed(window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -------------------------- Render -----------------
  return (
    <>
      <TopIntroduction ref={topIntroEl} />
      <nav
        className={`fixed w-full top-0 left-0 bg-white
    transition-transform duration-700 ease-in-out shadow-lg backdrop-blur-md
     ${!isFixed && "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <NavbarContainer
          navLinkActiveClass="bg-blue-900"
          logoSubtitleClass="text-slate-500"
          navLinksClass="text-blue-950"
          toggleBtnClass="text-blue-900"
        />
      </nav>
      <nav className={`bg-slate-400`} ref={navbarEl}>
        <NavbarContainer
          logoSubtitleClass="text-slate-200"
          navLinksClass="text-white"
          toggleBtnClass="text-white"
          navLinkActiveClass="bg-white"
        />
      </nav>
    </>
  );
}
