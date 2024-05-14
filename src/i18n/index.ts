export const strings = {
  common: {
    mostRecent: 'Most recent',
    average: 'Average',
    acceptChanges: 'Accept changes',
    notTonight: 'Not tonight',
    room: 'room',
    bed: 'bed',
  },
  details: {
    sleepFitness: 'Sleep Fitness',
    action: {
      title: 'Review',
      detail: 'New temperature suggestion',
    },
    card: {
      titles: {
        timeSlept: 'Time slept',
        timeToFallAsleep: 'Time to fall asleep',
        tossAndTurnCount: 'Tosses and turns',
        sleepHeartRate: 'Sleep heart rate',
        temperatures: 'Temperatures',
        sleepStages: 'Sleep stages',
        respiratoryRate: 'Respiratory rate',
      },
      goal: 'Goal',
    },
    totalTimeAsleep: 'Total time asleep:',
  },
  error: {
    generalError: 'Sorry, an error has occurred. Please try again.',
  },
  sleeperList: {
    cell: {
      sleepScore: 'Sleep score',
      deepSleep: 'Deep sleep',
      seeInsights: 'See insights',
    },
    label: 'Family mode',
  },
  suggestion: {
    title: 'Temperature suggestion',
    text: 'Based on your recent activity, we suggest a cooler temperature for your Pod tonight.',
  },
  units: {
    hours: 'hours',
    hoursShort: 'hrs',
    percent: '%',
    asPercent: (n: number) => `${n}%`,
    getHoursAndMinutes: (hrs: number, mins: number) => `${hrs}h ${mins}m`,
    getMinutes: (mins: number) => `${mins}m`,
    bpm: (bpm: number) => `${bpm} bpm`,
    celcius: (bpm: number) => `${bpm}°C`,
  },
};
