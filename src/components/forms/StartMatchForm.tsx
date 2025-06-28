import { useState } from "react";

interface MatchFormData {
	homeTeam: string;
	awayTeam: string;
}
interface StartMatchFormProps {
	onError: (error: string) => void;
	onStartMatch: (homeTeam: string, awayTeam: string) => void;
}

export function StartMatchForm({ onError, onStartMatch }: StartMatchFormProps) {
	const [formData, setFormData] = useState<MatchFormData>({
		homeTeam: "",
		awayTeam: "",
	});

	const handleSubmit = () => {
		if (!formData.homeTeam.trim() || !formData.awayTeam.trim()) {
			return;
		}
		if (formData.homeTeam === formData.awayTeam) {
			onError('Home and away teams must be different');
			return;
		}
		onStartMatch(formData.homeTeam, formData.awayTeam);
		setFormData({ homeTeam: "", awayTeam: "" });
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	return (
		<div className='bg-white rounded-xl shadow-lg p-6'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
				Start New Match
			</h2>
			<div className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Home Team
					</label>
					<input
						type='text'
						value={formData.homeTeam}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, homeTeam: e.target.value }))
						}
						onKeyUp={handleKeyPress}
						className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						placeholder='Home team'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Away Team
					</label>
					<input
						type='text'
						value={formData.awayTeam}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, awayTeam: e.target.value }))
						}
						onKeyUp={handleKeyPress}
						className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						placeholder='Away team'
					/>
				</div>

				<button
					onClick={handleSubmit}
					disabled={!formData.homeTeam.trim() || !formData.awayTeam.trim()}
					className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
				>
					Start Match
				</button>
			</div>
		</div>
	);
}
