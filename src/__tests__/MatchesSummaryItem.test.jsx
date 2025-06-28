import { render, screen } from "@testing-library/react";
import { MatchesSummaryItem } from "../components/Summary/MatchesSummaryItem";

const mockMatch = {
	id: "1",
	homeTeam: "Team A",
	awayTeam: "Team B",
	homeScore: 2,
	awayScore: 1,
	startTime: new Date("2024-01-01T12:00:00Z"),
};

describe("MatchesSummaryItem", () => {
	it("renders match score correctly", () => {
		render(
			<MatchesSummaryItem
				match={mockMatch}
				position={1}
			/>
		);
		expect(screen.getByText("Team A")).toBeInTheDocument();
		expect(screen.getByText("2 - 1")).toBeInTheDocument();
		expect(screen.getByText("Team B")).toBeInTheDocument();
	});

	it("shows total score", () => {
		render(
			<MatchesSummaryItem
				match={mockMatch}
				position={1}
			/>
		);
		expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
	});

	it("shows correct position", () => {
		render(
			<MatchesSummaryItem
				match={mockMatch}
				position={5}
			/>
		);
		expect(screen.getByText("#5")).toBeInTheDocument();
	});
});
