import { renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

test('AuthContext initializes with null user', () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: AuthProvider
  });

  expect(result.current.user).toBe(null);
});
