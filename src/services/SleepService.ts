import {SleepData, User} from '../types';

export const SleepService = {
  /**
   * Fetch all the users (family members)
   *
   * @param userId
   * @returns
   */
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(
      'https://s3.amazonaws.com/eight-public/challenge/users.json',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.users;
  },
  /**
   * Fetch the data for an individual user
   *
   * @param userId
   * @returns
   */
  getSleepData: async (userId: string): Promise<SleepData> => {
    const response = await fetch(
      `https://s3.amazonaws.com/eight-public/challenge/${userId}.json`,
    );
    const sleepData = await response.json();

    return sleepData;
  },
};
