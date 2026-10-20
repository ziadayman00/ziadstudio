import { projects } from "@/data/projects";
import { Hero } from "@/components/Hero";
import { ProjectIndex } from "@/components/ProjectIndex";
import { AboutBrief } from "@/components/AboutBrief";
import { ContactSection } from "@/components/ContactSection";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Selected Work Editorial Index */}
      <ProjectIndex projects={projects} />

      {/* Practice & Ethos */}
      <ScrollReveal variant="drift">
        <AboutBrief />
      </ScrollReveal>

      {/* Direct Inquiries & Capabilities */}
      <ScrollReveal variant="soft">
        <ContactSection />
      </ScrollReveal>
    </div>
  );
}
