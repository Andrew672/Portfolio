import { ApiDetail } from "./detail.model";
import { ApiItem } from "./item.model";

export type ApiExperience = {
  id: number;
  title: string;
  description: string;
  company: string;
  link: string;
  details: ApiDetail[];
  startDate: string;
  endDate: string | null;
  isCurrentlyWorkingHere: boolean;
  location: string;
  technologies: ApiItem[];
  skills: ApiItem[];
}