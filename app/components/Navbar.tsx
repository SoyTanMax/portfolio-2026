import { NavLink, useLocation } from "@remix-run/react";
import Logo from "./Logo";
import XMarkIcon from "~/icons/XMarkIcon";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "~/icons/MenuIcon";

export default function Navbar({ links }: Props){
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Mobile menu: focus the close button when it opens, close it with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav className="absolute top-0 left-0 z-10 w-full flex justify-between items-center px-[24px] py-[24px] sm:px-[64px] md:px-[96px] bg-transparent">
      <div className="flex items-center">
        <NavLink to="/" className="text-white flex gap-4 items-center">
            <Logo />
            <div>
                <p className="font-display font-semibold text-xl leading-none">
                    Max López
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/75">
                    Design Engineer
                </p>
            </div>
        </NavLink>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        {links.map((link) =>
          // External links are plain anchors: NavLink drops rel on absolute URLs.
          /^(https?:|mailto:)/.test(link.to) ? (
            <a
              key={link.to}
              href={link.to}
              {...(link.to.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              className="text-slate-400 hover:text-white transition duration-200"
            >
              {link.label}
            </a>
          ) : (
            <NavLink
              key={link.to}
              to={link.to}
              className={`hover:text-white transition duration-200 ${
                location.pathname === link.to
                  ? "text-white font-bold border-b-2 border-purple-500"
                  : "text-slate-400"
              }`}
            >
              {link.label}
            </NavLink>
          )
        )}
      </div>
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        className="flex md:hidden"
      >
        <MenuIcon width={32} color={"white"} />
      </button>
      {/* Clicking the dimmed area outside the panel closes the menu. */}
      <div
        className={`${menuOpen ? "w-full" : "w-0"} flex md:hidden min-h-screen bg-black/50 absolute top-0 right-0 overflow-hidden`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          id="mobile-menu"
          onClick={(e) => e.stopPropagation()}
          className={`${menuOpen ? "w-64" : "w-0"} ease-out duration-300 h-full bg-white fixed top-0 right-0 flex flex-col rounded-l-lg`}
        >
          {menuOpen && (
            <>
              <button ref={closeRef} type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="mt-8 mr-[24px] self-end">
                <XMarkIcon width={32} />
              </button>
              <div className="flex flex-col items-center gap-8 mt-12">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.to}
                    onClick={() => setMenuOpen(false)}
                    {...(link.to.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

type Props ={
    links: { id: number, to: string; label: string }[]
}
