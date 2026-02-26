"use client";
import { useEffect, useRef, useState } from "react";
import { NavbarContainer } from "./NavbarContainer";

// -------------------------- Component -----------------
export default function Navbar() {
  const navbarEl = useRef<HTMLElement>(null);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarEl.current) {
        const navbarHeight = navbarEl.current.getBoundingClientRect().height;
        setIsFixed(window.scrollY > navbarHeight);
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
      <nav
        className={`fixed w-full top-0 left-0 bg-black/30
    transition-transform duration-700 ease-in-out shadow-lg backdrop-blur-md z-50
     ${!isFixed && "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <NavbarContainer
          navLinkActiveClass="bg-white"
          logoSubtitleClass="text-slate-200"
          navLinksClass="text-white"
          toggleBtnClass="text-white"
        />
      </nav>
      <nav
        className={`relative bg-black/20
         z-50`}
        ref={navbarEl}
      >
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
