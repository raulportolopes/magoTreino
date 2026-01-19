
export type TrainingCategory = 'Física' | 'Técnica' | 'Tática' | 'Ensaiada' | 'Jogo';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  intensity: 'Baixa' | 'Média' | 'Alta';
  category: TrainingCategory;
  videoUrl?: string;
}

export interface TrainingSession {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  theme: string;
  microcycle: string;
  loadLevel: number; // 1 to 5
  exercises: Exercise[];
  status: 'Planejado' | 'Concluído';
}

export interface SeasonPhase {
  name: string;
  start: string;
  end: string;
  description: string;
}
