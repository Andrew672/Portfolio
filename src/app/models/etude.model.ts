export interface Etude {
  id: number;
  title: string;
  institution: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  current: boolean;
  location: string;
  degree?: string;
  field?: string;
}
