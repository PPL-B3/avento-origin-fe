import { NavLinks } from '@/components/core/elements/Navbar/NavLinks';
import { render, screen } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('NavLinks Component', () => {
  it('does not show any links when not logged in', () => {
    render(<NavLinks user={null} />);

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Upload Document')).not.toBeInTheDocument();
  });
});
