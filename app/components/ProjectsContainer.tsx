import { projects } from '~/data/projects';
import ProjectCard from '~/components/ProjectCard';

export default function ProjectsContainer(){
    return (
        <div className='flex flex-col sm:flex-row gap-4 w-full md:h-[540px] bg-transparent mt-4 px-[24px] sm:px-[64px] md:px-[96px]'>
            <div className='w-full md:w-1/2 h-full bg-transparent'>
                <ProjectCard project={projects[0]} />
            </div>
            <div className='w-full md:w-1/2 grid grid-cols-2 gap-4'>
                {projects.slice(1, 5).map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    )
}