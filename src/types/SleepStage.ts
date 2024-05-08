export interface SleepStage {
  stage: Stage;
  duration: number; // Duration in minutes
  heartRate: number; // Average heart rate during this stage
  respirationRate: number; // Average respiration rate
  movement: number; // Movement index (0-100) representing restlessness
  temperature: number; // Average body temperature (in celsius)
}

export type Stage = 'deep' | 'light' | 'rem';
