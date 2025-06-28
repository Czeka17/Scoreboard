import { MatchesSummaryItem } from "./MatchesSummaryItem";
import { Match } from "../../types/types";

interface SummaryProps {
	matches: Match[];
}

export function MatchesSummary({ matches }: SummaryProps) {
	return (
		<div className='bg-white rounded-xl shadow-lg p-6'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
				Summary (Ordered by Total Score)
			</h2>

			{matches.length === 0 ? (
				<p className='text-gray-500 text-center py-8'>No matches in progress</p>
			) : (
				<div className='space-y-3 overflow-y-auto max-h-[60vh]'>
					{matches.map((match, index) => (
						<MatchesSummaryItem
							key={match.id}
							match={match}
							position={index + 1}
						/>
					))}
				</div>
			)}
		</div>
	);
}
