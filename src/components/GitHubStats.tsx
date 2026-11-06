import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Users, BookOpen, Star, GitCommit } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useInView } from './useInView';
import './GitHubStats.css';

const USERNAME = 'mehmetberkk';
const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 5 * 60 * 1000;

interface GitHubUser {
    public_repos: number;
    followers: number;
    following: number;
}

interface RepoData {
    stargazers_count: number;
    forks_count: number;
}

interface StatsData {
    user: GitHubUser;
    totalStars: number;
    totalForks: number;
}

interface CachedData {
    data: StatsData;
    timestamp: number;
}

function getCachedData(): StatsData | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const cached: CachedData = JSON.parse(raw);
        if (Date.now() - cached.timestamp > CACHE_DURATION) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
        return cached.data;
    } catch {
        return null;
    }
}

function setCachedData(data: StatsData) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {
        // Ignore localStorage quota or restriction errors
    }
}

async function fetchGitHubData(signal: AbortSignal): Promise<StatsData> {
    const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}`, { signal }),
        fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { signal }),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

    const user: GitHubUser = await userRes.json();
    const repos: RepoData[] = await reposRes.json();

    return {
        user,
        totalStars: repos.reduce((s, r) => s + r.stargazers_count, 0),
        totalForks: repos.reduce((s, r) => s + r.forks_count, 0),
    };
}

type CounterKey = 'public_repos' | 'followers' | 'totalStars' | 'totalForks' | 'following';

const counters: { key: CounterKey; label: string; icon: typeof BookOpen }[] = [
    { key: 'public_repos', label: 'Public Repos', icon: BookOpen },
    { key: 'followers', label: 'Followers', icon: Users },
    { key: 'totalStars', label: 'Total Stars', icon: Star },
    { key: 'totalForks', label: 'Total Forks', icon: GitCommit },
    { key: 'following', label: 'Following', icon: GitBranch },
];

function getCounterValue(stats: StatsData, key: CounterKey): number {
    if (key === 'totalStars') return stats.totalStars;
    if (key === 'totalForks') return stats.totalForks;
    return stats.user[key] ?? 0;
}

export default function GitHubStats() {
    const { theme } = useTheme();
    const { ref, inView } = useInView(0.1);
    const [stats, setStats] = useState<StatsData | null>(getCachedData());
    const [loading, setLoading] = useState(!stats);
    const [error, setError] = useState(false);
    const [chartError, setChartError] = useState(false);

    useEffect(() => {
        if (stats) return;
        const controller = new AbortController();
        fetchGitHubData(controller.signal)
            .then(data => {
                setStats(data);
                setCachedData(data);
                setLoading(false);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setError(true);
                    setLoading(false);
                }
            });
        return () => controller.abort();
    }, [stats]);

    const chartColor = theme === 'dark' ? 'A78BFA' : '7C3AED';
    const chartUrl = `https://ghchart.rshah.org/${chartColor}/${USERNAME}`;

    return (
        <section id="github" className="github-stats section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">GitHub</h2>
                    <p className="section-subtitle">
                        Açık kaynak çalışmalarım ve kodlama aktivitem.
                    </p>
                </motion.div>

                {/* Counter Cards */}
                <div className="github-stats__counters">
                    {loading ? (
                        counters.map(c => (
                            <div key={c.key} className="github-stats__skeleton github-stats__skeleton--counter" />
                        ))
                    ) : error ? (
                        <div className="github-stats__error">
                            GitHub verileri yüklenemedi.
                        </div>
                    ) : (
                        counters.map((c, i) => (
                            <motion.div
                                key={c.key}
                                className="github-stats__counter-card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 80, damping: 18 }}
                            >
                                <div className="github-stats__counter-icon">
                                    <c.icon size={28} />
                                </div>
                                <div className="github-stats__counter-value">
                                    {stats ? getCounterValue(stats, c.key) : 0}
                                </div>
                                <div className="github-stats__counter-label">{c.label}</div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Contribution Heatmap */}
                {!chartError && (
                    <motion.div
                        className="github-stats__heatmap"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, type: 'spring', stiffness: 80, damping: 18 }}
                    >
                        <img
                            src={chartUrl}
                            alt="GitHub Contributions"
                            className="github-stats__heatmap-img"
                            onError={() => setChartError(true)}
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
}
