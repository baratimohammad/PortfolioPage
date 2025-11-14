export type ProjectMetric = {
  label: string;
  value: string;
  description?: string;
};

export type ProjectGalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectLinks = Record<string, string>;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
  role: string;
  tags: string[];
  year: number;
  stack: string[];
  links: ProjectLinks;
  problem: string;
  goal: string;
  approach: string;
  results: string;
  metrics: ProjectMetric[];
  gallery: ProjectGalleryImage[];
};
