import Image from "next/image";

interface ProjectCardProps {
  colSpan: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  hasButton?: boolean;
}

export default function ProjectCard({
  colSpan,
  src,
  alt,
  category,
  title,
  hasButton,
}: ProjectCardProps) {
  return (
    <div
      className={`gsap-project-card ${colSpan} relative group overflow-hidden rounded-xl bg-surface-container-low min-h-[320px]`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
        <span className="text-primary-fixed font-label font-bold uppercase tracking-widest text-sm mb-2">
          {category}
        </span>
        <h3 className="text-surface font-headline font-bold text-3xl md:text-4xl mb-4">
          {title}
        </h3>
        {hasButton && (
          <button className="w-fit text-surface border border-surface/30 px-6 py-2 rounded-full hover:bg-surface hover:text-inverse-surface transition-colors">
            View Case Study
          </button>
        )}
      </div>
    </div>
  );
}
