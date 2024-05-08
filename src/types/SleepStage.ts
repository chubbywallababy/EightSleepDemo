export interface SleepStage {
  stage: Stage;
  /** Duration in minutes */
  duration: number;
  heartRate: number; // Average heart rate during this stage
  respirationRate: number; // Average respiration rate
  movement: number; // Movement index (0-100) representing restlessness
  temperature: number; // Average body temperature (in celsius)
}

export type SleepStageKeys = keyof SleepStage;

export enum Stage {
  Deep = 'deep',
  Light = 'light',
  Rem = 'rem',
}

export const STAGES = [Stage.Deep, Stage.Light, Stage.Rem];