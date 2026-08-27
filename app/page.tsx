import { HomeView } from "@/components/home/HomeView";
import type { VisualItem } from "@/components/home/VisualScroll";
import { fetchCommits } from "@/lib/commits";
import site from "@/content/site.json";
import socials from "@/content/socials.json";
import projects from "@/content/projects.json";
import experience from "@/content/experience.json";
import education from "@/content/education.json";
import skills from "@/content/skills.json";
import writing from "@/content/writing.json";
import creativeWriting from "@/content/creative-writing.json";
import creativeVisual from "@/content/creative-visual.json";

export default async function Home() {
  const commits = site.showActivity ? await fetchCommits() : null;

  return (
    <HomeView
      site={site}
      socials={socials}
      projects={projects}
      experience={experience}
      education={education}
      skills={skills}
      writing={writing}
      creativeWriting={creativeWriting}
      creativeVisual={creativeVisual as VisualItem[]}
      commits={commits}
    />
  );
}
