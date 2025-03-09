import { AuthTabs } from '@/components/modules/login/components';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import * as NavigationModule from 'next/navigation';

// Mock next/navigation using ES6 import style
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('AuthTabs Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive Test Cases
  describe('Positive Scenarios', () => {
    it('renders both LOGIN and REGISTRASI tabs', () => {
      const mockSetActiveTab = jest.fn();

      render(<AuthTabs activeTab="LOGIN" setActiveTab={mockSetActiveTab} />);

      const loginTab = screen.getByText('LOGIN');
      const registrationTab = screen.getByText('REGISTRASI');

      expect(loginTab).toBeInTheDocument();
      expect(registrationTab).toBeInTheDocument();
    });

    it('applies active tab styling correctly', () => {
      const mockSetActiveTab = jest.fn();

      render(<AuthTabs activeTab="LOGIN" setActiveTab={mockSetActiveTab} />);

      const loginTab = screen.getByText('LOGIN');
      const registrationTab = screen.getByText('REGISTRASI');

      // LOGIN tab should have bold and border styling
      expect(loginTab).toHaveClass('border-b-2');
      expect(loginTab).toHaveClass('font-bold');

      // REGISTRASI tab should not have bold and border styling
      expect(registrationTab).not.toHaveClass('border-b-2');
      expect(registrationTab).not.toHaveClass('font-bold');
    });

    it('calls setActiveTab and router.push when tab is clicked', () => {
      const mockSetActiveTab = jest.fn();
      const mockRouterPush = jest.fn();

      // Override the mock implementation
      (NavigationModule.useRouter as jest.Mock).mockReturnValue({
        push: mockRouterPush,
      });

      render(<AuthTabs activeTab="LOGIN" setActiveTab={mockSetActiveTab} />);

      const registrationTab = screen.getByText('REGISTRASI');
      fireEvent.click(registrationTab);

      // Verify setActiveTab was called with correct tab
      expect(mockSetActiveTab).toHaveBeenCalledWith('REGISTRASI');

      // Verify router.push was called with correct path
      expect(mockRouterPush).toHaveBeenCalledWith('/register');
    });
  });

  // Negative Test Cases
  describe('Negative Scenarios', () => {
    it('does not apply active styling to inactive tabs', () => {
      const mockSetActiveTab = jest.fn();

      render(<AuthTabs activeTab="LOGIN" setActiveTab={mockSetActiveTab} />);

      const registrationTab = screen.getByText('REGISTRASI');

      expect(registrationTab).not.toHaveClass('border-b-2');
      expect(registrationTab).not.toHaveClass('font-bold');
    });

    it('handles tab click without throwing errors', () => {
      const mockSetActiveTab = jest.fn();
      const mockRouterPush = jest.fn();

      // Override the mock implementation
      (NavigationModule.useRouter as jest.Mock).mockReturnValue({
        push: mockRouterPush,
      });

      render(<AuthTabs activeTab="LOGIN" setActiveTab={mockSetActiveTab} />);

      const loginTab = screen.getByText('LOGIN');

      // Simulate click on already active tab
      expect(() => {
        fireEvent.click(loginTab);
      }).not.toThrow();

      // Verify no unexpected calls were made
      expect(mockSetActiveTab).toHaveBeenCalledWith('LOGIN');
      expect(mockRouterPush).toHaveBeenCalledWith('/login');
    });
  });
});
