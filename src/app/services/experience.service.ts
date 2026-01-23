import { Injectable, signal } from '@angular/core';
import { Experience } from '../models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private readonly _experiences = signal<Experience[]>([
    {
      id: 1,
      title: 'Alternant Développeur Full Stack - Symfony',
      company: 'Atos Metz',
      period: 'Sept. 24 - Présent',
      link: 'https://atos.net/fr',
      location: 'Metz, France',
      description: "TMA et évolution d'applications Sylfony. Travail en méthode Agile au sein d'une équipe.",
      details: [
          "Maintenance et évolution de fonctionnalités critiques pour la sécurité numérique.",
          "RG2A : Mise en œuvre de bonnes pratiques de sécurité et d'accessibilité.",
          "Mise en place Pipeline CI/CD avec GitHub Actions.",
      ],
      skills: ["Symfony", "PHP", "Agilité", "CI/CD", "Sécurité", "Accessibilité"],
      technologies: ["Symfony", "Angular", "TypeScript", "Docker", "GitHub Actions", "RabbitMQ"],
      current: true
    },
    {
      id: 2,
      title: 'Tuteur/Chef de Projet',
      company: 'IUT de Metz',
      location: 'Metz, France',
      period: 'Oct. 2024 - Jan. 2025',
      description: "Accompagnement d'étudiants de BUT2 dans la réalisation d'un projet professionnel sur une période de plusieurs mois",
      details: [
          "Encadrement technique et méthodologique d'une équipe de 4 étudiants.",
          "Méthodologie Agile Scrum avec sprints bi-hebdomadaires.",
          "Intégration continue et déploiement automatisé.",
          "Architecture Hexagonale pour une application mobile de proposition de vêtements personnalisés.",
      ],
      skills: ["Full Stack Dev", "CI/CD", "Gestion Client", "Base de données"],
      technologies: ["Angular", "NestJS", "PostgreSQL", "Docker", "GitHub Actions", "Stripe API"],
      current: false
    },
    {
      id: 3,
      title: 'Stage Développeur Full Stack',
      company: 'Intoo - Séculib',
      location: 'Maxéville, France',
      link: 'https://intoo.fr',
      period: 'Avril 2024 - Août 2024',
      description: "Développement dans le cadre d'une application mobile de mise en relation entre particuliers/entreprises et professionnels de la sécurité privée.",
      details: [
          "Architecture Hexagonale pour le backend avec Spring Boot.",
          "Développement frontend avec Angular et Ionic.",
          "Participation aux rituels Agiles (Scrum).",
          "Tests unitaires et E2E",
      ],
      skills: ["Full Stack Dev", "Agilité", "Tests", "Architecture Hexagonale"],
      technologies: ["Java", "Spring Boot", "Angular", "Ionic", "TypeScript", "PostgreSQL", "Docker"],
      current: false
    },
    {
      id: 4,
      title: 'Stage Développeur',
      company: 'DeKan-Group',
      location: 'Nancy, France',
      link: 'https://www.dekan-group.com/',
      period: 'Avril 2023 - Juin. 2023',
      description: "Module de gestion de document via une I.A. ainsi que des robots software",
      details: [
          "Développement d'un module de gestion documentaire avec reconnaissance et classification automatique via I.A.",
          "Intégration de robots software pour l'automatisation des flux documentaires.",
          "Utilisation de services cloud pour le traitement et le stockage des données.",
      ],
      skills: ["Développement", "Intelligence Artificielle", "Automatisation", "Cloud"],
      technologies: ["AWS", "Python", "OCR", "Robotic Process Automation (RPA)"],
      current: false
    }
  ]);

  readonly experiences = this._experiences.asReadonly();
}
