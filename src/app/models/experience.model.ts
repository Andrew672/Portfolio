export interface Experience {
  id: number;
  title: string;
  company?: string;
  link?: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  details?: string[]; 
  skills?: string[];
  technologies?: string[];
  current: boolean;
  location: string;
  responsibilities?: string[];
}
