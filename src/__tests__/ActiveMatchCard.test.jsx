import { render, screen, fireEvent } from "@testing-library/react";
import { ActiveMatchCard } from "../components/ActiveMatchCard";

const mockMatch = {
	id: "1",
	homeTeam: "Team A",
	awayTeam: "Team B",
	homeScore: 2,
	awayScore: 3,
	startTime: new Date("2024-06-27T12:00:00Z"),
};

describe("ActiveMatchCard", () => {
	it("renders match info correctly", () => {
		render(
			<ActiveMatchCard
				match={mockMatch}
				onUpdateScore={() => {}}
				onFinishMatch={() => {}}
			/>
		);

		expect(screen.getByText("Team A vs Team B")).toBeInTheDocument();
		expect(screen.getByText("2 - 3")).toBeInTheDocument();
		expect(screen.getByText(/Started:/)).toBeInTheDocument();
	});

	it("updates input values and calls onUpdateScore", () => {
		const updateMock = jest.fn();

		render(
			<ActiveMatchCard
				match={mockMatch}
				onUpdateScore={updateMock}
				onFinishMatch={() => {}}
			/>
		);

		const homeInput = screen.getByLabelText("Team A");
		const awayInput = screen.getByLabelText("Team B");
		const updateButton = screen.getByRole("button", { name: /update score/i });

		fireEvent.change(homeInput, { target: { value: "4" } });
		fireEvent.change(awayInput, { target: { value: "1" } });
		fireEvent.click(updateButton);

		expect(updateMock).toHaveBeenCalledWith("1", 4, 1);
	});

	it("does not call onUpdateScore with invalid input", () => {
		const updateMock = jest.fn();

		render(
			<ActiveMatchCard
				match={mockMatch}
				onUpdateScore={updateMock}
				onFinishMatch={() => {}}
			/>
		);

		const homeInput = screen.getByLabelText("Team A");
		fireEvent.change(homeInput, { target: { value: "-5" } });

		const updateButton = screen.getByRole("button", { name: /update score/i });
		fireEvent.click(updateButton);

		expect(updateMock).not.toHaveBeenCalled();
	});

	it("calls onFinishMatch with correct data", () => {
		const finishMock = jest.fn();

		render(
			<ActiveMatchCard
				match={mockMatch}
				onUpdateScore={() => {}}
				onFinishMatch={finishMock}
			/>
		);

		const finishButton = screen.getByRole("button", { name: /finish/i });
		fireEvent.click(finishButton);

		expect(finishMock).toHaveBeenCalledWith("1", "Team A", "Team B");
	});
});
