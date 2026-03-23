"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaGithub, FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { RiArrowRightUpLine } from "react-icons/ri";
import ExperienceCard from "./components/experience_card";
import RevealOnScroll from "./components/reveal_on_scroll";
import ScrollToTop from "./components/scroll_top_btn";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(isDark ? "light" : "dark");
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      <header
        className="sticky top-0 z-50 px-4 py-4 backdrop-blur sm:px-6 md:px-10"
        style={{ backgroundColor: "var(--header-overlay)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3 pixel-font text-[9px] sm:text-xs">
            <div className="grid h-10 w-10 place-items-center border-4 border-black bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[4px_4px_0_#000]">
              <span>FA</span>
            </div>
            <div className="leading-tight">
              <div>Fahrel's</div>
              <div>Portfolio</div>
            </div>
          </div>

          <nav className="hidden rounded-none bg-[var(--nav)] px-4 py-3 text-[var(--nav-foreground)] pixel-panel md:flex">
            <ul className="flex items-center gap-8 pixel-font text-[10px]">
              {navItems.map((item) => {
                const sectionId = item.toLowerCase();
                const isActive = activeSection === sectionId;

                return (
                  <li
                    key={item}
                    onClick={() => scrollToSection(sectionId)}
                    className={`cursor-pointer transition-all ${isActive
                      ? "border-b-2 border-[var(--active-nav)] text-[var(--active-nav)]"
                      : "hover:opacity-80"
                      }`}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden md:block">
            <button
              onClick={toggleTheme}
              className="pixel-btn flex items-center gap-2 bg-[var(--accent)] px-4 py-3 text-[var(--accent-foreground)] pixel-font text-[10px]"
            >
              {mounted && isDark ? <IoSunnySharp size={14} /> : <FaMoon size={14} />}
              {mounted && isDark ? "Light" : "Dark"}
            </button>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="pixel-btn bg-[var(--accent)] p-3 text-[var(--accent-foreground)] md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <IoMdClose size={18} /> : <IoMdMenu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 px-4 sm:px-6 md:hidden">
            <div className="pixel-panel bg-[var(--nav)] text-[var(--nav-foreground)]">
              <div className="flex flex-col gap-4 px-4 py-4">
                {navItems.map((item) => {
                  const sectionId = item.toLowerCase();

                  return (
                    <button
                      key={item}
                      className="text-left text-[10px] uppercase pixel-font"
                      onClick={() => scrollToSection(sectionId)}
                    >
                      {item}
                    </button>
                  );
                })}

                <button
                  onClick={toggleTheme}
                  className="pixel-btn mt-2 flex items-center justify-center gap-2 bg-[var(--accent)] px-4 py-3 text-[var(--accent-foreground)] pixel-font text-[10px]"
                >
                  {mounted && isDark ? <IoSunnySharp size={14} /> : <FaMoon size={14} />}
                  {mounted && isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="relative flex flex-col items-center px-4 pb-16 pt-4 text-center sm:px-6 md:px-10 md:pt-10 gap-4">
        <RevealOnScroll>
          <section id="about" className="relative z-10 max-w-4xl">
            <p className="mb-5 text-[9px] uppercase tracking-wide pixel-font sm:text-xs">
              CS Senior Student • Developer • Researcher
            </p>

            <h1 className="text-lg leading-[1.8] pixel-font sm:text-2xl md:text-4xl">
              HELLO! I AM
              <br />
              FAHREL AZKI HIDAYAT
              <br />
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-[9px] leading-7 text-[var(--muted)] pixel-font sm:text-[11px] md:text-[13px] lg:text-[14px]">
              I am a senior Computer Science student at Qatar University with
              experience in building mobile and web applications. I am also an AI
              and Data Science enthusiast, actively expanding my skill set through
              research and project-based learning!
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
              <a
                href="https://drive.google.com/file/d/15FXxH7wht2vacAsWYlqB3a0BlpTrZF2T/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn flex w-full max-w-[260px] items-center justify-center gap-2 bg-[var(--accent)] px-8 py-4 text-[10px] text-[var(--accent-foreground)] pixel-font sm:w-auto"
              >
                View Resume
                <RiArrowRightUpLine size={20} />
              </a>

              <a
                href="https://github.com/fahrel-fh2206836"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn flex w-full max-w-[260px] items-center justify-center gap-4 bg-[var(--accent-soft)] px-8 py-4 text-[10px] text-[var(--accent-soft-foreground)] pixel-font sm:w-auto"
              >
                <FaGithub size={20} />
                Visit Github
              </a>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section
            id="experience"
            className="relative z-10 mt-10 w-full"
          >


            {/* BOOK CONTAINER */}
            <div className="relative mx-auto w-full max-w-7xl">

              {/* Shadow (depth effect) */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black"></div>

              {/* Main "page" */}
              <div className="relative border-4 border-black bg-[var(--section-alt)] p-6 sm:p-10">

                {/* LEFT SPINE */}
                <div className="absolute left-0 top-0 h-full w-3 bg-black"></div>

                <div className="pl-4">

                  {/* HEADER */}
                  <div className="mb-10 text-center">
                    <div>
                      <h2 className="mt-4 pixel-font text-lg sm:text-2xl md:text-3xl">
                        MY EXPERIENCE
                      </h2>
                      <p className="mx-auto mt-4 max-w-2xl text-[10px] leading-6 text-[var(--muted)] sm:text-[1em] md:text-[1em]">
                        A collection of my work experiences, internships, and research.
                      </p>
                    </div>
                  </div>

                  {/* CARDS */}
                  <div className="mx-auto flex w-full flex-col gap-8">

                    <ExperienceCard
                      role="Software Developer Intern"
                      company="Makira"
                      location="Doha, Qatar (Remote)"
                      period="Jun 2025 - Present"
                      description="Contributed to the end-to-end development of a production mobile application, from engineering the architecture and backend infrastructure to cross-platform delivery and quality assurance that aligns with the company's product requirements."
                      logo="/logos/makira_logo_white.png"
                      media={[
                        {
                          type: "image",
                          src: "/experience/makira-1.webp",
                          alt: "Makira Mobile Interface",
                          cover: true
                        },
                        {
                          type: "image",
                          src: "/experience/makira-2.jpeg",
                          alt: "Receiving Makira Internship Certificate",
                          cover: true
                        },
                      ]}
                      highlights={[
                        "Developed cross-platform Flutter application with English and Arabic localization.",
                        "Engineered secure Supabase backend with PostgreSQL, storage, authentication, and edge functions for production and development environments.",
                        "Conducted functional testing on Android and iOS platforms.",

                      ]}
                    />

                    <ExperienceCard
                      role="Summer Research Intern"
                      company="Qatar University"
                      location="Doha, Qatar"
                      period="May 2025 - June 2025"
                      description="Conducted research on motorcycle safety and rider distraction, exploring computer vision-based approaches and data-driven analysis. Contributed to dataset development, model experimentation, and overall research findings."
                      logo="/logos/Qatar_University_logo.svg.png"
                      media={[
                        {
                          type: "image",
                          src: "/experience/qusrip-1.png",
                          alt: "Research Methodology & Results",
                          cover: false
                        },
                        {
                          type: "image",
                          src: "/experience/qusrip-2.png",
                          alt: "Capturing photos in real settings for dataset curation",
                          cover: true
                        },
                        {
                          type: "image",
                          src: "/experience/qusrip-3.jpg",
                          alt: "Award Ceremony",
                          cover: true
                        },
                        {
                          type: "image",
                          src: "/experience/qusrip-4.jpg",
                          alt: "Awarded for 'Best QU SRIP Research Project in IT'",
                          cover: true
                        },

                      ]}
                      highlights={["Conducted a comprehensive literature review on motorcycle safety, mobile phone distraction, and computer vision approaches.",
                        " Built a curated dataset of 1,799 images (balanced between looking and not looking) from volunteers and public sources; applied preprocessing (resizing, cropping, augmentation).",
                        "Trained CNN models (GhostNet, MobileNet, EfficientNet) using PyTorch achieving 95% accuracy.",
                        "Awarded Best Research Project in IT – QU SRIP 2025.",
                      ]}
                    />

                    <ExperienceCard
                      role="Research Assistant"
                      company="Qatar University"
                      location="Doha, Qatar"
                      period="Oct 2025 - Present"
                      description="Continued working on completing and advancing the summer research internship project."
                      logo="/logos/Qatar_University_logo.svg.png"
                      media={[
                        {
                          type: "image",
                          src: "/experience/qura-1.png",
                          alt: "Helmet-Pose Distraction Classification App",
                          cover: false
                        },
                        {
                          type: "image",
                          src: "/experience/qura-2.png",
                          alt: "Accuracy-Latency tradeoff on CNN models",
                          cover: false
                        },
                      ]}
                      highlights={[
                        "Collected and annotated 2,000+ images for helmet detection dataset.",
                        "Quantized 11 mobile-friendly CNN models for edge-based distraction classification and trained YOLOv11n model for helmet detection achieving a mAP@50 of 0.9733.",
                        "Benchmarked models using accuracy and latency evaluations with the best CNN model (MobileNetV2-100) achieving 95.15% accuracy and 24.88 ms.",
                        "Integrated trained models into an end-to-end Flutter mobile application pipeline."
                      ]}
                    />

                    <ExperienceCard
                      role="Research Assistant"
                      company="Qatar Research Development and Innovation Council"
                      location="Doha, Qatar"
                      period="Feb 2025 - Present"
                      description="Contributing to UREP Cycle 32 road safety study: “Signaling Intent: A Study on Turn Signal Usage and Its Impact on Road Safety.”"
                      logo="/logos/qrdicouncil_logo.jpg"
                      media={[
                        {
                          type: "image",
                          src: "/experience/urep-1.jpeg",
                          alt: "Driving simulator used for user study",
                          cover: true
                        },
                      ]}
                      highlights={[
                        "Conducted a comprehensive literature review on the importance of signaling and turn signal neglect (TSN) in crash data, including an analysis of global turn signal usage patterns. Explored existing research on TSN using driving simulators, with a focus on methodologies for leveraging simulation environments in behavioral analysis studies.",
                      ]}
                    />

                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealOnScroll>
      </main>

      <aside>
        <ScrollToTop/>
      </aside>
    </div>
  );
}