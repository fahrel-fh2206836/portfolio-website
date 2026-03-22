"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(pct);
            setVisible(scrollTop > 100);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const size = 56;
    const strokeWidth = 3;
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);

    return (
        <>
            <style>{`
                @keyframes stt-in {
                    from { opacity: 0; transform: scale(0.7) translateY(10px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes stt-out {
                    from { opacity: 1; transform: scale(1) translateY(0); }
                    to   { opacity: 0; transform: scale(0.7) translateY(10px); }
                }
                .stt-btn:hover {
                    transform: scale(1.07);
                }
                .stt-btn:active {
                    transform: scale(0.95) !important;
                }
                .stt-btn {
                    transition: transform 0.2s ease;
                }
            `}</style>

            <div
                style={{
                    position: "fixed",
                    bottom: "28px",
                    right: "28px",
                    zIndex: 9999,
                    pointerEvents: visible ? "auto" : "none",
                    animation: visible
                        ? "stt-in 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards"
                        : "stt-out 0.2s ease forwards",
                }}
            >
                <button
                    type="button"
                    onClick={handleClick}
                    aria-label="Scroll to top"
                    className="stt-btn"
                    style={{
                        position: "relative",
                        width: `${size}px`,
                        height: `${size}px`,
                        borderRadius: "50%",
                        background: isDark ? "transparent" : "var(--muted)",
                        border: "none",
                        boxShadow: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                    }}
                >
                    {/* Progress ring SVG */}
                    <svg
                        width={size}
                        height={size}
                        viewBox={`0 0 ${size} ${size}`}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            transform: "rotate(-90deg)",
                        }}
                    >
                        {/* Track */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="var(--accent-soft)"
                            strokeWidth={strokeWidth}
                            opacity="0.4"
                        />
                        {/* Progress */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="var(--accent)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ transition: "stroke-dashoffset 0.1s linear" }}
                        />
                    </svg>

                    {/* Arrow icon — upward chevron */}
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        style={{ position: "relative", zIndex: 1 }}
                    >
                        <path
                            d="M9 14V4M9 4L4 9M9 4L14 9"
                            stroke="var(--accent)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </>
    );
}