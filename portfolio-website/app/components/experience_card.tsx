"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

type ExperienceMediaItem = {
    type: "image";
    src: string;
    alt: string;
    cover: boolean;
};

type HighlightItem = {
    text: string;
    celebrate?: boolean;
};

type ExperienceCardProps = {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    logo: string;
    media?: ExperienceMediaItem[];
    highlights: HighlightItem[];
};

export default function ExperienceCard({
    role,
    company,
    period,
    location,
    description,
    logo,
    media = [],
    highlights = [],
}: ExperienceCardProps) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const [highlightsOpen, setHighlightsOpen] = useState(false);
    const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
    const [isAnimating, setIsAnimating] = useState(false);
    const [celebrateIndex, setCelebrateIndex] = useState<number | null>(null);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const hasMedia = media && media.length > 0;

    const triggerConfetti = () => {
        confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
        setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { x: 0.2, y: 0.5 } }), 150);
        setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { x: 0.8, y: 0.5 } }), 300);
    };

    const goTo = (newIndex: number, direction: "left" | "right") => {
        if (isAnimating || newIndex === currentIndex) return;
        setSlideDirection(direction);
        setPrevIndex(currentIndex);
        setCurrentIndex(newIndex);
        setIsAnimating(true);
        setTimeout(() => { setPrevIndex(null); setIsAnimating(false); }, 350);
    };

    const next = () => { if (!hasMedia) return; goTo((currentIndex + 1) % media.length, "left"); };
    const prev = () => { if (!hasMedia) return; goTo((currentIndex - 1 + media.length) % media.length, "right"); };
    const goToIndex = (index: number) => {
        if (index === currentIndex || isAnimating) return;
        goTo(index, index > currentIndex ? "left" : "right");
    };

    useEffect(() => {
        if (!hasMedia || media.length <= 1) return;
        const interval = setInterval(() => {
            if (!isAnimating) goTo((currentIndex + 1) % media.length, "left");
        }, 7500);
        return () => clearInterval(interval);
    }, [hasMedia, media.length, currentIndex, isAnimating]);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => { touchStartX.current = e.touches[0].clientX; touchEndX.current = null; };
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => { touchEndX.current = e.touches[0].clientX; };
    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const distance = touchStartX.current - touchEndX.current;
        if (distance > 50) next();
        else if (distance < -50) prev();
        touchStartX.current = null;
        touchEndX.current = null;
    };

    const enterFrom = slideDirection === "left" ? "100%" : "-100%";
    const exitTo = slideDirection === "left" ? "-100%" : "100%";

    return (
        <>
            <style>{`
                @keyframes ec-slide-in {
                    from { transform: translateX(var(--ec-enter-from)); }
                    to   { transform: translateX(0); }
                }
                @keyframes ec-slide-out {
                    from { transform: translateX(0); }
                    to   { transform: translateX(var(--ec-exit-to)); }
                }
                @keyframes ec-tooltip-in {
                    from { opacity: 0; transform: translateX(-50%) translateY(4px) scale(0.9); }
                    to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                }
                @keyframes ec-exclaim-bounce {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-4px); }
                }
                .celebrate-highlight {
                    transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
                    cursor: pointer;
                }
                .celebrate-highlight:hover {
                    background: var(--accent) !important;
                    transform: translate(-1px, -1px);
                    box-shadow: 6px 6px 0 #000;
                }
                .celebrate-highlight:active {
                    transform: translate(1px, 1px);
                    box-shadow: 2px 2px 0 #000;
                }
            `}</style>
            <article className="pixel-panel bg-[var(--card)] p-4 text-[var(--card-foreground)] sm:p-5 md:p-6">
                <div className="flex flex-col gap-4">
                    {/* Top header */}
                    <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                        <div className="flex items-center gap-4">
                            {logo && (
                                <div className="pixel-border-sm bg-[var(--background)] p-2">
                                    <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                                        <Image src={logo} alt={`${company} logo`} fill className="object-contain" />
                                    </div>
                                </div>
                            )}
                            <div className="min-w-0 text-left">
                                <h3 className="pixel-font text-[13px] leading-6 sm:text-base md:text-lg">{role}</h3>
                                <p className="mt-1 pixel-font text-[9px] leading-5 text-[var(--muted)] sm:text-[10px] md:text-xs">
                                    {company}{location ? ` • ${location}` : ""}
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:block" />
                        <div className="flex justify-start md:justify-end">
                            <div className="pixel-border-sm bg-[var(--accent)] px-3 py-2 text-[var(--accent-foreground)] sm:px-4 sm:py-3 w-full sm:w-auto text-center sm:text-left">
                                <span className="pixel-font text-[8px] sm:text-[9px] md:text-[10px]">{period}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start">
                        {/* Media */}
                        {hasMedia && (
                            <div className="w-full">
                                <div
                                    className="relative overflow-hidden pixel-border"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <div className="absolute top-0 left-0 z-10 w-full bg-black/50 px-4 py-2">
                                        <p className="text-[10px] text-white sm:text-[11px] md:text-xs">
                                            {media[currentIndex].alt}
                                        </p>
                                    </div>
                                    <div className="relative h-64 w-full overflow-hidden sm:h-72 lg:h-[420px]">
                                        {prevIndex !== null && (
                                            <img
                                                key={`prev-${prevIndex}`}
                                                src={media[prevIndex].src}
                                                alt={media[prevIndex].alt}
                                                className={`absolute inset-0 h-full w-full select-none ${media[prevIndex].cover ? "object-cover" : ""}`}
                                                draggable={false}
                                                style={{ animation: "ec-slide-out 0.35s ease forwards", ["--ec-exit-to" as string]: exitTo }}
                                            />
                                        )}
                                        <img
                                            key={`curr-${currentIndex}`}
                                            src={media[currentIndex].src}
                                            alt={media[currentIndex].alt}
                                            className={`absolute inset-0 h-full w-full select-none touch-pan-y ${media[currentIndex].cover ? "object-cover" : ""}`}
                                            draggable={false}
                                            style={isAnimating ? { animation: "ec-slide-in 0.35s ease forwards", ["--ec-enter-from" as string]: enterFrom } : undefined}
                                        />
                                    </div>
                                    {media.length > 1 && (
                                        <>
                                            <button type="button" onClick={prev} aria-label="Previous image"
                                                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-[var(--card)] pixel-font text-sm shadow-[2px_2px_0px_black] circular-pixel-btn">
                                                {"<"}
                                            </button>
                                            <button type="button" onClick={next} aria-label="Next image"
                                                className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-[var(--card)] pixel-font text-sm shadow-[2px_2px_0px_black] circular-pixel-btn">
                                                {">"}
                                            </button>
                                            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                                                {media.map((_, index) => (
                                                    <button key={index} type="button" onClick={() => goToIndex(index)}
                                                        aria-label={`Go to image ${index + 1}`}
                                                        className={`h-3 w-3 border-2 border-black ${index === currentIndex ? "bg-[var(--card)]" : "bg-white/70"}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Right column */}
                        <div className="min-w-0 flex flex-col gap-4">
                            <div className="pixel-border-sm bg-[var(--background)] p-4">
                                <p className="text-[11px] leading-7 sm:text-[12px] md:text-[13px]">{description}</p>
                            </div>

                            {highlights && highlights.length > 0 && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setHighlightsOpen((prev) => !prev)}
                                        className="pixel-btn mb-3 flex w-full items-center justify-between bg-[var(--accent)] px-4 py-3 text-[var(--accent-foreground)] lg:hidden"
                                    >
                                        <span className="pixel-font text-[8px] uppercase sm:text-[9px]">Highlights</span>
                                        <span className="pixel-font text-[10px] sm:text-[11px]">{highlightsOpen ? "▲" : "▼"}</span>
                                    </button>

                                    <h4 className="mb-3 hidden pixel-font text-[9px] uppercase sm:text-[10px] lg:block">Highlights</h4>

                                    <div className={`grid gap-3 ${highlightsOpen ? "block" : "hidden"} lg:grid`}>
                                        {highlights.map((item, index) =>
                                            item.celebrate ? (
                                                /* ── Award highlight ── */
                                                <div
                                                    key={index}
                                                    className="celebrate-highlight relative pixel-border-sm bg-[var(--accent-soft)] p-3 text-[var(--section-alt-foreground)]"
                                                    onMouseEnter={() => setCelebrateIndex(index)}
                                                    onMouseLeave={() => setCelebrateIndex(null)}
                                                    onClick={triggerConfetti}
                                                >
                                                    {/* Pixel exclamation mark — top-right corner */}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "-10px",
                                                            right: "-10px",
                                                            width: "20px",
                                                            height: "20px",
                                                            background: "var(--accent)",
                                                            border: "3px solid #000",
                                                            boxShadow: "2px 2px 0 #000",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontFamily: '"Press Start 2P", monospace',
                                                            fontSize: "10px",
                                                            fontWeight: "bold",
                                                            color: "#000",
                                                            animation: "ec-exclaim-bounce 1s ease-in-out infinite",
                                                            zIndex: 20,
                                                            lineHeight: 1,
                                                        }}
                                                    >
                                                        !
                                                    </div>

                                                    {/* Tooltip — floating above, slightly lower */}
                                                    {celebrateIndex === index && (
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                bottom: "calc(100% + 6px)",
                                                                left: "50%",
                                                                animation: "ec-tooltip-in 0.15s ease forwards",
                                                                zIndex: 30,
                                                                whiteSpace: "nowrap",
                                                                pointerEvents: "none",
                                                                transform: "translateX(-50%)",
                                                            }}
                                                        >
                                                            <div style={{
                                                                background: "var(--nav)",
                                                                color: "var(--nav-foreground)",
                                                                border: "3px solid #000",
                                                                boxShadow: "3px 3px 0 #000",
                                                                padding: "6px 12px",
                                                                fontFamily: '"Press Start 2P", monospace',
                                                                fontSize: "8px",
                                                                lineHeight: 1.8,
                                                            }}>
                                                                🎉 Celebrate?
                                                            </div>
                                                            <div style={{
                                                                width: 0,
                                                                height: 0,
                                                                borderLeft: "7px solid transparent",
                                                                borderRight: "7px solid transparent",
                                                                borderTop: "7px solid #000",
                                                                margin: "0 auto",
                                                            }} />
                                                        </div>
                                                    )}

                                                    <p className="text-[10px] leading-6 sm:text-[11px] md:text-[12px] flex items-center gap-2">
                                                        <span>🏆</span>
                                                        {item.text}
                                                    </p>
                                                </div>
                                            ) : (
                                                /* ── Regular highlight ── */
                                                <div
                                                    key={index}
                                                    className="pixel-border-sm bg-[var(--accent-soft)] p-3 text-[var(--section-alt-foreground)]"
                                                >
                                                    <p className="text-[10px] leading-6 sm:text-[11px] md:text-[12px]">{item.text}</p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}