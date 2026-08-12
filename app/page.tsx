import { HomeView } from "@/components/home/HomeView";
import { fetchCommits } from "@/lib/commits";
import site from "@/content/site.json";
import socials from "@/content/socials.json";
import projects from "@/content/projects.json";
import experience from "@/content/experience.json";
import education from "@/content/education.json";
import skills from "@/content/skills.json";
import writing from "@/content/writing.json";
import creative from "@/content/creative.json";

export default async function Home() {
  const commits = await fetchCommits();

  return (
    <HomeView
      site={site}
      socials={socials}
      projects={projects}
      experience={experience}
      education={education}
      skills={skills}
      writing={writing}
      creative={creative}
      commits={commits}
    />
  );
}
