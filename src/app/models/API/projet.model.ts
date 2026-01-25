import { ApiFunctionality } from "./functionality.model";
import { ApiItem } from "./item.model";
import { ApiMedia } from "./media.model";

export type ApiProject = {
  id: number;
  title: string;
  detail: string;
  description: string;
  functionnalities: ApiFunctionality[];
  isCurrentlyWorkingOn: boolean;
  technologies: ApiItem[];
  image: ApiMedia | null;
  thumbnail: ApiMedia | null;
  siteURL: string | null;
  repoURL: string | null;
}