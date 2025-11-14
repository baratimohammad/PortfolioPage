import rawProjects from "@/data/projects.json";
import type { Project } from "@/types/project";

export const projects = rawProjects as Project[];

export const projectSlugs = projects.map((project) => project.slug);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
