import usersReducer, {
  acceptSuggestion,
  denySuggestion,
  initialState,
} from '../../../src/redux/users/slice';

describe('Reducers', () => {
  describe('Users Reducer', () => {
    it('should handle accept suggestion', () => {
      const action = acceptSuggestion('userId');
      const newState = usersReducer(initialState, action);

      expect(newState.data.acceptedSuggestion.userId).toEqual(true);
    });

    it('should handle deny suggestion', () => {
      const action = denySuggestion('userId');
      const newState = usersReducer(initialState, action);

      expect(newState.data.acceptedSuggestion.userId).toEqual(false);
    });
  });
});
