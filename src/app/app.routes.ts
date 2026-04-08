import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ProjectsPage } from './pages/projects/projects.page';
import { ProjectDetailPage } from './pages/projects/project-detail.page';
import { SkillsPage } from './pages/skills/skills.page';
import { CareerPage } from './pages/career/career.page';
import { ApiDocsPage } from './pages/api-docs/api-docs.page';
import { SystemPage } from './pages/system/system.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

export const routes: Routes = [
  { path: '', component: DashboardPage, title: 'Dashboard' },
  { path: 'projects', component: ProjectsPage, title: 'Projects' },
  { path: 'projects/:id', component: ProjectDetailPage, title: 'Project' },
  { path: 'skills', component: SkillsPage, title: 'Skills' },
  { path: 'career', component: CareerPage, title: 'Career' },
  { path: 'api-docs', component: ApiDocsPage, title: 'API Docs' },
  { path: 'system', component: SystemPage, title: 'System' },
  { path: '**', component: NotFoundPage, title: 'Not Found' },
];

