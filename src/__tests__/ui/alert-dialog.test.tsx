import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('AlertDialog', () => {
  it('renders trigger and opens dialog when clicked', async () => {
    const user = userEvent.setup();

    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert Title</AlertDialogTitle>
            <AlertDialogDescription>Alert Description</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    // Check if trigger is rendered
    const trigger = screen.getByText('Open Dialog');
    expect(trigger).toBeInTheDocument();

    // Open dialog
    await user.click(trigger);

    // Check if dialog content is rendered
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert Description')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('executes action when action button is clicked', async () => {
    const user = userEvent.setup();
    const mockAction = jest.fn();

    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert Title</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={mockAction}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    // Open dialog
    await user.click(screen.getByText('Open Dialog'));

    // Click action button
    await user.click(screen.getByText('Continue'));

    // Check if action was called
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('renders AlertDialogHeader with custom className', () => {
    render(
      <AlertDialogHeader className="custom-header">
        Test Header
      </AlertDialogHeader>
    );

    const header = screen.getByText('Test Header');
    expect(header).toHaveClass('custom-header');
  });

  it('renders AlertDialogFooter with custom className', () => {
    render(
      <AlertDialogFooter className="custom-footer">
        Test Footer
      </AlertDialogFooter>
    );

    const footer = screen.getByText('Test Footer');
    expect(footer).toHaveClass('custom-footer');
  });

  it('applies custom className to all components', async () => {
    const user = userEvent.setup();

    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="custom-title">
              Custom Title
            </AlertDialogTitle>
            <AlertDialogDescription className="custom-desc">
              Custom Description
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="custom-action">
              Custom Action
            </AlertDialogAction>
            <AlertDialogCancel className="custom-cancel">
              Custom Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    // Open dialog
    await user.click(screen.getByText('Open Dialog'));

    expect(screen.getByText('Custom Title')).toHaveClass('custom-title');
    expect(screen.getByText('Custom Description')).toHaveClass('custom-desc');
    expect(screen.getByText('Custom Action')).toHaveClass('custom-action');
    expect(screen.getByText('Custom Cancel')).toHaveClass('custom-cancel');
  });
});
it('closes dialog when Cancel button is clicked', async () => {
  const user = userEvent.setup();
  const mockCancel = jest.fn();

  render(
    <AlertDialog>
      <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Alert Title</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={mockCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  // Open dialog
  await user.click(screen.getByText('Open Dialog'));

  // Verify dialog is open
  expect(screen.getByText('Alert Title')).toBeInTheDocument();

  // Click cancel button
  await user.click(screen.getByText('Cancel'));

  // Check if cancel was called
  expect(mockCancel).toHaveBeenCalledTimes(1);
});
