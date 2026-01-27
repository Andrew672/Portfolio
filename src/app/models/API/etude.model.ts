import { LexicalRoot } from "./lexicalRoot.model";

export type ApiEtude = {
  id: number;
  title: string;
  institution: string;
  link?: string;
  startDate: string;
  endDate?: string;
  description: LexicalRoot;
  details?: { detail: string }[];
  skills?: { name: string }[];
  technologies?: { name: string }[];
  isCurrentlyStudying: boolean | null;
  location: string;
  degree?: string;
  fieldOfStudy?: string;
}