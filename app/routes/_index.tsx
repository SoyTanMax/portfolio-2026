import type { V2_MetaFunction } from "@remix-run/node";
import Closing from "~/components/home/Closing";
import Intro from "~/components/home/Intro";
import ProjectStory from "~/components/home/ProjectStory";
import { projects } from "~/data/projects";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Max López - Design Engineer" },
    { name: "description", content: "Max López, Design Engineer in Monterrey, Nuevo León. I design and build websites and apps, from the first concept to something people can actually use." },
    { name: "keywords", content: "UX/UI Designer, Front-end Developer, User Experience, User Interface, Web Design, Front-end Development" },
    { property: "og:image", content: "https://i.ibb.co/sb66ykM/Bookmark.png" },
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
