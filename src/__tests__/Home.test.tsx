import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/components/MoreVIdeosSection", () => ({
  MoreVideosSection: jest.fn(() => <div data-testid="more-videos" />),
}));

describe("<Home />", () => {
  const mockVideos = [
    { id: "abc", snippet: { title: "Mock Video" } },
    { id: "xyz", snippet: { title: "Another Video" } },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ items: mockVideos }),
      }),
    ) as jest.Mock;
  });

  it("renders without crashing and shows all video sections", () => {
    render(<Home />);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getAllByTestId("more-videos")).toHaveLength(3);
  });

  it("fetches all 3 video categories on mount", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    const callUrls = (global.fetch as jest.Mock).mock.calls.map(
      (call) => call[0],
    );
    expect(callUrls[0]).toContain("chart=mostPopular");
    expect(callUrls[1]).toContain("elixir%20programming");
    expect(callUrls[2]).toContain("battlefield%206");
  });

  it("handles fetch errors gracefully", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error")),
    );

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(<Home />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching videos:",
        expect.any(Error),
      );
    });

    consoleSpy.mockRestore();
  });
});
