"use client";
import { useEffect, useRef, useState } from "react";
import { NavbarContainer } from "./NavbarContainer";
import TopRegisterSection from "./TopRegisterSection";

// -------------------------- Component -----------------
export default function Navbar() {
  const navbarEl = useRef<HTMLElement>(null);
  const topRegEl = useRef<HTMLElement>(null);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarEl.current && topRegEl.current) {
        const navbarHeight = navbarEl.current.getBoundingClientRect().height;
        const topRegisHeight = topRegEl.current.getBoundingClientRect().height;
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
      <TopRegisterSection ref={topRegEl} />
      <nav
        className={`fixed w-full top-0 left-0 bg-white/80
    transition-transform duration-500 ease-in-out shadow-lg backdrop-blur-md
     ${!isFixed && "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <NavbarContainer
          navLinkActiveClass="bg-blue-900"
          logoSubtitleClass="text-slate-400"
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
