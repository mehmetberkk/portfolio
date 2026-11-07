import React from 'react';
import { Card, CardContent } from './ui/card';
import './ProjectCard.css';

export const ProjectSkeleton: React.FC = () => {
  return (
    <Card className="project-card project-card--skeleton h-full" aria-hidden="true">
      <CardContent className="project-card__content">
        <div className="project-card__header">
          <div className="skeleton-box skeleton-box--index" />
          <div className="project-card__stats">
            <div className="skeleton-box skeleton-box--stat" />
            <div className="skeleton-box skeleton-box--stat" />
          </div>
        </div>

        <div className="project-card__body">
          <div className="skeleton-box skeleton-box--title" />
        </div>

        <div className="project-card__tags">
          <div className="skeleton-box skeleton-box--tag" />
          <div className="skeleton-box skeleton-box--tag" />
          <div className="skeleton-box skeleton-box--tag" />
        </div>

        <div className="project-card__links">
          <div className="skeleton-box skeleton-box--link" />
        </div>
      </CardContent>
    </Card>
  );
};
