export const strings = {
  details: {
    sleepFitness: 'Sleep Fitness',
    action: {
      title: 'Review',
      detail: 'New temperature suggestion',
    },
    card: {
      goal: 'Goal',
    },
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
  },
  units: {
    hours: 'hours',
    hoursShort: 'hrs',
    percent: '%',
    getHoursAndMinutes: (hrs: number, mins: number) => `${hrs}h ${mins}m`,
  },
};
