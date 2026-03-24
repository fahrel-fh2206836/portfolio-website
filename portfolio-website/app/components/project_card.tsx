"use client";

import Image from "next/image";

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
};

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  link,
  featured,
}: Project) {
  return (
    <div
      className={`pixel-panel flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 ${
        featured ? "scale-[1.02]" : ""
      }`}
      style={{
        background: featured ? "var(--accent-soft)" : "var(--card)",
        color: "var(--card-foreground)",
      }}
    >
      {/* IMAGE */}
      <div className="relative w-full h-40 border-b-4 border-black">
        <Image src={image} alt={title} fill className="object-cover" />

        <div className="absolute top-2 right-2 w-3 h-3 bg-[var(--accent)] border-2 border-black" />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="pixel-font text-[10px] mb-3 leading-relaxed">
          {title}
        </h3>

        <p className="text-[11px] mb-4 leading-relaxed opacity-80 flex-grow">
          {description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[9px] px-2 py-1 border-2 border-black"
              style={{ background: "var(--accent-soft)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* BUTTON */}
        <a
          href={link}
          className="pixel-btn text-[10px] text-center py-2"
          style={{
            background: "var(--accent)",
            color: "var(--accent-foreground)",
          }}
        >
          VIEW PROJECT →
        </a>
      </div>
    </div>
  );
}