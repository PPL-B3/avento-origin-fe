// __tests__/pages/upload-success.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UploadSuccessModule } from "@/components/modules/upload-success";


// Mock the Next.js router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/upload-success",
      pathname: "/upload-success",
      query: {},
      asPath: "/upload-success",
      push: jest.fn(),
    };
  },
}));

describe("UploadSuccess Page", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("renders the upload success message", () => {
    render(<UploadSuccessModule />);
    expect(screen.getByText("UPLOAD SUCCESSFUL!")).toBeInTheDocument();
  });

  it("displays both QR code placeholders", () => {
    render(<UploadSuccessModule />);

    // Check for QR code headings
    expect(screen.getByText("QR Code Utama")).toBeInTheDocument();
    expect(screen.getByText("QR Code Kedua")).toBeInTheDocument();

    // Check for QR placeholder areas (divs with QR Code Area text)
    const qrPlaceholders = screen.getAllByText("QR Code Area");
    expect(qrPlaceholders).toHaveLength(2);
  });

  it("displays the correct descriptions for each QR code", () => {
    render(<UploadSuccessModule />);

    expect(
      screen.getByText(
        "Penggunaan PRIBADI. Untuk transfer dokumen & lihat dokumen"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Untuk disebarluaskan. Berisi email pemilik dokumen dan riwayat transfer dokumen"
      )
    ).toBeInTheDocument();
  });

  it("shows the download button with correct text", () => {
    render(<UploadSuccessModule />);
    const downloadButton = screen.getByRole("button", {
      name: /klik qr code untuk download/i,
    });
    expect(downloadButton).toBeInTheDocument();
  });

  it("has the correct background color (#001D3D)", () => {
    const { container } = render(<UploadSuccessModule />);
    const bgElement = container.firstChild;
    expect(bgElement).toHaveClass("bg-[#001D3D]");
  });

  it("has proper structure with container, card and button elements", () => {
    const { container } = render(<UploadSuccessModule />);

    // Check main container
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass("min-h-screen");

    // Check for the card container
    if (mainContainer) {
      const card = mainContainer.firstChild;
      expect(card).toHaveClass("bg-white");
    }

    // Check for button
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue-600");
    expect(button).toHaveTextContent("Klik QR code untuk download");
  });
});
