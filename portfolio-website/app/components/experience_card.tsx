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
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const hasMedia = media && media.length > 0;

    const next = () => {
        if (!hasMedia) return;
        setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    const prev = () => {
        if (!hasMedia) return;
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    useEffect(() => {
        if (!hasMedia || media.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % media.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [hasMedia, media.length]);

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

        if (distance > minSwipeDistance) {
            next();
        } else if (distance < -minSwipeDistance) {
            prev();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
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

                    {/* Period */}
                    <div className="flex justify-start md:justify-end">
                        <div className="pixel-border-sm bg-[var(--accent)] px-3 py-2 text-[var(--accent-foreground)] sm:px-4 sm:py-3">
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

                                <img
                                    key={currentIndex}
                                    src={media[currentIndex].src}
                                    alt={media[currentIndex].alt}
                                    className={`h-64 w-full select-none ${media[currentIndex].cover === true ? "object-cover" : ""} touch-pan-y sm:h-72 lg:h-[420px]`}
                                    draggable={false}
                                />

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
                                                    onClick={() => setCurrentIndex(index)}
                                                    aria-label={`Go to image ${index + 1}`}
                                                    className={`h-3 w-3 border-2 border-black ${index === currentIndex ? "bg-[var(--card)]" : "bg-white/70"
                                                        }`}
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
                                <h4 className="mb-3 pixel-font text-[9px] uppercase sm:text-[10px]">
                                    Highlights
                                </h4>

                                <div className="grid gap-3">
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
    );
}