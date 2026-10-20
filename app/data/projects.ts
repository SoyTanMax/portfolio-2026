import type { Project } from "~/types/Project";

// Order matters: the first non-archived project is the large featured card,
// the next four fill the grid. Archived projects are listed under "More work".
export const projects: Project[] = [
    {
        id: 'pos-redesign',
        title: 'Pide Directo POS',
        tagline: 'Internal tool for restaurant staff · Two redesigns · Design + React',
        images: ['/case-studies/pos/card.webp'],
    },
    {
        id: 'web-menu-redesign',
        title: 'Pide Directo Web Menu',
        tagline: 'Ordering funnel · Phone-only sign-up · Led design + React build',
        images: ['https://i.ibb.co/fSKCpb5/Frame-7-3.png'],
    },
    {
        id: 'cemex',
        title: 'CEMEX Vertua',
        tagline: 'Lead generation site · UX Researcher + UX/UI Designer',
        images: ['https://i.ibb.co/R23JPfN/Frame-28.png'],
    },
    {
        id: 'taconomics',
        title: 'Taconomics',
        tagline: 'Freelance · NFT marketplace · UX/UI + branding',
        images: ['https://i.ibb.co/2yywKsw/Taconomics-1-1.png'],
    },
    {
        id: 'persona-lamps',
        title: 'Persona Lamps',
        tagline: 'NFT drop landing page · Vue.js · 4,444 NFTs sold out',
        images: ['https://i.ibb.co/KhXK4MC/Group-564-1.png'],
        archived: true,
    },
]
