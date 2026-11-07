export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  githubUrl: string;
  demoUrl: string | null;
  isFork: boolean;
  pushedAt: string;
}

export interface CachedProjects {
  data: ProjectItem[];
  timestamp: number;
}
