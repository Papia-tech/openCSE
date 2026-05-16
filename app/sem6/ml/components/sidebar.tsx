"use client";
import { Righteous } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { chapters } from "../constants";

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
});

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Default to open on desktop, closed on mobile
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    setOpen(isDesktop);
  }, []);

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <aside
        className={`h-[100vh] sticky top-0 bg-[#fae8d7] text-[#1B0D00] p-0 flex flex-col transition-all duration-300 ${
          open ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <h2
          className="flex items-center text-2xl font-normal pt-3 pl-3 mb-2 bg-[#cebb9c] text-[#1B0D00] pb-2 border-b-4 border-[#1B0D00]"
          style={{ fontFamily: "Rockwell, Serif, serif" }}
        >
          Chapters
        </h2>
        <ul className="flex-1 overflow-y-auto space-y-0">
          {chapters.map((ch) => {
            const active =
              pathname === `/sem6/ml/${ch.id}` ||
              (ch.subTopics?.some(
                (sub) => sub.isPage && pathname === `/sem6/ml/${sub.id}`
              ) ?? false);
            return (
              <li key={ch.id} className="flex flex-col">
                <Link
                  href={`/sem6/ml/${ch.id}`}
                  className={`block px-3 py-2 text-xl transition ${
                    active ? "bg-[#fccc7e]" : "hover:bg-[#ffdda7af]"
                  } ${righteous.className}`}
                >
                  {ch.title}
                </Link>
                {active && ch.subTopics && (
                  <ul className="ml-4 border-l-2 border-[#1B0D00]/20 pl-2 my-2 space-y-2">
                    {ch.subTopics.map((sub) => {
                      const subActive = sub.isPage && pathname === `/sem6/ml/${sub.id}`;
                      return (
                        <li key={sub.id}>
                          <Link
                            href={sub.isPage ? `/sem6/ml/${sub.id}` : `/sem6/ml/${ch.id}#${sub.id}`}
                            className={`block text-sm transition hover:font-bold ${
                              subActive ? "text-black font-bold" : "text-[#3a2a14] hover:text-black"
                            }`}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Toggle Button (always visible) */}
      <button
        onClick={() => setOpen(!open)}
        className="toggle-sidebar sticky top-[10%] left-full bg-[#ffdda7d0] h-[85vh] w-[50px] text-[#1B0D00] text-center font-semibold text-2xl border-l-4 rounded-r-2xl border-[#1B0D00] flex items-center justify-center transition-all duration-300"
        style={{ fontFamily: "Rockwell, Serif, serif" }}
      >
        <p className="leading-5">
          C<br />H<br />A<br />P<br />T<br />E<br />R<br />S
        </p>
      </button>
    </div>
  );
}
