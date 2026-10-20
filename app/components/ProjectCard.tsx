import { Link } from "@remix-run/react";
import type { Project } from "~/types/Project";

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`} className={`group flex h-full w-full flex-col ${className}`}>
      <div className="min-h-[160px] flex-1 overflow-hidden rounded-lg shadow-lg">
        <img
          className="h-full w-full object-cover ease-out duration-300 group-hover:scale-105"
          src={project.images[0]}
          alt=""
        />
      </div>
      {/* Caption below the image: several card images already have a title drawn into them. */}
      <div className="pt-3">
        <p className="font-semibold text-white text-base leading-tight group-hover:underline">{project.title}</p>
        <p className="mt-1 text-sm text-white/70 leading-snug">{project.tagline}</p>
      </div>
    </Link>
  );
}

type ProjectCardProps = {
  project: Project,
  className?: string,
}
