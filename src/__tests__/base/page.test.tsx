import Home from '@/app/(routes)/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock the Link component from next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Home Component', () => {
  it('renders the Avento Origin title', () => {
    render(<Home />);
    const titleElement = screen.getByText(
      'Document Management System with QR Code'
    );
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H2');
  });

  it('renders with correct container styling', () => {
    render(<Home />);
    const containerDiv = screen.getByText(
      'Document Management System with QR Code'
    ).parentElement;
    expect(containerDiv).toHaveClass(
      'flex flex-col items-center justify-center px-4 py-20 text-center min-h-screen'
    );
  });
});
