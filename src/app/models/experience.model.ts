export interface Experience {
  id: number;
  title: string;
  company?: string;
  period: string; 
  description: string;
  details?: string[]; 
  skills?: string[];
  technologies?: string[];
  current: boolean;
}
