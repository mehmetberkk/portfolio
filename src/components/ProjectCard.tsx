import React from 'react';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import type { ProjectItem } from '../types/github';
import { useLanguage } from '../context/LanguageContext';
import './ProjectCard.css';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { t, language } = useLanguage();

  return (
    <Card className="project-card h-full">
      <CardContent className="project-card__content">
        <div className="project-card__header">
          <span className="project-card__index">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="project-card__stats">
            <span
              className="project-card__stat"
              title={`${project.stars} ${language === 'tr' ? 'Yıldız' : 'Stars'}`}
            >
              <Star size={14} />
              <span>{project.stars}</span>
            </span>
            <span
              className="project-card__stat"
              title={`${project.forks} ${language === 'tr' ? 'Fork' : 'Forks'}`}
            >
              <GitFork size={14} />
              <span>{project.forks}</span>
            </span>
          </div>
        </div>

        <div className="project-card__body">
          <h3 className="project-card__title">{project.name}</h3>
        </div>

        <div className="project-card__tags">
          <span className="project-card__tag project-card__tag--primary">
            {project.language}
          </span>
          {project.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="project-card__tag">
              {topic}
            </span>
          ))}
        </div>

        <div className="project-card__links">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link"
            aria-label={`${project.name} GitHub Repository`}
          >
            <Github size={16} />
            <span>{t.projects.sourceCode}</span>
          </a>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link project-card__link--demo"
              aria-label={`${project.name} ${t.projects.liveDemo}`}
            >
              <ExternalLink size={16} />
              <span>{t.projects.liveDemo}</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
