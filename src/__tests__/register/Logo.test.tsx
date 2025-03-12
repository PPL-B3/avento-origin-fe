import { Logo } from '@/components/modules/register/elements';
import { render, screen } from '@testing-library/react';

describe('Logo Component', () => {
  it('renders the logo image correctly', () => {
    render(<Logo />);
    const logoImage = screen.getByAltText('Momofin Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/images/momofin-logo.webp');
  });

  it('renders the correct text', () => {
    render(<Logo />);
    expect(screen.getByText(/Kelola Dokumen/i)).toBeInTheDocument();
    expect(screen.getByText(/Digitalmu Sekarang!/i)).toBeInTheDocument();
  });

  it('has the correct styling classes', () => {
    render(<Logo />);
    const logoContainer = screen.getByRole('img', {
      hidden: true,
    }).parentElement;
    expect(logoContainer).toHaveClass('flex', 'flex-col', 'items-center');
  });

  it('renders heading tags for better SEO', () => {
    render(<Logo />);
    expect(
      screen.getByRole('heading', { name: /Kelola Dokumen/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Digitalmu Sekarang!/i })
    ).toBeInTheDocument();
  });
});
