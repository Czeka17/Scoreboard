import { useState, useCallback } from "react";
import { StartMatchForm } from "./components/forms/StartMatchForm";
import { MatchesSummary } from "./components/Summary/MatchesSummary";
import { ActiveMatches } from "./components/ActiveMatch/ActiveMatches";
import { Alert } from "./components/ui/Alert";
import { Match } from "./types/types";
import { Scoreboard } from "./types/Scoreboard";

function App() {
	const [scoreboard] = useState(() => new Scoreboard());
	const [matches, setMatches] = useState<Match[]>([]);
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");

	const refreshMatches = useCallback(() => {
		setMatches(scoreboard.getAllMatches());
	}, [scoreboard]);

	const clearMessages = () => {
		setError("");
		setSuccess("");
	};
	const onError = (error: string) => {
		setError(error);
		setSuccess("");
	};

	const handleStartMatch = (homeTeam: string, awayTeam: string) => {
		clearMessages();

		try {
			scoreboard.startMatch(homeTeam, awayTeam);
			setError("");
			setSuccess(`Match started: ${homeTeam} vs ${awayTeam}`);
			refreshMatches();
		} catch (err) {
			setSuccess("");
			setError(err instanceof Error ? err.message : "Failed to start match");
		}
	};

	const handleUpdateScore = (
		matchId: string,
		homeScore: number,
		awayScore: number
	) => {
		clearMessages();

		try {
			scoreboard.updateScore(matchId, homeScore, awayScore);
			setError("");
			setSuccess("Score updated successfully");
			refreshMatches();
		} catch (err) {
			setSuccess("");
			setError(err instanceof Error ? err.message : "Failed to update score");
		}
	};

	const handleFinishMatch = (
		matchId: string,
		homeTeam: string,
		awayTeam: string
	) => {
		clearMessages();

		try {
			scoreboard.finishMatch(matchId);
			setSuccess(`Match finished: ${homeTeam} vs ${awayTeam}`);
			refreshMatches();
		} catch (err) {
			setSuccess("");
			setError(err instanceof Error ? err.message : "Failed to finish match");
		}
	};

	const getSummary = () => {
		return scoreboard.getSummary();
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6'>
			<div className='max-w-6xl mx-auto'>
				{error && (
					<Alert
						type='error'
						message={error}
						onClose={() => setError("")}
					/>
				)}
				{success && (
					<Alert
						type='success'
						message={success}
						onClose={() => setSuccess("")}
					/>
				)}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<StartMatchForm
						onStartMatch={handleStartMatch}
						onError={onError}
					/>
					<MatchesSummary matches={getSummary()} />
				</div>

				<ActiveMatches
					onError={onError}
					matches={matches}
					onUpdateScore={handleUpdateScore}
					onFinishMatch={handleFinishMatch}
				/>
			</div>
		</div>
	);
}
export default App;
