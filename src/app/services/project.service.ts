import { Injectable, signal } from '@angular/core';
import { Project } from '../models/projet.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly _projects = signal<Project[]>([
    {
      title: 'SportPartout',
      description:
        "SportPartout est une plateforme innovante dédiée aux sportifs amateurs, leur permettant de découvrir facilement des clubs, des événements et des activités sportives à proximité, puis de réserver en quelques clics.",
      details: 'Application fullstack moderne développée avec Spring Boot et React (PWA)',
      functionalities: [
        'Recherche géolocalisée des clubs et activités sportives',
        'Réservation en ligne et gestion des inscriptions',
        'Interface dédiée aux clubs pour gérer leurs événements et plannings',
        'rchitecture microservices avec communication asynchrone via RabbitMQ'
      ],
      gradient: 'from-slate-700 to-slate-800 hover:from-teal-900/50 hover:to-slate-800',
      imageUrl: 'assets/img/pres-sportpartout.png',
      thumbnailUrl: 'assets/img/sportpartout.svg',
      technologies: ['Spring Boot', 'React PWA', 'Microservices', 'RabbitMQ', 'Docker'],
      wip: false,
      githubUrl: 'https://github.com/Andrew672/SportPartout-MVP',
      siteUrl: 'https://sport-partout.fr'
    },
    {
      title: 'JobMailer',
      description:
        "JobMailer est un service automatisé qui aide les candidats à postuler efficacement en envoyant des candidatures personnalisées par e-mail aux offres d'emploi correspondant à leur profil. Dashboard intuitif pour suivre les candidatures.",
      details:
        'Backend SpringBoot avec intégration de nombreux providers de messagerie. Frontend Angular pour la gestion des campagnes de candidatures.',
      gradient: 'from-purple-900 to-blue-900 hover:from-purple-800 hover:to-blue-800',
      technologies: ['Angular', 'Spring Boot', 'IMAP/SMTP', 'Kubernetes', 'Docker', 'CI/CD', 'OAuth2'],
      functionalities: [
        "Automatisation de l'envoi de candidatures par e-mail",
        "Personnalisation des e-mails selon les offres d'emploi",
        'Dashboard de suivi des candidatures envoyées',
        'Intégration avec plusieurs providers de messagerie'
      ],
      wip: true,
      githubUrl: 'https://github.com/CambouisCORP/JobMailer'
    },
    {
      title: 'Portfolio Personnel',
      description:
        'Portfolio connecté à un CMS headless pour une gestion facile du contenu. Design moderne avec animations et effets visuels avancés.',
      details: 'Déploiement Kubernetes avec CI/CD automatisé.',
      gradient: 'from-slate-800 to-slate-900 hover:from-teal-900/50 hover:to-slate-900',
      thumbnailUrl: 'assets/img/andrew.png',
      technologies: ['Angular', 'Headless CMS', 'Kubernetes', 'Payload CMS', 'React'],
      functionalities: [
        'Gestion dynamique du contenu via un CMS headless',
        'Design responsive avec animations avancées',
        'Déploiement automatisé avec CI/CD sur Kubernetes'
      ],
      wip: true,
      githubUrl: 'https://github.com/Andrew672/Portfolio'
    }
  ]);

  readonly projects = this._projects.asReadonly();
}
