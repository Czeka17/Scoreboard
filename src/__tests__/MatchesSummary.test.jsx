import { render, screen } from "@testing-library/react";
import { MatchesSummary } from "../components/Summary/MatchesSummary";

const mockMatches = [
	{
		id: "1",
		homeTeam: "Team A",
		awayTeam: "Team B",
		homeScore: 2,
		awayScore: 1,
		startTime: new Date("2024-01-01T12:00:00Z"),
	},
	{
		id: "2",
		homeTeam: "Team C",
		awayTeam: "Team D",
		homeScore: 3,
		awayScore: 2,
		startTime: new Date("2024-01-01T14:00:00Z"),
	},
];

describe("MatchesSummary", () => {
	it("renders title correctly", () => {
		render(<MatchesSummary matches={[]} />);
		expect(
			screen.getByText(/Summary \(Ordered by Total Score\)/)
		).toBeInTheDocument();
	});

	it('renders "No matches in progress" when no matches', () => {
		render(<MatchesSummary matches={[]} />);
		expect(screen.getByText(/No matches in progress/)).toBeInTheDocument();
	});

	it("renders all match summaries when matches are present", () => {
		render(<MatchesSummary matches={mockMatches} />);
		expect(screen.getAllByText(/Total:/)).toHaveLength(mockMatches.length);
		expect(screen.getByText(/Team A/)).toBeInTheDocument();
		expect(screen.getByText(/2 - 1/)).toBeInTheDocument();
		expect(screen.getByText(/Team B/)).toBeInTheDocument();
		expect(screen.getByText(/Team C/)).toBeInTheDocument();
		expect(screen.getByText(/3 - 2/)).toBeInTheDocument();
		expect(screen.getByText(/Team D/)).toBeInTheDocument();
	});

	it("renders correct positions (#1, #2...)", () => {
		render(<MatchesSummary matches={mockMatches} />);
		expect(screen.getByText("#1")).toBeInTheDocument();
		expect(screen.getByText("#2")).toBeInTheDocument();
	});
});
