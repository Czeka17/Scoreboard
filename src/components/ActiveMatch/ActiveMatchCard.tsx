import { useState } from "react";
import { Match } from "../../types/types";
import { formatTime } from "../../utils/formatTime";
interface ActiveMatchCardProps {
	onError: (error: string) => void;
	match: Match;
	onUpdateScore: (
		matchId: string,
		homeScore: number,
		awayScore: number
	) => void;
	onFinishMatch: (matchId: string, homeTeam: string, awayTeam: string) => void;
}

export function ActiveMatchCard({
	match,
	onError,
	onUpdateScore,
	onFinishMatch,
}: ActiveMatchCardProps) {
	const [homeScore, setHomeScore] = useState(match.homeScore.toString());
	const [awayScore, setAwayScore] = useState(match.awayScore.toString());

	const handleScoreUpdate = () => {
		const home = parseInt(homeScore);
		const away = parseInt(awayScore);

		if (isNaN(home) || isNaN(away) || home < 0 || away < 0) {
			onError('Please enter a valid number');
			return;
		}

		onUpdateScore(match.id, home, away);
	};

	return (
		<div className='bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'>
			<div className='text-center mb-4'>
				<div className='text-lg font-bold text-gray-800 mb-2 break-words overflow-x-auto whitespace-nowrap'>
					<p>{match.homeTeam}</p>
					<p className='text-sm text-gray-500'>vs</p>
					<p>{match.awayTeam}</p>
				</div>
				<div className='text-3xl font-bold text-black mb-2'>
					{match.homeScore} - {match.awayScore}
				</div>
				<div className='text-sm text-gray-500 flex items-center justify-center gap-1'>
					Started: {formatTime(match.startTime)}
				</div>
			</div>

			<div className='space-y-4'>
				<div className='grid grid-cols-2 gap-3'>
					<div>
						<label
							htmlFor={`home-${match.id}`}
							className='block text-xs font-medium text-gray-600 mb-1'
						>
							Home team
						</label>
						<input
							id={`home-${match.id}`}
							type='number'
							value={homeScore}
							onChange={(e) => setHomeScore(e.target.value)}
							min='0'
							className='w-full px-3 py-2 text-center border border-gray-300 rounded-lg'
						/>
					</div>
					<div>
						<label
							htmlFor={`away-${match.id}`}
							className='block text-xs font-medium text-gray-600 mb-1'
						>
							Away team
						</label>
						<input
							id={`away-${match.id}`}
							type='number'
							value={awayScore}
							onChange={(e) => setAwayScore(e.target.value)}
							min='0'
							className='w-full px-3 py-2 text-center border border-gray-300 rounded-lg'
						/>
					</div>
				</div>

				<div className='flex gap-2'>
					<button
						onClick={handleScoreUpdate}
						className='flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
					>
						Update Score
					</button>
					<button
						onClick={() =>
							onFinishMatch(match.id, match.homeTeam, match.awayTeam)
						}
						className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-1'
					>
						Finish
					</button>
				</div>
			</div>
		</div>
	);
}
