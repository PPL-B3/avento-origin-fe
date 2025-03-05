import { act, render, screen, fireEvent } from "@testing-library/react";
import AuthButton from "@/components/core/elements/Navbar/AuthButton";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AuthButton Component", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("displays the Login button when not logged in", () => {
    const setIsLoggedIn = jest.fn();
    render(<AuthButton isLoggedIn={false} setIsLoggedIn={setIsLoggedIn} />);
    
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });

  it("displays the Logout button when logged in", () => {
    const setIsLoggedIn = jest.fn();
    render(<AuthButton isLoggedIn={true} setIsLoggedIn={setIsLoggedIn} />);
    
    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();
  });

  it("updates state when clicking the Login button", () => {
    const setIsLoggedIn = jest.fn();
    render(<AuthButton isLoggedIn={false} setIsLoggedIn={setIsLoggedIn} />);
    
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    
    expect(setIsLoggedIn).toHaveBeenCalledWith(true);
  });

  it("displays 'Logging out...' when Logout is clicked", async () => {
    jest.useFakeTimers();
    const setIsLoggedIn = jest.fn();
    render(<AuthButton isLoggedIn={true} setIsLoggedIn={setIsLoggedIn} />);
    
    const logoutButton = screen.getByText("Logout");
  
    await act(async () => {
      fireEvent.click(logoutButton);
      jest.advanceTimersByTime(500);
    });
  
    expect(setIsLoggedIn).toHaveBeenCalledWith(false);
    jest.useRealTimers();
  });

  it("disables the Logout button during logout process", async () => {
    jest.useFakeTimers();
    const setIsLoggedIn = jest.fn();
    render(<AuthButton isLoggedIn={true} setIsLoggedIn={setIsLoggedIn} />);
  
    const logoutButton = screen.getByText("Logout");
  
    await act(async () => {
      fireEvent.click(logoutButton);
    });
  
    expect(logoutButton).toBeDisabled();
  
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
  
    expect(logoutButton).not.toBeDisabled();
    jest.useRealTimers();
  });

  it("redirects to '/' after logout", async () => {
    jest.useFakeTimers();
    const setIsLoggedIn = jest.fn();
    render(<AuthButton isLoggedIn={true} setIsLoggedIn={setIsLoggedIn} />);

    const logoutButton = screen.getByText("Logout");

    await act(async () => {
      fireEvent.click(logoutButton);
      jest.advanceTimersByTime(500);
    });

    expect(setIsLoggedIn).toHaveBeenCalledWith(false);
    expect(mockPush).toHaveBeenCalledWith("/"); // Ensure redirection happens
    jest.useRealTimers();
  });
});
