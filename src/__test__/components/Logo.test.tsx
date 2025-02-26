import { render, screen } from '@testing-library/react';
import Logo from '../../app/components/Logo'; // Sesuaikan dengan path yang benar

describe('Logo Component', () => {
  it('renders the logo image correctly', () => {
    render(<Logo />);
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/images/momogin-logo.webp');
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
});
