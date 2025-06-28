import { formatTime } from "../../utils/formatTime";
import { Match } from "../../types/types";

interface SummaryItemProps {
	match: Match;
	position: number;
}

export function MatchesSummaryItem({ match, position }: SummaryItemProps) {
	return (
		<div className='p-4 bg-white rounded-lg border border-gray-200'>
			<div className='flex items-center justify-between'>
				<span className='text-sm font-bold text-blue-600'>#{position}</span>
				<span className='text-xs text-gray-500 flex items-center gap-1'>
					{formatTime(match.startTime)}
				</span>
			</div>
			<div className='text-lg font-semibold text-center mt-2 flex items-center justify-around'>
				<p className='w-[33%] max-w-[33%] overflow-x-auto'>{match.homeTeam}</p>{" "}
				<p className='w-[33%]'>
					{match.homeScore} - {match.awayScore}
				</p>{" "}
				<p className='w-[33%] max-w-[33%] overflow-x-auto'>{match.awayTeam}</p>
			</div>
			<div className='text-sm text-center text-gray-600 mt-1'>
				Total: {match.homeScore + match.awayScore}
			</div>
		</div>
	);
}
