import { Link } from '@remix-run/react';
import { projects } from '~/data/projects';
import ProjectCard from '~/components/ProjectCard';

const featured = projects.filter((p) => !p.archived);
const archived = projects.filter((p) => p.archived);
const grid = featured.slice(1, 5);

export default function ProjectsContainer(){
    return (
        <div className='w-full mt-4 px-[24px] sm:px-[64px] md:px-[96px]'>
            <div className='flex flex-col md:flex-row gap-6 w-full md:h-[600px] bg-transparent'>
                <div className='w-full md:w-1/2 h-[340px] md:h-full'>
                    <ProjectCard project={featured[0]} />
                </div>
                <div className='w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-[260px] md:auto-rows-fr'>
                    {grid.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            // With an odd number of grid cards, the last one spans the row instead of leaving a hole.
                            className={grid.length % 2 === 1 && i === grid.length - 1 ? 'sm:col-span-2' : ''}
                        />
                    ))}
                </div>
            </div>
            {archived.length > 0 && (
                <div className='mt-10'>
                    <h2 className='font-mono text-xs uppercase tracking-wider text-white/60'>More work</h2>
                    <ul className='mt-3 divide-y divide-white/10 border-y border-white/10'>
                        {archived.map(project => (
                            <li key={project.id}>
                                <Link to={`/projects/${project.id}`} className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-3 text-white hover:text-white/80'>
                                    <span className='font-medium'>{project.title}</span>
                                    <span className='text-sm text-white/60'>{project.tagline}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
