export type  Project = {
    title: string;
    description: string;
    gradient: string;
    details: string;
    technologies: string[];
    imageUrl?: string;
    thumbnailUrl?: string;
    functionalities?: string[];
    wip?: boolean;
    githubUrl?: string;
    siteUrl?: string;
}