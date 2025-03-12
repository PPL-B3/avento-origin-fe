import { InputField } from '@/components/modules/register/elements';
import { fireEvent, render, screen } from '@testing-library/react';

describe('InputField Component', () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  // POSITIVE TEST CASES
  test('renders input field with correct placeholder', () => {
    render(
      <InputField
        label="Username"
        type="text"
        value=""
        onChange={mockOnChange}
        placeholder="Enter username"
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter username');
    expect(inputElement).toBeInTheDocument();
  });

  test('updates value on change', () => {
    render(
      <InputField
        label="Email"
        type="email"
        value=""
        onChange={mockOnChange}
        placeholder="Enter email"
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter email');
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('toggles password visibility', () => {
    render(
      <InputField
        label="Password"
        type="password"
        value="secret"
        onChange={mockOnChange}
        placeholder="Enter password"
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter password');
    const toggleButton = screen.getByRole('button', {
      name: 'Toggle password visibility',
    });

    // Cek awal, harus bertipe password
    expect(inputElement).toHaveAttribute('type', 'password');

    // Klik tombol toggle, tipe harus berubah ke text
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'text');

    // Klik lagi, harus kembali ke password
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  //  NEGATIVE TEST CASES
  test('does not update value if onChange is not provided', () => {
    render(
      <InputField
        label="NoChange"
        type="text"
        value=""
        // Tidak memberikan onChange
        onChange={() => {}}
        placeholder="No Change"
      />
    );

    const inputElement = screen.getByPlaceholderText('No Change');
    fireEvent.change(inputElement, { target: { value: 'should not update' } });

    // Karena onChange kosong, mock tidak dipanggil
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
