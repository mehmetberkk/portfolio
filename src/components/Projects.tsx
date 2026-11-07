import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { useInView } from './useInView';
import { useGithubRepos } from '../hooks/useGithubRepos';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCard } from './ProjectCard';
import { ProjectSkeleton } from './ProjectSkeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel';
import './Projects.css';

export default function Projects() {
  const { ref, inView } = useInView(0.1);
  const { projects, loading, error } = useGithubRepos();
  const { t } = useLanguage();

  return (
    <section id="projects" className="projects section" ref={ref}>
      <div className="container">
        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full"
        >
          <div className="projects__header-wrap">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">{t.projects.title}</h2>
            </motion.div>

            {!loading && projects.length > 3 && (
              <div className="projects__nav">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            )}
          </div>

          {error && projects.length === 0 ? (
            <div className="projects__error">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={20} color="#ef4444" />
                <span className="projects__error-title">{t.projects.errorTitle}</span>
              </div>
              <p className="projects__error-desc">{error}</p>
              <a
                href="https://github.com/mehmetberkk"
                target="_blank"
                rel="noopener noreferrer"
                className="projects__error-link"
              >
                <span>{t.projects.errorCta}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          ) : loading ? (
            <div className="flex -ml-1 overflow-hidden w-full">
              {[0, 1, 2].map((i) => (
                <div key={i} className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <ProjectSkeleton />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <CarouselContent className="-ml-1">
              {projects.map((project, index) => (
                <CarouselItem
                  key={project.id}
                  className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <ProjectCard project={project} index={index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
        </Carousel>
      </div>
    </section>
  );
}
