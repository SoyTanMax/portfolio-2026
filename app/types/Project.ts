export interface Project {
    id: string;
    title: string;
    /** One line under the title on the home page: company/context · what it is · role. */
    tagline: string;
    images: string[];
    /** Kept online and linked from "More work", but not shown as a card on the home page. */
    archived?: boolean;
    content?: string;
}
