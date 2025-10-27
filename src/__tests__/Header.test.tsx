import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";

jest.mock("@/components/SignInModal", () => {
  const MockSignInModal = () => <div data-testid="signin-modal" />;
  MockSignInModal.displayName = "MockSignInModal";
  return MockSignInModal;
});

jest.mock("@/components/UploadVideoModal", () => {
  const MockUploadVideoModal = () => <div data-testid="upload-modal" />;
  MockUploadVideoModal.displayName = "MockUploadVideoModal";
  return MockUploadVideoModal;
});

jest.mock("@/context/UserContext");
const mockUseUser = useUser as jest.Mock;

delete (window as unknown as Record<string, unknown>).location;
(window as unknown as { location: { href: string } }).location = { href: "" };

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("<Header />", () => {
  it("renders correctly with Sign In when no user", () => {
    mockUseUser.mockReturnValue({ user: null, logout: jest.fn() });

    render(<Header />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });

  it("renders upload + logout when user is logged in", () => {
    mockUseUser.mockReturnValue({
      user: { name: "Jeff", picture: "/avatar.png", token: "abc" },
      logout: jest.fn(),
    });

    render(<Header />);
    expect(screen.getByText(/Upload/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    expect(screen.getByAltText("Jeff")).toBeInTheDocument();
  });

  it("shows search history dropdown on focus", async () => {
    localStorage.setItem("searchHistory", JSON.stringify(["Test 1", "Test 2"]));

    render(<Header />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText("Test 1")).toBeInTheDocument();
      expect(screen.getByText("Test 2")).toBeInTheDocument();
    });
  });

  it('clears search history when "Clear search history" is clicked', async () => {
    localStorage.setItem("searchHistory", JSON.stringify(["cats", "dogs"]));

    render(<Header />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.focus(input);
    const clearBtn = await waitFor(() =>
      screen.getByText("Clear search history"),
    );

    fireEvent.click(clearBtn);

    expect(localStorage.getItem("searchHistory")).toBeNull();
  });
});
