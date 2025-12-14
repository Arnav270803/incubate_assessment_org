import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import Login from './Login';

describe('Login Component', () => {
  // Test 1: Render login form
  it('should render the login form with email and password inputs', () => {
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText('you@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  // Test 2: Toggle between login and register
  it('should toggle between login and register modes', () => {
    render(<Login />);
    
    // Initially should show login button
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    
    // Click toggle button and wrap in act
    const toggleButton = screen.getByRole('button', { name: /Don't have an account\?/i });
    act(() => {
      toggleButton.click();
    });
    
    // Should show register text in toggle button
    expect(screen.getByRole('button', { name: /Already have an account\?/i })).toBeInTheDocument();
  });
});