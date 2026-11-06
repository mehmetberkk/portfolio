import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from './useInView';
import projectsData from '../data/projects.json';
import './Projects.css';

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    github: string;
    demo: string | null;
    image: string | null;
    featured: boolean;
}

const projects = projectsData as Project[];

export default function Projects() {
    const { ref, inView } = useInView(0.1);

    return (
        <section id="projects" className="projects section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Projeler</h2>
                    <p className="section-subtitle">
                        Geliştirdiğim projeler.
                    </p>
                </motion.div>

                <div className="projects__grid">
                    {projects.map((project, i) => (
                        <motion.article
                            key={project.id}
                            className={`projects__card ${project.featured ? 'projects__card--featured' : ''}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 80, damping: 18 }}
                        >
                            <div className="projects__card-header">
                                <span className="projects__card-index">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                {project.featured && (
                                    <span className="projects__card-badge">Öne Çıkan</span>
                                )}
                            </div>

                            <h3 className="projects__card-title">{project.title}</h3>
                            <p className="projects__card-desc">{project.description}</p>

                            <div className="projects__card-tags">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="projects__card-tag">{tech}</span>
                                ))}
                            </div>

                            <div className="projects__card-links">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="projects__card-link"
                                    aria-label={`${project.title} GitHub`}
                                >
                                    <Github size={18} />
                                    <span>Kaynak Kod</span>
                                </a>
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="projects__card-link projects__card-link--demo"
                                        aria-label={`${project.title} Demo`}
                                    >
                                        <ExternalLink size={18} />
                                        <span>Demo</span>
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}