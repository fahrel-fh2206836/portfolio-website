"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type ExperienceMediaItem = {
    type: "image";
    src: string;
    alt: string;
    cover: boolean;
};

type ExperienceCardProps = {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    logo: string;
    media?: ExperienceMediaItem[];
    highlights: string[];
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
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const hasMedia = media && media.length > 0;

    const goTo = (newIndex: number, direction: "left" | "right") => {
        if (isAnimating || newIndex === currentIndex) return;
        setSlideDirection(direction);
        setPrevIndex(currentIndex);
        setCurrentIndex(newIndex);
        setIsAnimating(true);
        setTimeout(() => {
            setPrevIndex(null);
            setIsAnimating(false);
        }, 350);
    };

    const next = () => {
        if (!hasMedia) return;
        goTo((currentIndex + 1) % media.length, "left");
    };

    const prev = () => {
        if (!hasMedia) return;
        goTo((currentIndex - 1 + media.length) % media.length, "right");
    };

    const goToIndex = (index: number) => {
        if (index === currentIndex || isAnimating) return;
        goTo(index, index > currentIndex ? "left" : "right");
    };

    useEffect(() => {
        if (!hasMedia || media.length <= 1) return;
        const interval = setInterval(() => {
            if (!isAnimating) {
                goTo((currentIndex + 1) % media.length, "left");
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [hasMedia, media.length, currentIndex, isAnimating]);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;
        if (distance > minSwipeDistance) next();
        else if (distance < -minSwipeDistance) prev();
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Slide animation styles
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
        `}</style>
        <article className="pixel-panel bg-[var(--card)] p-4 text-[var(--card-foreground)] sm:p-5 md:p-6">
            <div className="flex flex-col gap-4">
                {/* Top header */}
                <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                    {/* Logo + Text grouped */}
                    <div className="flex items-center gap-4">
                        {logo && (
                            <div className="pixel-border-sm bg-[var(--background)] p-2">
                                <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                                    <Image
                                        src={logo}
                                        alt={`${company} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Role + Company */}
                        <div className="min-w-0 text-left">
                            <h3 className="pixel-font text-[13px] leading-6 sm:text-base md:text-lg">
                                {role}
                            </h3>

                            <p className="mt-1 pixel-font text-[9px] leading-5 text-[var(--muted)] sm:text-[10px] md:text-xs">
                                {company}
                                {location ? ` • ${location}` : ""}
                            </p>
                        </div>
                    </div>

                    {/* Spacer for grid alignment */}
                    <div className="hidden md:block" />

                    {/* Period — full width + centered on mobile, auto on sm+ */}
                    <div className="flex justify-start md:justify-end">
                        <div className="pixel-border-sm bg-[var(--accent)] px-3 py-2 text-[var(--accent-foreground)] sm:px-4 sm:py-3 w-full sm:w-auto text-center sm:text-left">
                            <span className="pixel-font text-[8px] sm:text-[9px] md:text-[10px]">
                                {period}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start">
                    {/* Left media column */}
                    {hasMedia && (
                        <div className="w-full">
                            <div
                                className="relative overflow-hidden pixel-border"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                {/* Top caption */}
                                <div className="absolute top-0 left-0 z-10 w-full border-b-2 border-black bg-black/50 px-4 py-2">
                                    <p className="text-center text-[10px] text-white sm:text-[11px] md:text-xs text-left">
                                        {media[currentIndex].alt}
                                    </p>
                                </div>

                                {/* Slide container */}
                                <div className="relative h-64 w-full overflow-hidden sm:h-72 lg:h-[420px]">
                                    {/* Exiting image */}
                                    {prevIndex !== null && (
                                        <img
                                            key={`prev-${prevIndex}`}
                                            src={media[prevIndex].src}
                                            alt={media[prevIndex].alt}
                                            className={`absolute inset-0 h-full w-full select-none ${media[prevIndex].cover ? "object-cover" : ""}`}
                                            draggable={false}
                                            style={{
                                                animation: "ec-slide-out 0.35s ease forwards",
                                                ["--ec-exit-to" as string]: exitTo,
                                            }}
                                        />
                                    )}
                                    {/* Entering image */}
                                    <img
                                        key={`curr-${currentIndex}`}
                                        src={media[currentIndex].src}
                                        alt={media[currentIndex].alt}
                                        className={`absolute inset-0 h-full w-full select-none touch-pan-y ${media[currentIndex].cover ? "object-cover" : ""}`}
                                        draggable={false}
                                        style={
                                            isAnimating
                                                ? {
                                                    animation: "ec-slide-in 0.35s ease forwards",
                                                    ["--ec-enter-from" as string]: enterFrom,
                                                }
                                                : undefined
                                        }
                                    />
                                </div>

                                {media.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={prev}
                                            aria-label="Previous image"
                                            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-[var(--card)] pixel-font text-sm shadow-[2px_2px_0px_black] transition-transform hover:scale-105"
                                        >
                                            {"<"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={next}
                                            aria-label="Next image"
                                            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-[var(--card)] pixel-font text-sm shadow-[2px_2px_0px_black] transition-transform hover:scale-105"
                                        >
                                            {">"}
                                        </button>

                                        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                                            {media.map((_, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => goToIndex(index)}
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

                        {/* Description */}
                        <div className="pixel-border-sm bg-[var(--background)] p-4">
                            <p className="text-[11px] leading-7 sm:text-[12px] md:text-[13px]">
                                {description}
                            </p>
                        </div>

                        {/* Highlights */}
                        {highlights && highlights.length > 0 && (
                            <div>
                                {/* Toggle button — only visible on mobile & tablet */}
                                <button
                                    type="button"
                                    onClick={() => setHighlightsOpen((prev) => !prev)}
                                    className="pixel-btn mb-3 flex w-full items-center justify-between bg-[var(--accent)] px-4 py-3 text-[var(--accent-foreground)] lg:hidden"
                                >
                                    <span className="pixel-font text-[8px] uppercase sm:text-[9px]">
                                        Highlights
                                    </span>
                                    <span className="pixel-font text-[10px] sm:text-[11px]">
                                        {highlightsOpen ? "▲" : "▼"}
                                    </span>
                                </button>

                                {/* Desktop: always show label */}
                                <h4 className="mb-3 hidden pixel-font text-[9px] uppercase sm:text-[10px] lg:block">
                                    Highlights
                                </h4>

                                {/* Grid: always visible on desktop, conditionally on mobile/tablet */}
                                <div className={`grid gap-3 ${highlightsOpen ? "block" : "hidden"} lg:grid`}>
                                    {highlights.map((item, index) => (
                                        <div
                                            key={index}
                                            className="pixel-border-sm bg-[var(--accent-soft)] p-3 text-[var(--section-alt-foreground)]"
                                        >
                                            <p className="text-[10px] leading-6 sm:text-[11px] md:text-[12px]">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
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