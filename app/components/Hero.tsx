import BlueStar from '~/components/BlueStar';
import GreenStar from '~/components/GreenStar';
import StarPattern from '~/components/StarPattern';
import ProjectsContainer from './ProjectsContainer';

export default function Hero(){
    return (
        <section className="relative bg-gradient-to-b from-black to-blue-900 min-h-screen h-auto flex flex-col justify-center items-center pb-12 overflow-hidden">
            <div className='mt-[150px] text-center max-w-4xl px-[24px] sm:px-[64px] md:px-[96px]'>
                <h1 className="text-2xl font-semibold text-white mb-4 animate-fade-in px-[24px] sm:px-0">"Form follows function - that has been misunderstood. Form and function should be one, joined in a spiritual union."</h1>
                <p className="text-lg text-white mb-8">- Frank Lloyd Wright</p>
            </div>
            <StarPattern />
            <GreenStar />
            <BlueStar />
            <ProjectsContainer />
        </section>
    )
}