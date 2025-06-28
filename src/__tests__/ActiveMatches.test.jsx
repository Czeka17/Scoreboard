import { render, screen } from "@testing-library/react";
import { ActiveMatches } from "../components/ActiveMatches";

jest.mock("../components/MatchCard", () => ({
  MatchCard: ({ match }) => <div data-testid="match-card">{match.homeTeam} vs {match.awayTeam}</div>,
}));

describe("ActiveMatches component", () => {
  const sampleMatches = [
    {
      id: "1",
      homeTeam: "Poland",
      awayTeam: "Germany",
      homeScore: 1,
      awayScore: 2,
      startTime: new Date().toISOString(),
    },
    {
      id: "2",
      homeTeam: "Brazil",
      awayTeam: "Argentina",
      homeScore: 3,
      awayScore: 3,
      startTime: new Date().toISOString(),
    },
  ];

  const mockUpdateScore = jest.fn();
  const mockFinishMatch = jest.fn();

  it("renders the correct title with match count", () => {
    render(
      <ActiveMatches
        matches={sampleMatches}
        onUpdateScore={mockUpdateScore}
        onFinishMatch={mockFinishMatch}
      />
    );

    expect(screen.getByText(/Active Matches \(2\)/i)).toBeInTheDocument();
  });

  it("displays message when there are no active matches", () => {
    render(
      <ActiveMatches
        matches={[]}
        onUpdateScore={mockUpdateScore}
        onFinishMatch={mockFinishMatch}
      />
    );

    expect(screen.getByText(/No active matches/i)).toBeInTheDocument();
  });

  it("renders one MatchCard per match", () => {
    render(
      <ActiveMatches
        matches={sampleMatches}
        onUpdateScore={mockUpdateScore}
        onFinishMatch={mockFinishMatch}
      />
    );

    const cards = screen.getAllByTestId("match-card");
    expect(cards.length).toBe(2);
    expect(cards[0]).toHaveTextContent("Poland vs Germany");
    expect(cards[1]).toHaveTextContent("Brazil vs Argentina");
  });
});
