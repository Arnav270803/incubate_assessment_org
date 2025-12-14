import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

// Mock localStorage
const mockLocalStorage = {
  removeItem: vi.fn(),
};
vi.stubGlobal('localStorage', mockLocalStorage);

test('logout clears user, token, and localStorage', () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: AuthProvider,
  });

  // Set initial state for test
  act(() => {
    result.current.setUser({ email: 'test@example.com' });
    result.current.setToken('mock-token');
  });

  // Call logout
  act(() => {
    result.current.logout();
  });

  // Assertions
  expect(result.current.user).toBeNull();
  expect(result.current.token).toBeNull();
  expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
  expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
});