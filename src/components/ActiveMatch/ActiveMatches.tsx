import { ActiveMatchCard } from "./ActiveMatchCard";
import { Match } from "../../types/types";
interface ActiveMatchesProps {
	onError: (error: string) => void;
	matches: Match[];
	onUpdateScore: (
		matchId: string,
		homeScore: number,
		awayScore: number
	) => void;
	onFinishMatch: (matchId: string, homeTeam: string, awayTeam: string) => void;
}

export function ActiveMatches({
	onError,
	matches,
	onUpdateScore,
	onFinishMatch,
}: ActiveMatchesProps) {
	return (
		<div className='mt-8 bg-white rounded-xl shadow-lg p-6'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-6'>
				Active Matches ({matches.length})
			</h2>

			{matches.length === 0 ? (
				<p className='text-gray-500 text-center py-8'>No active matches</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh]'>
					{matches.map((match) => (
						<ActiveMatchCard
							key={match.id}
							onError={onError}
							match={match}
							onUpdateScore={onUpdateScore}
							onFinishMatch={onFinishMatch}
						/>
					))}
				</div>
			)}
		</div>
	);
}
