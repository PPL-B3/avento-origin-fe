import Home from '@/app/(routes)/page';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

// Mock the scrollIntoView function
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock the Link component from next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock framer-motion to render regular HTML elements
jest.mock('framer-motion', () => {
  return {
    motion: {
      h1: ({
        children,
        className,
      }: {
        children: React.ReactNode;
        className: string;
      }) => <h1 className={className}>{children}</h1>,
      p: ({
        children,
        className,
      }: {
        children: React.ReactNode;
        className: string;
      }) => <p className={className}>{children}</p>,
      div: ({
        children,
        className,
      }: {
        children: React.ReactNode;
        className: string;
      }) => <div className={className}>{children}</div>,
      button: ({
        children,
        className,
        onClick,
      }: {
        children: React.ReactNode;
        className: string;
        onClick?: () => void;
      }) => (
        <button className={className} onClick={onClick}>
          {children}
        </button>
      ),
    },
  };
});

describe('Home Component', () => {
  beforeEach(() => {
    // Set up a more comprehensive test environment
    render(<Home />);
  });

  // Positive test cases
  it('renders the document management title with QR Code', () => {
    const titleElement = screen.getByText(/Revolusi Manajemen Dokumen/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');

    const qrCodeText = screen.getByText('QR Code');
    expect(qrCodeText).toBeInTheDocument();
    expect(qrCodeText.tagName).toBe('SPAN');
    expect(qrCodeText).toHaveClass('text-orange-500');
  });

  it('renders the main call-to-action button', () => {
    const ctaButton = screen.getByText('Mulai Sekarang');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.tagName).toBe('A');
    expect(ctaButton).toHaveAttribute('href', '/upload-document');
  });

  it('renders the learn more button', () => {
    const learnMoreButton = screen.getByText('Pelajari Lebih Lanjut');
    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton.tagName).toBe('BUTTON');
  });

  it('renders the hero section with correct structure', () => {
    const heroSection = screen
      .getByText(/Revolusi Manajemen Dokumen/i)
      .closest('section');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'min-h-screen'
    );
  });

  it('calls scrollIntoView when Learn More button is clicked', () => {
    // Set up a mock element for getElementById
    const mockElement = document.createElement('div');
    document.getElementById = jest.fn().mockReturnValue(mockElement);

    // Find and click the Learn More button
    const learnMoreButton = screen.getByText('Pelajari Lebih Lanjut');
    fireEvent.click(learnMoreButton);

    // Check that getElementById was called with the right ID
    expect(document.getElementById).toHaveBeenCalledWith('learn-more');

    // Check that scrollIntoView was called with the right parameters
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  // Negative test cases
  it('does not render incorrect or old title text', () => {
    const oldTitle = screen.queryByText(
      'Document Management System with QR Code'
    );
    expect(oldTitle).not.toBeInTheDocument();

    const wrongTitle = screen.queryByText('Document System');
    expect(wrongTitle).not.toBeInTheDocument();
  });

  it('does not render elements that should not be present', () => {
    const nonExistentElement = screen.queryByText(
      'Login to access your documents'
    );
    expect(nonExistentElement).not.toBeInTheDocument();
  });

  it('does not render form elements on the home page', () => {
    const formElement = screen.queryByRole('form');
    expect(formElement).not.toBeInTheDocument();

    const inputElement = screen.queryByRole('textbox');
    expect(inputElement).not.toBeInTheDocument();
  });
});
