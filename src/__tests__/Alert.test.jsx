import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "../components/ui/Alert";

describe("Alert", () => {
	it("renders success message with correct styling", () => {
		render(
			<Alert
				type='success'
				message='Success!'
			/>
		);
		expect(screen.getByText("Success!")).toBeInTheDocument();
		expect(screen.getByText("Success!").parentElement).toHaveClass(
			"bg-green-100"
		);
	});

	it("renders error message with correct styling", () => {
		render(
			<Alert
				type='error'
				message='Something went wrong'
			/>
		);
		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
		expect(screen.getByText("Something went wrong").parentElement).toHaveClass(
			"bg-red-100"
		);
	});

	it("calls onClose when X button is clicked", () => {
		const handleClose = jest.fn();
		render(
			<Alert
				type='error'
				message='Closable error'
				onClose={handleClose}
			/>
		);
		fireEvent.click(screen.getByRole("button"));
		expect(handleClose).toHaveBeenCalled();
	});
});
