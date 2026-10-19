import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import projectStylesUrl from '~/styles/projects.css'

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: projectStylesUrl },
  ];
export default function Project(){
    return (
        <div className='w-full min-h-screen h-fit bg-gradient-to-b from-black to-gray-800 py-[120px] px-[24px]'>
            <div className='max-w-[768px] w-full mx-auto'>
                <Outlet />
            </div>
        </div>
    )
}