import type { V2_MetaFunction } from "@remix-run/node";
import Closing from "~/components/home/Closing";
import Intro from "~/components/home/Intro";
import ProjectStory from "~/components/home/ProjectStory";
import { projects } from "~/data/projects";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Max López - Design Engineer" },
    { name: "description", content: "Max López, Design Engineer in Monterrey, Nuevo León. I design and build internal tools, design systems and web products, from Figma to production." },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Max López - Design Engineer" },
    { property: "og:description", content: "From idea to a working product. I design and build internal tools, design systems and web products, from Figma to production." },
    { property: "og:url", content: "https://www.maxlopez.me/" },
    { property: "og:image", content: "https://www.maxlopez.me/og/home.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

const stories = projects.filter((p): p is typeof p & { story: NonNullable<typeof p.story> } => !p.archived && !!p.story);
const more = projects.filter((p) => p.archived);

export default function Index() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#07080B]">
      <Intro />
      {stories.map((project, i) => {
        const nextStory = stories[i + 1];
        return (
          <ProjectStory
            key={project.id}
            project={project}
            index={i}
            total={stories.length}
            next={nextStory ? { id: nextStory.id, label: `Next: ${nextStory.title}` } : { id: "more-work", label: "More work" }}
          />
        );
      })}
      <Closing more={more} />
    </main>
  );
}
