import { Link } from "@remix-run/react";
import type { Project } from "~/types/Project";
export default function ProjectCard({project}: ProjectCardProps){
  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden shadow-lg hover:scale-105 ease-out duration-300">
      <Link to={`/projects/${project.id}`}>  
        <img className="w-full h-full object-cover" src={project.images[0]} alt={project.title} />
      </Link>
    </div>
  );
};

type ProjectCardProps = {
  project: Project,
}