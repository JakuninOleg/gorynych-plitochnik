'use client';
import { useState } from 'react';
import { projects, projectFilters } from '@/lib/marketing-content';
import { ProjectCard } from './story-parts';
import styles from './project-browser.module.css';
export function ProjectBrowser() {
    const [filter, setFilter] = useState<string>('all');
    const shown = projects.filter(project => filter === 'all' || project.category === filter);
    return <div><div className={styles.filters} aria-label="Фильтр работ">{projectFilters.map(item => <button key={item.value} type="button" onClick={() => setFilter(item.value)} aria-pressed={filter === item.value}>{item.label}</button>)}</div><p className="sr-only" aria-live="polite">Показано работ: {shown.length}</p><div className={styles.grid}>{shown.map(project => <ProjectCard key={project.slug} project={project}/>)}</div></div>;
}
