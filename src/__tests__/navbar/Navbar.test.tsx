import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/core/elements/Navbar";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });
});

describe("Navbar Component", () => {
  it("renders the logo", () => {
    render(<Navbar />);
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });

  it("shows the Login button when not logged in", () => {
    render(<Navbar />);

    const loginButtons = screen.getAllByText("Login");
    expect(loginButtons[0]).toBeInTheDocument();
  });

  it("toggles the mobile menu visibility when clicking the hamburger button", async () => {
    render(<Navbar />);

    const buttons = screen.getAllByRole("button");
    const hamburgerButton = buttons.find((btn) =>
      btn.innerHTML.includes("lucide-menu")
    );

    if (!hamburgerButton) throw new Error("Hamburger button not found");

    const nav = screen.getByRole("navigation");
    const mobileMenu = nav.lastChild;

    if (!mobileMenu || !(mobileMenu instanceof HTMLElement)) {
      throw new Error("Mobile menu not found");
    }

    expect(mobileMenu).toHaveClass("opacity-0 scale-95 pointer-events-none");

    fireEvent.click(hamburgerButton);

    expect(mobileMenu).toHaveClass("opacity-100 scale-100");

    fireEvent.click(hamburgerButton);

    expect(mobileMenu).toHaveClass("opacity-0 scale-95 pointer-events-none");
  });
});