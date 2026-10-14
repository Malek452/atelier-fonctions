export type Mode = 'observe' | 'guide' | 'solo';
export type Visual =
  | 'powers'
  | 'signs'
  | 'substitution'
  | 'logs'
  | 'trig'
  | 'fold'
  | 'tide'
  | 'algebra';
export interface Step {
  title: string;
  tex: string;
  why: string;
  visual?: string;
}
export interface Choice {
  prompt: string;
  options: string[];
  correct: number;
  feedback: string;
}
export type Answer =
  | { kind: 'expression'; expected: string; form?: 'simplified'; positiveX?: boolean }
  | { kind: 'set'; expected: string }
  | { kind: 'choice'; options: string[]; correct: number }
  | { kind: 'number'; expected: number; tolerance: number; unit: string };
export interface Activity {
  id: string;
  label: string;
  prompt: string;
  tex: string;
  answer: Answer;
  result: string;
  steps: Step[];
  hints: [string, string];
  guided: Choice;
  visual: Visual;
  note?: string;
  initialDomain?: string;
}
export interface Exercise {
  id: number;
  title: string;
  short: string;
  theme: string;
  level: string;
  minutes: number;
  objectives: string[];
  prerequisites: string[];
  recommended: Mode;
  description: string;
  color: string;
  activities: Activity[];
}
export type Feedback = {
  status: 'correct' | 'partial' | 'incorrect' | 'unsupported' | 'empty';
  title: string;
  message: string;
};
export interface ProgressItem {
  attempts: number;
  solved: boolean;
  viewed: boolean;
  hints: number;
  answer: string;
  note: string;
  guideSolved: boolean;
}
export type Progress = Record<string, ProgressItem>;
