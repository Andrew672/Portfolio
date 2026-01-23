export interface Experience {
  id: number;
  title: string;
  company?: string;
  link?: string;
  period: string; 
  description: string;
  details?: string[]; 
  skills?: string[];
  technologies?: string[];
  current: boolean;
  location: string;
}
