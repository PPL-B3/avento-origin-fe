import Home from '@/app/page';
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
    const titleElement = screen.getByText('Avento Origin');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('B');
  });

  it('renders the Upload Document button', () => {
    render(<Home />);
    const buttonElement = screen.getByRole('button', {
      name: /upload document/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it('links to the upload-document page', () => {
    render(<Home />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/upload-document');
  });

  it('renders with correct container styling', () => {
    render(<Home />);
    const containerDiv = screen.getByText('Avento Origin').parentElement;
    expect(containerDiv).toHaveClass(
      'w-screen h-screen flex flex-col items-center justify-center'
    );
    expect(containerDiv).toHaveStyle({
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
    });
  });
});
