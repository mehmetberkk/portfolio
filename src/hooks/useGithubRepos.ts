import { useState, useEffect } from 'react';
import type { GitHubRepo, ProjectItem, CachedProjects } from '../types/github';

const USERNAME = 'mehmetberkk';
const EXCLUDED_REPOS = [USERNAME.toLowerCase(), 'portfolio'];
const CACHE_KEY = 'github_repos_cache_v2';
const CACHE_DURATION = 60 * 60 * 1000;

const KNOWN_REPO_LANGUAGES: Record<string, { language: string; topics?: string[] }> = {
  'country-transportation-database': { language: 'TSQL' },
  'appointment-system': { language: 'Java', topics: ['Spring Boot', 'MVC'] },
  'e-commerce': { language: 'Java', topics: ['Spring Boot'] },
  'trendyol-review-bot': { language: 'Python', topics: ['Automation', 'Bot'] },
  'rapid-flashcard-stream': { language: 'TypeScript', topics: ['React'] },
  'rent-a-car-b2b': { language: 'Java', topics: ['Spring Boot'] },
};

function getCachedProjects(): ProjectItem[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedProjects = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function setCachedProjects(data: ProjectItem[]) {
  try {
    const payload: CachedProjects = { data, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

async function resolveLanguages(
  repo: GitHubRepo,
  signal: AbortSignal
): Promise<{ language: string; topics: string[] }> {
  const repoKey = repo.name.toLowerCase();
  const fallback = KNOWN_REPO_LANGUAGES[repoKey];
  const existingTopics = repo.topics || [];

  if (repo.language && repo.language.trim().length > 0) {
    return {
      language: repo.language,
      topics: existingTopics.length > 0 ? existingTopics : (fallback?.topics || []),
    };
  }

  if (repo.languages_url) {
    try {
      const langRes = await fetch(repo.languages_url, {
        signal,
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (langRes.ok) {
        const langData: Record<string, number> = await langRes.json();
        const sortedEntries = Object.entries(langData).sort(
          (a, b) => b[1] - a[1]
        );

        if (sortedEntries.length > 0) {
          let topLang = sortedEntries[0][0];

          if (
            (topLang.toLowerCase() === 'html' || topLang.toLowerCase() === 'css') &&
            fallback?.language
          ) {
            topLang = fallback.language;
          } else if (
            topLang.toLowerCase() === 'html' ||
            topLang.toLowerCase() === 'css'
          ) {
            const codeLang = sortedEntries.find(
              ([lang]) =>
                lang.toLowerCase() !== 'html' && lang.toLowerCase() !== 'css'
            );
            if (codeLang) topLang = codeLang[0];
          }

          const secondaryLangs = sortedEntries
            .map(([lang]) => lang)
            .filter((lang) => lang !== topLang);

          const mergedTopics =
            existingTopics.length > 0
              ? existingTopics
              : fallback?.topics || secondaryLangs.slice(0, 3);

          return {
            language: topLang,
            topics: mergedTopics,
          };
        }
      }
    } catch {
      // Ignore network errors and continue to fallback
    }
  }

  if (fallback) {
    return {
      language: fallback.language,
      topics: existingTopics.length > 0 ? existingTopics : (fallback.topics || []),
    };
  }

  return {
    language: existingTopics.length > 0 ? existingTopics[0] : 'Kod',
    topics: existingTopics,
  };
}

export function useGithubRepos() {
  const [projects, setProjects] = useState<ProjectItem[]>(() => getCachedProjects() || []);
  const [loading, setLoading] = useState<boolean>(() => !getCachedProjects());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCachedProjects();
    if (cached && cached.length > 0) {
      setProjects(cached);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let isMounted = true;

    async function loadRepos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`,
          {
            signal: controller.signal,
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('GitHub API istek limiti aşıldı. Lütfen daha sonra tekrar deneyin.');
          }
          throw new Error(`GitHub verileri alınamadı: HTTP ${response.status}`);
        }

        const data: GitHubRepo[] = await response.json();

        const filteredRepos = data
          .filter(
            (repo) =>
              !repo.archived &&
              !EXCLUDED_REPOS.includes(repo.name.toLowerCase())
          )
          .sort(
            (a, b) =>
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          );

        const filteredProjects: ProjectItem[] = await Promise.all(
          filteredRepos.map(async (repo) => {
            const { language, topics } = await resolveLanguages(
              repo,
              controller.signal
            );

            return {
              id: repo.id,
              name: repo.name,
              description:
                repo.description?.trim() || 'Geliştirilmekte olan açık kaynaklı proje.',
              language,
              topics,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              githubUrl: repo.html_url,
              demoUrl:
                repo.homepage && repo.homepage.trim().length > 0
                  ? repo.homepage.trim()
                  : null,
              isFork: repo.fork,
              pushedAt: repo.pushed_at,
            };
          })
        );

        if (isMounted) {
          setProjects(filteredProjects);
          setCachedProjects(filteredProjects);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        const message =
          err instanceof Error
            ? err.message
            : 'Projeler yüklenirken bir sorun oluştu.';
        setError(message);
        setLoading(false);
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { projects, loading, error };
}
