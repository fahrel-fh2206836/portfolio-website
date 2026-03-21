"use client";

import Image from "next/image";
import { useState } from "react";

type ExperienceMediaItem = {
    type: "image";
    src: string;
    alt: string;
};

type ExperienceCardProps = {
    role: string;
    company: string;
    period: string;
    location?: string;
    description: string;
    logo: string;
    media?: ExperienceMediaItem[];
};

export default function ExperienceCard({
    role,
    company,
    period,
    location,
    description,
    logo,
    media = [],
}: ExperienceCardProps) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    return (
        <article className="pixel-panel bg-[var(--card)] text-[var(--card-foreground)] p-4 sm:p-5 md:p-6">
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
                {/* Left media column */}
                <div className="relative w-full">

                    {/* IMAGE */}
                    <div className="border-4 border-black bg-black">
                        <img
                            src={media[currentIndex].src}
                            alt={media[currentIndex].alt}
                            className="h-48 w-full object-cover"
                        />
                    </div>

                    {/* LEFT ARROW */}
                    {media.length > 1 && (
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 border-2 border-black bg-[var(--card)] px-2 py-1 pixel-font text-xs hover:translate-x-[-2px]"
                        >
                            ◀
                        </button>
                    )}

                    {/* RIGHT ARROW */}
                    {media.length > 1 && (
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-black bg-[var(--card)] px-2 py-1 pixel-font text-xs hover:translate-x-[2px]"
                        >
                            ▶
                        </button>
                    )}
                    <div className="mt-2 text-center text-[10px] pixel-font">
                        {currentIndex + 1} / {media.length}
                    </div>
                </div>

                {/* Right content column */}
                <div className="min-w-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            {/* LEFT: Logo + Role + Company */}
                            <div className="flex items-start gap-4">
                                {logo && (
                                    <div className="pixel-border-sm bg-[var(--background)] p-2">
                                        <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                                            <Image
                                                src={logo}
                                                alt={`${company} logo`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h3 className="pixel-font text-[11px] leading-6 sm:text-sm md:text-base">
                                        {role}
                                    </h3>

                                    <p className="mt-2 pixel-font text-[9px] leading-5 text-[var(--muted)] sm:text-[10px]">
                                        {company}
                                        {location ? ` • ${location}` : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="self-start pixel-border-sm bg-[var(--accent)] px-3 py-2 text-[var(--accent-foreground)]">
                                <span className="pixel-font text-[8px] sm:text-[9px]">
                                    {period}
                                </span>
                            </div>
                        </div>

                        <div className="pixel-border-sm bg-[var(--background)] p-4">
                            <p className="text-[11px] leading-7 sm:text-[12px] md:text-[13px]">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}