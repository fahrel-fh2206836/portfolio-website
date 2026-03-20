'use client'
import { useState, useEffect } from "react";
import { FaGithub, FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { RiArrowRightUpLine } from "react-icons/ri";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const theme = darkMode
    ? {
      page: "bg-[#1b1a17] text-[#f3e7c9]",
      nav: "bg-[#2b2a26] text-[#f3e7c9]",
      card: "bg-[#312f2a] text-[#f3e7c9]",
      accent: "bg-[#d9a441] text-black",
      accentSoft: "bg-[#6f8f7a] text-[#111111]",
      muted: "text-[#d8ccb2]",
      deco: "bg-[#2d3b52]",
      border: "#000",
      accentColor: "#d9a441"
    }
    : {
      page: "bg-[#cf7a43] text-black",
      nav: "bg-[#222222] text-white",
      card: "bg-[#f3c09a] text-black",
      accent: "bg-[#f5cf53] text-black",
      accentSoft: "bg-[#f0d8c3] text-black",
      muted: "text-[#2c2118]",
      deco: "bg-[#f5cf53]",
      border: "#000",
      accentColor: "#f5cf53"
    };

  const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.getElementById(item.toLowerCase())
      );

      let current = "about";

      sections.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme.page}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .pixel-font { font-family: 'Press Start 2P', system-ui, monospace; }
        .pixel-border { box-shadow: 6px 6px 0 #000; border: 4px solid #000; }
        .pixel-border-sm { box-shadow: 4px 4px 0 #000; border: 4px solid #000; }
        .pixel-panel { border: 4px solid #000; box-shadow: 6px 6px 0 #000; }
        .pixel-btn { border: 4px solid #000; box-shadow: 4px 4px 0 #000; transition: transform .15s ease, box-shadow .15s ease; }
        .pixel-btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #000; }
      `}</style>

      <header
        className={`sticky top-0 z-50 px-4 py-4 sm:px-6 md:px-10 backdrop-blur ${darkMode ? "bg-[#1b1a17]/80" : "bg-[#cf7a43]/80"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3 pixel-font text-[9px] sm:text-xs">
            <div className={`grid h-10 w-10 place-items-center border-4 border-black shadow-[4px_4px_0_#000] ${theme.accent}`}>
              <span>FA</span>
            </div>
            <div className="leading-tight">
              <div>Fahrel's</div>
              <div>Portfolio</div>
            </div>
          </div>

          <nav className={`hidden md:flex pixel-panel rounded-none px-4 py-3 ${theme.nav}`}>
            <ul className="flex items-center gap-8 pixel-font text-[10px]">
              {navItems.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    document
                      .getElementById(item.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`cursor-pointer transition-all ${activeSection === item.toLowerCase()
                    ? darkMode
                      ? "text-[#d9a441] border-b-2 border-[#d9a441]"
                      : "text-[#f5cf53] border-b-2 border-[#f5cf53]"
                    : "hover:opacity-80"
                    }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <button
              onClick={() => setDarkMode((v) => !v)}
              className={`pixel-btn flex items-center gap-2 px-4 py-3 pixel-font text-[10px] ${theme.accent}`}
            >
              {darkMode ? <IoSunnySharp size={14} /> : <FaMoon size={14} />}
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`pixel-btn md:hidden p-3 ${theme.accent}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IoMdClose size={18} /> : <IoMdMenu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div className={`pixel-panel mt-4 md:hidden ${theme.nav} transition-all duration-200`}>
            <div className="flex flex-col gap-4 px-4 py-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  className="pixel-font text-left text-[10px] uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setDarkMode((v) => !v)}
                className={`pixel-btn mt-2 flex items-center justify-center gap-2 px-4 py-3 pixel-font text-[10px] ${theme.accent}`}
              >
                {darkMode ? <IoSunnySharp size={14} /> : <FaMoon size={14} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-16 pt-4 text-center sm:px-6 md:px-10 md:pt-10">
        <section id="about" className="relative z-10 max-w-4xl" >
          <p className="pixel-font mb-5 text-[9px] uppercase tracking-wide sm:text-xs">
            CS Senior Student • Developer • Researcher
          </p>

          <h1 className="pixel-font text-lg leading-[1.8] sm:text-2xl md:text-4xl">
            HELLO! I AM
            <br />
            FAHREL AZKI HIDAYAT
            <br />
          </h1>

          <p className={`mx-auto mt-6 max-w-2xl leading-7 text-[9px] sm:text-[11px] md:text-[13px] lg:text-[14px] pixel-font ${theme.muted}`}>
            I am a senior Computer Science student at Qatar University with experience in building mobile and web applications. I am also an AI and Data Science enthusiast, actively expanding my skill set through research and project-based learning
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
            <a
              href="https://drive.google.com/file/d/15FXxH7wht2vacAsWYlqB3a0BlpTrZF2T/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={`pixel-btn w-full max-w-[260px] px-8 py-4 pixel-font text-[10px] sm:w-auto flex items-center justify-center gap-2 ${theme.accent}`}
            >
              View Resume
              <RiArrowRightUpLine size={20} />
            </a>
            <a
              href="https://github.com/fahrel-fh2206836"
              target="_blank"
              rel="noopener noreferrer"
              className={`pixel-btn w-full max-w-[260px] px-8 py-4 pixel-font text-[10px] sm:w-auto flex items-center justify-center gap-4 ${theme.accentSoft}`}
            >
              <FaGithub size={20} />
              Visit Github
            </a>
          </div>
        </section>

        <section id="experience" className="relative z-10 max-w-4xl">

        </section>
      </main>
    </div>
  );
}
