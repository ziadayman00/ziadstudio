import { MotionImageReveal } from "./MotionImageReveal";
import { ScrollParallaxImage } from "./ScrollParallaxImage";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-y-12">
      {images.map((imgSrc, idx) => {
        const isLead = idx === 0 || idx % 3 === 0;

        return (
          <MotionImageReveal
            key={imgSrc + idx}
            direction={isLead ? "up" : "right"}
            delay={0.08}
            className={`project-gallery-figure group relative overflow-hidden bg-[var(--color-surface)] ${isLead ? "md:col-span-12" : "md:col-span-6"}`}
          >
            <figure className="relative h-full w-full">
              <ScrollParallaxImage
                src={imgSrc}
                alt={`${title} screenshot ${idx + 1}`}
                aspectRatio={isLead ? "aspect-[16/9]" : "aspect-[4/3]"}
                intensity={isLead ? "low" : "medium"}
                sizes={isLead ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 600px"}
              />
              <figcaption className="flex items-center justify-between border-t border-[var(--color-border)] bg-[#FBFBF9] px-3 py-2 font-mono text-[10px] text-[var(--color-muted)]">
                <span>{title} — View {idx + 1}</span>
                <span>FIGURE {String(idx + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          </MotionImageReveal>
        );
      })}
    </div>
  );
}
